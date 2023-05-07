import { Correo } from 'src/app/moduls/correo';
import { CorreService } from '../../../services/correo/corre.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validar-codigo',
  templateUrl: './validar-codigo.component.html',
  styleUrls: ['./validar-codigo.component.css']
})
export class ValidarCodigoComponent implements OnInit {
  myform!: FormGroup;
  correo!: string;
  constructor(private formBuilder: FormBuilder, private activated: ActivatedRoute, private router: Router,
    private correoService: CorreService) { }

  ngOnInit(): void {
    this.loadMyForm();
    this.correo = this.activated.snapshot.params['correo'];
  }
  loadMyForm() {
    this.myform = this.formBuilder.group({
      c1: ['', [Validators.required]],
      c2: ['', [Validators.required]],
      c3: ['', [Validators.required]],
      c4: ['', [Validators.required]]
    })
  }

  validarCodigo() {
    let c1 = this.myform.get('c1')?.value;
    let c2 = this.myform.get('c2')?.value;
    let c3 = this.myform.get('c3')?.value;
    let c4 = this.myform.get('c4')?.value;
    let codigo = c1 + c2 + c3 + c4;
    this.correoService.getEmail(this.correo).subscribe(
      (data: Correo) => {
        if (data.codigo == codigo) {
          this.router.navigate(['/restaure-password/' + this.correo]);
        } else {
          alert('El codigo ingresado no es correcto');
        }
      }
    )
  }
}
