import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/domains/cliente';
import { User } from 'src/app/domains/user';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  // Declaraciones de la clase
  public strTitle: String = 'Clientes';
  //Objeto Login JWT
  public user: User;
  // Arreglo de clientes
  public clientes: Cliente[];
  //Cliente de modal
  public clientModal: Cliente;
  constructor(
    public clienteService: ClienteService,
    private authService: AuthService,
    public modal: NgbModal
  ) {}

  ngOnInit(): void {
    //Inicializar objeto login JWT
    this.user = new User('', '');
    // Inicializar objeto modalClient
    this.clientModal = new Cliente(0, '', '', '', new Date(), '', '');
    this.findAll();
  }

  //Método para traer todos los clientes
  findAll(): void {
    this.user.username = 'admin';
    this.user.password = 'password';
    this.authService.loginUser(this.user).subscribe((data) => {
      //Asignamos el token en el localStorage
      localStorage.setItem('token', data.token);
      //Traer clientes
      this.clienteService.findAll().subscribe(
        (data) => {
          //Asignamos la data al arreglo de clientes
          this.clientes = data;
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }

  //Abri el modal centrado
  openCentrado(crear) {
    // Inicializar objeto modalClient
    this.clientModal = new Cliente(0, '', '', '', new Date(), '', '');
    //Abrir modal
    this.modal.open(crear, { centered: true });
  }

  //Abrir modal editar
  openEditar(editar, cli: Cliente) {
    this.clientModal = cli;
    this.modal.open(editar, { centered: true });
  }

  //Nuevo cliente
  crearCliente(): void {
    this.clienteService.save(this.clientModal).subscribe(
      (data) => {
        this.findAll();
        this.modal.dismissAll();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  //Editar cliente
  editarCliente(): void {
    this.clienteService.update(this.clientModal).subscribe(
      (data) => {
        this.findAll();
        this.modal.dismissAll();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  //Eliminar cliente
  eliminarCliente(cli: Cliente): void {
    this.clienteService.delete(cli.idCliente).subscribe(
      (data) => {
        this.findAll();
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
