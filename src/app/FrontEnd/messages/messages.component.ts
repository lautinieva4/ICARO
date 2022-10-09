import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Users/users.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  receiverId!: string;
  text!: string;

  constructor(public userService: UsersService,public router: Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.userService.postMessage
  }

  mensaje: FormGroup = this.fb.group ({
    'receiverId': ['',[Validators.required]],
    'text': ['',[Validators.required, Validators.maxLength(144)]],
  })

  postMessage(){
    const mensaje = { receiverId: this.mensaje.value.receiverId, text: this.mensaje.value.text}
    console.log(this.mensaje.value)
    this.userService.postMessage(mensaje).subscribe(data =>{
      this.userService.setToken(data.token);
      this.router.navigateByUrl('/principal');
  }

)}
}
