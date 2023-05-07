import { ActivatedRoute } from '@angular/router';
import { VentasService } from './../../services/ventas/ventas.service';
import { Orden } from './../../moduls/orden';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detalle-ventas',
  templateUrl: './detalle-ventas.component.html',
  styleUrls: ['./detalle-ventas.component.css']
})
export class DetalleVentasComponent implements OnInit {

  ordenes: Orden[] = [];
  idFarmacia!: number;
  constructor(private ordenService: VentasService, private activated: ActivatedRoute) { }

  ngOnInit(): void {
    this.idFarmacia = this.activated.snapshot.params['id'];
    this.getCompras();
  }
  getCompras() {
    this.ordenService.getUltimos3Dias(this.idFarmacia).subscribe(
      (data: Orden[]) => {
        this.ordenes = data;
      }

    )
  }
  eliminar(id: number) {
    Swal.fire({
      title: '¿Seguro que quieres eliminar?',
      text: "Una vez eliminado no se podrá recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'La orden ha sido eliminado',
          'success'
        )

        this.ordenService.deleteOrden(id).subscribe(
          {
            next: (data: any) => {
              this.getCompras();
            }
          }
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'La orden no ha sido eliminado',
          'error'
        )
      }
    })
  }

}
