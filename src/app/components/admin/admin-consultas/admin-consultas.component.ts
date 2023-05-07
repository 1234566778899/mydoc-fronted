import { ConsultasService } from '../../../services/consulta/consultas.service';
import { Consulta } from '../../../moduls/consulta';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-consultas',
  templateUrl: './admin-consultas.component.html',
  styleUrls: ['./admin-consultas.component.css']
})
export class AdminConsultasComponent implements OnInit {
  consultas: Consulta[] = [];
  constructor(private consultaService: ConsultasService) { }

  ngOnInit(): void {
    this.getConsultas();
  }
  getConsultas() {
    this.consultaService.getConsultas().subscribe(
      (data: Consulta[]) => {
        this.consultas = data;
      }
    )
  }
  cambiarEstado(consulta: Consulta) {
    consulta.estado = 'RESUELTO';
    this.consultaService.updateConsultas(consulta).subscribe({
      next: (data: Consulta) => {
        this.getConsultas();
      }
    })
  }
}
