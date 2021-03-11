import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Detalle } from '../domains/detalle';

@Injectable({
  providedIn: 'root',
})
export class DetalleService {
  //Url del API
  private url: string = environment.apiUrl + '/api/v1/detalle';

  constructor(public httpClient: HttpClient) {}

  //Obtener token jwt
  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ Authorization: token });
    return headers;
  }

  //Obtener token jwt para registro
  createTokenRegister(): HttpHeaders {
    let token = localStorage.getItem('tokenR');
    let headers = new HttpHeaders({ Authorization: token });
    return headers;
  }

  public findAll(): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url, { headers: headers });
  }

  public findById(patientIdentification: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + '/' + patientIdentification, {
      headers: headers,
    });
  }

  public save(detalle: Detalle): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(this.url, detalle, { headers: headers });
  }

  public update(detalle: Detalle): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.put(this.url, detalle, { headers: headers });
  }

  public delete(patientIdentification: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.delete(this.url + '/' + patientIdentification, {
      headers: headers,
    });
  }
  public findByNumFactura(patientIdentification: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(
      this.url + '/findByNumFactura/' + patientIdentification,
      {
        headers: headers,
      }
    );
  }
}
