import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Users/users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

hide = true
  firstname!: string;
  lastname!: string;
  password!:string;
  confirmPassword!:string;
  username!: string;
  city!:string;
  country!:string;
  miform: any;

  constructor( public userService: UsersService, public router: Router, private fb:FormBuilder) {}
 
  ngOnInit(): void {
  }

  miformulario:FormGroup=this.fb.group({
    'firstname': ['',[Validators.required]],
    'lastname': ['',[Validators.required]],
    'username': ['',[Validators.required]],
    'password': ['',[Validators.required,Validators.minLength(6)]],
    'country': ['',[Validators.required]],
    'city': ['',[Validators.required]],

    },
  )

  campoValido(campo:string){
    return this.miformulario.controls[campo].errors && this.miformulario.controls[campo].touched
  }

  registerUser(){
    const user = {username: this.miformulario.value.username, firstname: this.miformulario.value.firstname, lastname: this.miformulario.value.lastname, password:this.miformulario.value.password, country:this.miformulario.value.country, city:this.miformulario.value.city};
    // console.log(this.miformulario.value)
    this.userService.login(user).subscribe(data =>{
      this.userService.setToken(data.token);
      this.router.navigateByUrl('/principal');
    })
  }
  guardar(){
    if (this.miformulario.invalid){
      this.miformulario.markAllAsTouched()
      this.miformulario.reset()
      return
    }
    this.router.navigateByUrl('/principal');
  }
}



  


