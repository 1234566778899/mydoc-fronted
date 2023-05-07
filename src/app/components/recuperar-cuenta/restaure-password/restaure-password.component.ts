import { Farmacia } from '../../../moduls/farmacias';
import { ActivatedRoute, Router } from '@angular/router';
import { FarmaciasService } from 'src/app/services/farmacias/farmacias.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-restaure-password',
  templateUrl: './restaure-password.component.html',
  styleUrls: ['./restaure-password.component.css']
})
export class RestaurePasswordComponent implements OnInit {
  hide = true;
  myform!: FormGroup;
  email!: string;
  farmacia!: Farmacia;

  constructor(private formBiulder: FormBuilder, private farmaciaService: FarmaciasService, private activated: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loadMyForm();
    this.email = this.activated.snapshot.params['correo'];
    this.getFarmacia();
  }
  getFarmacia() {
    this.farmaciaService.getFarmaciaByCorreo(this.email).subscribe(
      (data: Farmacia) => {
        this.farmacia = data;
        console.log(this.farmacia);
      }
    )
  }
  loadMyForm() {
    this.myform = this.formBiulder.group({
      pass1: ["", [Validators.required, Validators.minLength(8)]],
      pass2: ["", [Validators.required, Validators.minLength(8)]],
    })
  }

  cambiarPassword() {
    let pass1 = this.myform.get('pass1')?.value;
    let pass2 = this.myform.get('pass2')?.value;
    if (pass1 == pass2) {
      this.farmacia.password = pass1;
      this.farmaciaService.updateFarmacia(this.farmacia.id, this.farmacia).subscribe({
        next: (data: Farmacia) => {
          this.router.navigate(['/login']);
        }
      })
    } else {
      alert('Las contraseñas no coinciden');
    }
  }

}

