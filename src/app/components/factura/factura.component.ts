import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/domains/cliente';
import { Detalle } from 'src/app/domains/detalle';
import { Factura } from 'src/app/domains/factura';
import { Producto } from 'src/app/domains/producto';
import { User } from 'src/app/domains/user';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { FacturaService } from 'src/app/services/factura.service';
import { ProductoService } from 'src/app/services/producto.service';
@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
})
export class FacturaComponent implements OnInit {
  // Declaraciones de la clase
  public strTitle: String = 'Facturas';
  //Objeto Login JWT
  public user: User;
  // Arreglo de clientes
  public clientes: Cliente[];
  // Arreglo de productos
  public productos: Producto[];
  //Arreglo de detalles
  public detalles: Detalle[];
  // Arreglo de facturas
  public facturas: Factura[];
  //Factura de modal
  public facturaModal: Factura;
  //Producto modal
  public productoModal: Producto;
  //Detalle modal
  public detalleModal: Detalle;

  constructor(
    public facturaService: FacturaService,
    private authService: AuthService,
    public clienteService: ClienteService,
    public productServive: ProductoService,
    public detalleService: DetalleService,
    public modal: NgbModal
  ) {}
  ngOnInit(): void {
    //Inicializar objeto login JWT
    this.user = new User('', '');
    // Inicializar objeto modalProduct
    this.facturaModal = new Factura(0, new Date(), 0);
    // Inicializar producto modal
    this.productoModal = new Producto(0, '', 0, 0);
    //Inicializar detalle modal
    this.detalleModal = new Detalle(0, 0, 0, 0, 0, '');
    this.findAll();
  }

  //Método para traer todas las facturas
  findAll(): void {
    this.user.username = 'admin';
    this.user.password = 'password';
    this.authService.loginUser(this.user).subscribe((data) => {
      //Asignamos el token en el localStorage
      localStorage.setItem('token', data.token);
      //Traer productos
      this.facturaService.findAll().subscribe(
        (data) => {
          //Asignamos la data al arreglo de facturas
          this.facturas = data;
        },
        (error) => {
          console.error(error);
        }
      );
      this.findAllClientes();
      this.findAllProductos();
    });
  }

  //Abri el modal centrado
  openCentrado(crear) {
    // Inicializar objeto modalProduct
    this.facturaModal = new Factura(0, new Date(), 0);
    // Inicializar producto modal
    this.productoModal = new Producto(0, '', 0, 0);
    //Inicializar detalle modal
    this.detalleModal = new Detalle(0, 0, 0, 0, 0, '');
    //Abrir modal
    this.modal.open(crear, { centered: true });
  }

  //Cargar todos los clientes
  findAllClientes(): void {
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
  }
  //Cargar todos los productos
  findAllProductos(): void {
    //Traer productos
    this.productServive.findAll().subscribe(
      (data) => {
        //Asignamos la data al arreglo de productos
        this.productos = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  //Crear factura
  crearFactura(anadir): void {
    this.facturaService.save(this.facturaModal).subscribe(
      (data) => {
        this.modal.dismissAll();
        this.facturaModal = data;
        this.detalles = [];
        this.modal.open(anadir, { centered: true });
      },
      (err) => {
        console.error(err);
      }
    );
  }

  //Eliminar factura
  eliminarFactura(f: Factura): void {
    this.facturaService.delete(f.numFactura).subscribe(
      (data) => {
        this.findAll();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  //Buscar detalles por factura
  detalleFactura(numFactura: number): void {
    this.detalleService.findByNumFactura(numFactura).subscribe(
      (data) => {
        this.detalles = data;
        console.log(this.detalles);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  //Agregar producto a detalle
  agregarProdADetalle(): void {
    this.detalleModal.numFactura_Factura = this.facturaModal.numFactura;
    console.log(this.detalleModal);
    this.detalleService.save(this.detalleModal).subscribe(
      (data) => {
        this.detalleFactura(this.facturaModal.numFactura);
      },
      (err) => {
        console.error(err);
      }
    );
  }
  //Delete detalle
  deleteDetalle(d: Detalle): void {
    console.log(d);
    this.detalleService.delete(d.numDetalle).subscribe(
      (data) => {
        console.log(data);
        this.detalleFactura(this.facturaModal.numFactura);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  //Finalizar
  finalizar(): void {
    this.modal.dismissAll();
    // Inicializar objeto modalProduct
    this.facturaModal = new Factura(0, new Date(), 0);
    // Inicializar producto modal
    this.productoModal = new Producto(0, '', 0, 0);
    //Inicializar detalle modal
    this.detalleModal = new Detalle(0, 0, 0, 0, 0, '');
    this.findAll();
  }

  //Editar
  editarF(editar, f: Factura): void {
    this.facturaModal = f;
    this.detalleService.findByNumFactura(f.numFactura).subscribe(
      (data) => {
        this.detalles = data;
        this.modal.open(editar, { centered: true });
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
