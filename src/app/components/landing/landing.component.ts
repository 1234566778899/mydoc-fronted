import { Router } from '@angular/router';
import { Consulta } from './../../moduls/consulta';
import { ConsultasService } from './../../services/consulta/consultas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  myForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private snack: MatSnackBar,
    private consultaService: ConsultasService, private router: Router) { }

  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm() {
    this.myForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(15)]],
      correo: ['', [Validators.required, Validators.email, Validators.maxLength(30)]],
      descripcion: ['', [Validators.required]]
    })
  }

  addConsulta() {
    let consulta: Consulta = {
      id: 0,
      nombre: this.myForm.get('nombre')?.value,
      correo: this.myForm.get('correo')?.value,
      descripcion: this.myForm.get('descripcion')?.value,
      estado: 'PENDIENTE',
      fecha: new Date()
    }
    this.consultaService.addConsulta(consulta).subscribe({
      next: (data: Consulta) => {
        this.snack.open('Su consulta se ha enviado correctamente', 'OK', { duration: 3000 });
        this.myForm.get('nombre')?.setValue('');
        this.myForm.get('correo')?.setValue('');
        this.myForm.get('descripcion')?.setValue('');
      },
      error: (e) => {
        console.log(e);
      }
    })


  }
}
