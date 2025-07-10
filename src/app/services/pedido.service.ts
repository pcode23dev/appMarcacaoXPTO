import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';
import { EstadoPedido } from '../enums/estado-pedido.enum';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:3000/pedidos';

  constructor(private http: HttpClient) {}

  // CRUD Pedidos
  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  getPedidoById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  getPedidosByUtente(utenteId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}?utenteId=${utenteId}`);
  }

  getPedidosByEstado(estado: EstadoPedido): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}?estado=${estado}`);
  }

  createPedido(pedido: Omit<Pedido, 'id'>): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }

  updatePedido(id: number, pedido: Partial<Pedido>): Observable<Pedido> {
    return this.http.patch<Pedido>(`${this.apiUrl}/${id}`, pedido);
  }

  deletePedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Alterar estado do pedido
  alterarEstado(id: number, novoEstado: EstadoPedido): Observable<Pedido> {
    return this.http.patch<Pedido>(`${this.apiUrl}/${id}`, { estado: novoEstado });
  }

  // Agendar pedido
  agendarPedido(id: number, profissionalId: number): Observable<Pedido> {
    return this.http.patch<Pedido>(`${this.apiUrl}/${id}`, {
      profissional: profissionalId,
      estado: EstadoPedido.AGENDADO
    });
  }
}