import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/domains/producto';
import { User } from 'src/app/domains/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductoService } from 'src/app/services/producto.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  // Declaraciones de la clase
  public strTitle: String = 'Productos';
  //Objeto Login JWT
  public user: User;
  // Arreglo de productos
  public productos: Producto[];
  //Producto de modal
  public productModal: Producto;
  constructor(
    public productService: ProductoService,
    private authService: AuthService,
    public modal: NgbModal
  ) {}
  ngOnInit(): void {
    //Inicializar objeto login JWT
    this.user = new User('', '');
    // Inicializar objeto modalProduct
    this.productModal = new Producto(0, '', 0, 0);
    this.findAll();
  }

  //Método para traer todos los productos
  findAll(): void {
    this.user.username = 'admin';
    this.user.password = 'password';
    this.authService.loginUser(this.user).subscribe((data) => {
      //Asignamos el token en el localStorage
      localStorage.setItem('token', data.token);
      //Traer productos
      this.productService.findAll().subscribe(
        (data) => {
          //Asignamos la data al arreglo de productos
          this.productos = data;
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }

  //Abri el modal centrado
  openCentrado(crear) {
    // Inicializar objeto modalProduct
    this.productModal = new Producto(0, '', 0, 0);
    //Abrir modal
    this.modal.open(crear, { centered: true });
  }

  //Abrir modal editar
  openEditar(editar, cli: Producto) {
    this.productModal = cli;
    this.modal.open(editar, { centered: true });
  }

  //Nuevo producto
  crearProducto(): void {
    this.productService.save(this.productModal).subscribe(
      (data) => {
        this.findAll();
        this.modal.dismissAll();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  //Editar producto
  editarProducto(): void {
    this.productService.update(this.productModal).subscribe(
      (data) => {
        this.findAll();
        this.modal.dismissAll();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  //Eliminar producto
  eliminarProducto(): void {
    this.productService.delete(this.productModal.idProducto).subscribe(
      (data) => {
        this.findAll();
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
