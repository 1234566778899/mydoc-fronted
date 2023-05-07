import { ActivatedRoute } from '@angular/router';
import { VentasService } from './../../services/ventas/ventas.service';
import { ClientesService } from './../../services/clientes/clientes.service';

import { Orden } from '../../moduls/orden';
import { Cliente } from './../../moduls/cliente';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {


  displayedColumns: string[] = ['dni', 'nombre', 'apellido', 'numero', 'monto', 'quitar'];
  clientes: any[] = [];
  id_farmacia!: number;
  constructor(private clienteService: ClientesService,
    private activated: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_farmacia = this.activated.snapshot.params['id'];
    this.getClientesFrecuentes();
  }

  getClientesFrecuentes() {
    this.clienteService.getClientesFrecuentes(this.id_farmacia).subscribe(
      (data: any[]) => {
        this.clientes = data;
      }
    )
  }




}
