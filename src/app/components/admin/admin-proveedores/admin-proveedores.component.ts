import { ProveedoresService } from '../../../services/proveedores/proveedores.service';
import { Proveedor } from '../../../moduls/proveedor';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-proveedores',
  templateUrl: './admin-proveedores.component.html',
  styleUrls: ['./admin-proveedores.component.css']
})
export class AdminProveedoresComponent implements OnInit {
  proveedores: Proveedor[] = [];
  constructor(private provedorService: ProveedoresService) { }

  ngOnInit(): void {
    this.provedorService.getProveedores().subscribe(
      (data: Proveedor[]) => {
        this.proveedores = data;
      }
    )
  }

}
