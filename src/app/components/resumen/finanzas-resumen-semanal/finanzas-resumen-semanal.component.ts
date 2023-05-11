import { ActivatedRoute } from '@angular/router';
import { VentasService } from '../../../services/ventas/ventas.service';
import { Component, OnInit } from '@angular/core';
declare var google: any;
@Component({
  selector: 'app-finanzas-resumen-semanal',
  templateUrl: './finanzas-resumen-semanal.component.html',
  styleUrls: ['./finanzas-resumen-semanal.component.css']
})
export class FinanzasResumenSemanalComponent implements OnInit {
  existenVentas = true;
  constructor(private ordenService: VentasService, private activated: ActivatedRoute) { }
  ngOnInit(): void {
    let id = this.activated.snapshot.params['id'];
    let fin = new Date();
    fin.setDate(fin.getDate() - 7);
    let inicio = new Date();
    this.ordenService.getReporteSemanal(id, fin, inicio).subscribe(
      (data: any[]) => {
        let arr: any[] = [['Dia', 'Total(S/.)']];
        for (let i = 0; i < data.length; i++) {
          arr.push([new Date(data[i][0]).toLocaleDateString('es-us', { weekday: 'short' }) + '-' + new Date(data[i][0]).getDate(), data[i][1]]);
        }
        google.charts.load('current', { 'packages': ['line'] });
        this.buildChart(arr);
      }
    )

  }
  buildChart(arr: any) {
    if (arr.length > 0) {
      var func = (chart: any) => {
        var data = new google.visualization.arrayToDataTable(arr);
        var options = {
          title: 'RESUMEN SEMANAL',
          curveType: 'function',
          legend: { position: 'top' }
        };
        chart().draw(data, google.charts.Line.convertOptions(options));
      }

      var chart = () => new google.charts.Line(document.getElementById('curve_chart'));
      var callback = () => func(chart);
      google.charts.setOnLoadCallback(callback);
    } else {
      this.existenVentas = false;
    }
  }

}
