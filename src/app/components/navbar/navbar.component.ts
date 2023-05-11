import { PerfilComponent } from './../perfil/perfil.component';
import { NotificacionService } from './../../services/notificacion/notificacion.service';
import { FarmaciasService } from './../../services/farmacias/farmacias.service';
import { Farmacia } from './../../moduls/farmacias';
import { Notificacion } from './../../moduls/notificacion';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  visible = false;
  id!: number;
  farmacia!: Farmacia;
  notificaciones: Notificacion[] = [];
  imgUrl!: any;
  constructor(private activetedRoute: ActivatedRoute,
    private farmaciaService: FarmaciasService, private notificacionService: NotificacionService,
    private router: Router, private perfilComponent: PerfilComponent) { }

  ngOnInit(): void {
    this.id = this.activetedRoute.snapshot.params['id'];
    this.farmaciaService.getFarmacia(this.id).subscribe(
      (data: Farmacia) => {
        if (data.photo)
          this.imgUrl = 'data:image/jpeg;base64,' + data.photo;
        this.farmacia = data;
      }
    )

    this.perfilComponent.miEvento.subscribe(
      (data: string) => {
        this.farmaciaService.getFarmacia(this.id).subscribe(
          (data: Farmacia) => {
            if (data.photo)
              this.imgUrl = 'data:image/jpeg;base64,' + data.photo;
            this.farmacia = data;
          }
        )
      }
    )

    this.getNotificaciones();

  }
  abrirMenu(): void {
    this.visible = true;
  }
  cerrarMenu(): void {
    this.visible = false;
  }

  getNotificaciones() {
    this.notificacionService.getNotificaciones(this.id).subscribe(
      (data: Notificacion[]) => {
        this.notificaciones = data;
      }
    )
  }

  updateNotificacion(notificacion: Notificacion) {
    let noti: Notificacion = {
      id: notificacion.id,
      fecha: notificacion.fecha,
      farmaciaId: notificacion.farmaciaId,
      visto: true,
      mensaje: notificacion.mensaje,
      stockId: notificacion.stockId
    }
    console.log(noti);
    this.notificacionService.editNotificacion(noti).subscribe({
      next: (data: Notificacion) => {
        console.log('data notificacion: ', data);
        this.router.navigate([`/edit-stock/${this.id}/${data.stockId}`])
      },
      error: (e) => console.log(e)
    }
    )
  }


}
