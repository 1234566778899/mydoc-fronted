import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Farmacia } from './../../moduls/farmacias';
import { FarmaciasService } from './../../services/farmacias/farmacias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  id!: number;
  myForm!: FormGroup;
  farmacia!: Farmacia;
  selectedFile!: any;
  nameImg!: string;
  objectURL!: any;
  photo: any;
  // miEvento = new EventEmitter<string>();

  constructor(private activated: ActivatedRoute, private farmaciaService: FarmaciasService,
    private formBuilder: FormBuilder, private router: Router, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.activated.snapshot.params['id'];
    this.reactiveForm();
    this.cargarDatos();
  }

  cargarDatos() {
    this.farmaciaService.getFarmacia(this.id).subscribe(
      (data: Farmacia) => {
        if (data.photo) this.photo = 'data:image/jpeg;base64,' + data.photo;
        this.farmacia = data;
        this.myForm.get('nombreFarmacia')?.setValue(data.nombreFarmacia);
        this.myForm.get('ruc')?.setValue(data.ruc);
        this.myForm.get('departamento')?.setValue(data.departamento);
        this.myForm.get('provincia')?.setValue(data.provincia);
        this.myForm.get('distrito')?.setValue(data.distrito);
        this.myForm.get('nombre')?.setValue(data.nombre);
        this.myForm.get('apellido')?.setValue(data.apellido);
        this.myForm.get('telefono')?.setValue(data.telefono);
        this.myForm.get('correo')?.setValue(data.correo);
        this.myForm.get('dni')?.setValue(data.dni);
      }
    )
  }
  onChangedFile(event: any) {
    this.selectedFile = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e: any) {
      let img: any = document.querySelector('#img-perfil');
      img.src = e.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }
  abrir(input: any) {
    input.click();
  }
  reactiveForm() {
    this.myForm = this.formBuilder.group({
      nombreFarmacia: ['', [Validators.required]],
      ruc: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      departamento: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      distrito: ['', Validators.required],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      dni: ['', [Validators.required]],
    })
  }
  updatePhoto() {
    const _data = new FormData();
    _data.append('photo', this.selectedFile);
    this.farmaciaService.updatePhoto(this.id, _data).subscribe({
      next: (data: Farmacia) => {
        this.cargarDatos();
        this.snack.open('La ha editado la foto de perfil', 'OK', { duration: 3000 })
        this.selectedFile = null;
        // this.miEvento.emit('cambiar perfil');
      },
      error: e => console.log(e)
    }
    )
  }
  getImg() {
    if (this.selectedFile != null) return this.selectedFile;
    return this.photo;
  }
  updateFarmacia() {
    let farmacia: Farmacia = {
      id: this.id,
      nombreFarmacia: this.myForm.get('nombreFarmacia')?.value,
      ruc: this.myForm.get('ruc')?.value,
      distrito: this.myForm.get('distrito')?.value,
      provincia: this.myForm.get('provincia')?.value,
      departamento: this.myForm.get('departamento')?.value,
      apellido: this.myForm.get('apellido')?.value,
      dni: this.myForm.get('dni')?.value,
      nombre: this.myForm.get('nombre')?.value,
      telefono: this.myForm.get('telefono')?.value,
      correo: this.farmacia.correo,
      password: this.farmacia.password,
      activo: true,
      photo: null,
    }
    this.farmaciaService.updateFarmacia(this.id, farmacia).subscribe({
      next: (data: Farmacia) => {
        this.snack.open('Los cambios se realizaron con exito', 'OK', { duration: 3000 });
      }
    })
  }
}
