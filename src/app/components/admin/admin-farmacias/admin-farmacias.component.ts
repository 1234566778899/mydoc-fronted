import { MatSnackBar } from '@angular/material/snack-bar';
import { FarmaciasService } from 'src/app/services/farmacias/farmacias.service';
import { Farmacia } from 'src/app/moduls/farmacias';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-farmacias',
  templateUrl: './admin-farmacias.component.html',
  styleUrls: ['./admin-farmacias.component.css']
})
export class AdminFarmaciasComponent implements OnInit {
  farmacias!: Farmacia[];
  constructor(private farmaciaService: FarmaciasService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.getFarmacias();
  }
  getFarmacias() {
    this.farmaciaService.getFarmacias().subscribe(
      (data: Farmacia[]) => {
        this.farmacias = data;
      }
    )
  }
  cambiarEstado(id: number, farmacia: Farmacia) {
    farmacia.activo = !farmacia.activo;
    this.farmaciaService.updateFarmacia(id, farmacia).subscribe({
      next: (data: Farmacia) => {
        this.snack.open('Se ha cambiado el estado correctamente', 'OK', { duration: 5000 });
      }, error: e => console.log(e)
    })
  }

}
