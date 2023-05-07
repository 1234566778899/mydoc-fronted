import { ActivatedRoute } from '@angular/router';
import { VentasService } from '../../../services/ventas/ventas.service';
import { Component, OnInit } from '@angular/core';
declare var google: any;
@Component({
  selector: 'app-finanzas-productos',
  templateUrl: './finanzas-productos.component.html',
  styleUrls: ['./finanzas-productos.component.css']
})
export class FinanzasProductosComponent implements OnInit {

  constructor(private ordenService: VentasService, private activated: ActivatedRoute) { }

  ngOnInit(): void {

    let idFarmacia = this.activated.snapshot.params['id'];
    let arr = [['Producto', 'Cantidad']];
    this.ordenService.getProductosMasVendidos(idFarmacia).subscribe(
      (data: any) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          arr.push([data[i][1] + ' ' + data[i][2], data[i][3]])
        }
        console.log(arr);
        google.charts.load("current", { packages: ["corechart"] });
        this.buildChart(arr);
      }
    )
  }
  buildChart(arr: any) {
    var func = (chart: any) => {
      var data = new google.visualization.arrayToDataTable(arr);
      var options = {
        title: 'Producto más vendidos',
        is3D: true,
      };

      chart().draw(data, options);
    }
    var chart = () => new google.visualization.PieChart(document.getElementById('piechart_3d'));
    var callback = () => func(chart);
    google.charts.setOnLoadCallback(callback);
  }
}
