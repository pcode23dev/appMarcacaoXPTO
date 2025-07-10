import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profissional } from '../models/profissional.model';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {
  private apiUrl = 'http://localhost:3000/profissionais';

  constructor(private http: HttpClient) {}

  // CRUD Profissionais
  getProfissionais(): Observable<Profissional[]> {
    return this.http.get<Profissional[]>(this.apiUrl);
  }

  getProfissionalById(id: number): Observable<Profissional> {
    return this.http.get<Profissional>(`${this.apiUrl}/${id}`);
  }

  createProfissional(profissional: Omit<Profissional, 'id'>): Observable<Profissional> {
    return this.http.post<Profissional>(this.apiUrl, profissional);
  }

  updateProfissional(id: number, profissional: Partial<Profissional>): Observable<Profissional> {
    return this.http.patch<Profissional>(`${this.apiUrl}/${id}`, profissional);
  }

  deleteProfissional(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}