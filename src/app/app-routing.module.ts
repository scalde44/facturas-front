import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { FacturaComponent } from './components/factura/factura.component';
import { ProductoComponent } from './components/producto/producto.component';

const routes: Routes = [
  { path: 'factura', component: FacturaComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'producto', component: ProductoComponent },
  { path: '', pathMatch: 'full', redirectTo: 'factura' },
  { path: '**', pathMatch: 'full', redirectTo: 'factura' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
