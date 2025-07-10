import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utente } from '../models/utente.model';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {
  private apiUrl = 'http://localhost:3000/utentes';
  private currentUserSubject = new BehaviorSubject<Utente | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Verificar se existe usuário logado no localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  // Autenticação
  login(email: string, senha: string): Observable<Utente | null> {
    return this.http.get<Utente[]>(`${this.apiUrl}?email=${email}&senha=${senha}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            const user = users[0];
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
          }
          return null;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): Utente | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  // CRUD Utentes
  getUtentes(): Observable<Utente[]> {
    return this.http.get<Utente[]>(this.apiUrl);
  }

  getUtenteById(id: number): Observable<Utente> {
    return this.http.get<Utente>(`${this.apiUrl}/${id}`);
  }

  createUtente(utente: Omit<Utente, 'id'>): Observable<Utente> {
    return this.http.post<Utente>(this.apiUrl, utente);
  }

  updateUtente(id: number, utente: Partial<Utente>): Observable<Utente> {
    return this.http.patch<Utente>(`${this.apiUrl}/${id}`, utente);
  }

  deleteUtente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Registrar utente anônimo
  registerAnonimo(utente: Omit<Utente, 'id' | 'role'>): Observable<Utente> {
    const novoUtente = { ...utente, role: 'anonimo' as const };
    return this.http.post<Utente>(this.apiUrl, novoUtente);
  }
}