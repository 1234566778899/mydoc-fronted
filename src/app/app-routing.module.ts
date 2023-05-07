import { AdminProductosComponent } from './components/admin/admin-productos/admin-productos.component';
import { AdminConsultasComponent } from './components/admin/admin-consultas/admin-consultas.component';
import { Proveedor } from './moduls/proveedor';
import { AdminFarmaciasComponent } from './components/admin/admin-farmacias/admin-farmacias.component';
import { AdministradorComponent } from './components/admin/administrador/administrador.component';
import { BoletaComponent } from './components/boleta/boleta.component';
import { FinanzasComponent } from './components/resumen/finanzas/finanzas.component';
import { DetalleVentasComponent } from './components/detalle-ventas/detalle-ventas.component';
import { PruebasComponent } from './components/pruebas/pruebas.component';
import { RestaurePasswordComponent } from './components/recuperar-cuenta/restaure-password/restaure-password.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { ValidarCodigoComponent } from './components/recuperar-cuenta/validar-codigo/validar-codigo.component';
import { OlvidarPasswordComponent } from './components/recuperar-cuenta/olvidar-password/olvidar-password.component';
import { LandingComponent } from './components/landing/landing.component';
import { ComprasComponent } from './components/compras/compras.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { LoginComponent } from './components/login/login.component';
import { AddEditProductsComponent } from './components/add-edit-products/add-edit-products.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProveedoresComponent } from './components/admin/admin-proveedores/admin-proveedores.component';

const routes: Routes = [
  { path: 'user/:id', component: InventarioComponent },
  { path: "ventas/:id", component: VentasComponent },
  { path: "inventario/:id", component: InventarioComponent },
  { path: "perfil/:id", component: PerfilComponent },
  { path: "user/:id/add", component: AddEditProductsComponent },
  { path: "edit-stock/:id/:id_stock", component: AddEditProductsComponent },
  { path: "clientes/:id", component: ClientesComponent },
  { path: "compras/:id", component: ComprasComponent },
  { path: "detalleVentas/:id", component: DetalleVentasComponent },
  { path: "finanzas/:id", component: FinanzasComponent },
  { path: "boleta/:id_orden/:id", component: BoletaComponent },
  { path: "olvidar", component: OlvidarPasswordComponent },
  { path: "validar/:correo", component: ValidarCodigoComponent },
  { path: "login", component: LoginComponent },
  { path: 'landing', component: LandingComponent },
  { path: "registrar", component: RegistrarComponent },
  { path: "restaure-password/:correo", component: RestaurePasswordComponent },
  {
    path: "admin", component: AdministradorComponent,
    children: [
      { path: 'farmacias', component: AdminFarmaciasComponent },
      { path: 'proveedores', component: AdminProveedoresComponent },
      { path: 'consultas', component: AdminConsultasComponent },
      { path: 'productos', component: AdminProductosComponent },
      { path: '', component: AdminFarmaciasComponent }
    ]
  },
  { path: "pruebas/:id", component: PruebasComponent },
  { path: "**", component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
