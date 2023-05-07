import { Farmacia } from 'src/app/moduls/farmacias';
import { FarmaciasService } from 'src/app/services/farmacias/farmacias.service';
import { Router } from '@angular/router';
import { CorreService } from '../../../services/correo/corre.service';
import { Correo } from 'src/app/moduls/correo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-olvidar-password',
  templateUrl: './olvidar-password.component.html',
  styleUrls: ['./olvidar-password.component.css']
})
export class OlvidarPasswordComponent implements OnInit {
  hide = true;
  myform!: FormGroup;
  mensaje = false;
  constructor(private formBuilder: FormBuilder, private correoSerivice: CorreService, private router: Router,
    private farmaciaService: FarmaciasService) { }

  ngOnInit(): void {
    this.loadMyForm();
  }
  loadMyForm() {
    this.myform = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]]
    })
  }

  sendEmail() {
    this.farmaciaService.getFarmacias().subscribe(
      (data: Farmacia[]) => {
        let farma = data.find(x => x.correo == this.myform.get('email')?.value);
        if (farma) {
          this.mensaje = true;
          let num = '';
          for (let i = 0; i < 4; i++) {
            let n = Math.floor(Math.random() * 10);
            num += ('' + n);
          }
          let correo: Correo = {
            id: 0,
            destino: this.myform.get('email')?.value,
            asunto: 'CÓDIGO DE AUTENTIFICACIÓN',
            texto: 'EL CÓDIGO ES: ' + num,
            fecha: new Date(),
            codigo: num
          }
          console.log(correo);
          this.correoSerivice.sendEmail(correo).subscribe({
            next: (data: Correo) => {
              this.router.navigate(['/validar/' + data.destino]);
            },
            error: (e) => {
              alert('Error: ' + e);
            }
          })
        } else {
          alert('El correo no esta registrado en el sistema');
        }
      }
    )
  }
}
