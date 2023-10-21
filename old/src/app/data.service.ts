import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private db: Dexie = new Dexie('MyAppDatabase');
  private isAuthenticated: boolean = false;
  private authenticatedUser: any;
  
  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    this.db.version(1).stores({
      users: '++id, email, username, password, rut, city, commune',
    });
  }

  addUser(user: any) {
    return this.db.table('users').add(user);
  }

  getUserByUsername(username: string) {
    return this.db.table('users').where('username').equals(username).first();
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  // Nuevo método para obtener los detalles del usuario autenticado
  getAuthenticatedUser(): any {
    return this.authenticatedUser;
  }
  // Método para verificar el estado de autenticación
isAuthenticatedStatus(): boolean {
  return this.isAuthenticated;
}

  // Método para autenticar al usuario
  authenticate(email: string, password: string): Promise<boolean> {
    return this.db.table('users')
      .where({ email, password })
      .first()
      .then((user) => {
        this.isAuthenticated = !!user;
        if (this.isAuthenticated) {
          this.authenticatedUser = user; // Almacena los detalles del usuario autenticado
        }
        return this.isAuthenticated;
      })
      .catch((error) => {
        console.error('Error al autenticar al usuario:', error);
        return false;
      });
  }
}