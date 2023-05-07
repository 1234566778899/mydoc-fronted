import { ActivatedRoute } from '@angular/router';
import { VentasService } from '../../../services/ventas/ventas.service';
import { Component, OnInit } from '@angular/core';
declare var google: any;
@Component({
  selector: 'app-finanzas-ganancias',
  templateUrl: './finanzas-ganancias.component.html',
  styleUrls: ['./finanzas-ganancias.component.css']
})
export class FinanzasGananciasComponent implements OnInit {

  constructor(private ordenService: VentasService, private activated: ActivatedRoute) { }

  ngOnInit(): void {

    let arr = [["Mes", "Total", { role: "style" }]]
    let meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    let id = this.activated.snapshot.params['id'];
    let actual = new Date();
    let fin = new Date();
    fin.setMonth(0);
    fin.setDate(0);
    this.ordenService.getGananciasMensuales(id, fin, actual).subscribe(
      (data: any) => {
        for (let i = 0; i < data.length; i++) {
          arr.push([meses[data[i][0]-1], data[i][1], this.generarColor()]);
        }
        google.charts.load("current", { packages: ['corechart'] });
        this.buildChart(arr);
      }
    )
  }
  generarColor() {
    let valores = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let color = '';
    for (let i = 0; i < 6; i++) {
      let num = Math.floor(Math.random() * 16);
      color += '' + valores[num];
    }
    return color;
  }
  buildChart(arr: any) {
    var func = (chart: any) => {
      var data = new google.visualization.arrayToDataTable(arr);
      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
        {
          calc: "stringify",
          sourceColumn: 1,
          type: "string",
          role: "annotation"
        },
        2]);

      var options = {
        title: "Ganancias mensuales",
        width: 630,
        height: 400,
        bar: { groupWidth: "95%" },
        legend: { position: "top" },
      };
      chart().draw(view, options);
    }
    var chart = () => new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
    var callback = () => func(chart);
    google.charts.setOnLoadCallback(callback);
  }
}
