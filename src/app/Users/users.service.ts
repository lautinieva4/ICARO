import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(user: {username:string; firstname: string; lastname: string; password: string; country: string; city: string }): Observable<any> {
    return this.http.post("http://localhost:3001/api/users", user);
  }

  Acceder(user:{ username: string; password: string;}): Observable<any> {
    return this.http.post("http://localhost:3001/api/login", user);
}

postMessage(mensaje: {receiverId:string, text:string}): Observable<any>{
  console.log(mensaje);
  
  return this.http.post("http://localhost:3001/api/users/:username/messages", mensaje)
}

setToken(token: any) {
  this.cookies.set("token", token);
}
getToken() {
  return this.cookies.get("token");
}
getUser() {
  return this.http.get("http://localhost:3001/api");
}

getUserLogged() {
  const token = this.getToken();
  
}}