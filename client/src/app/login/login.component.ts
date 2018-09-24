import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import {Router} from '@angular/router';
import {UserService} from '../user.service'
import { User } from '../user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {
  loginform:FormGroup;
  head:string='Login';
  user:User[];
  constructor(private formBuilder:FormBuilder,private router:Router,private userservice:UserService) { }

  ngOnInit() {    
    this.loginform=this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
    this.userservice.getUser().subscribe(data=>
      this.user=data.json());
  }
  login=function(){
    debugger;
    let isValid:boolean=false;
    this.user.forEach(element => {
      if(element.username===this.loginform.value.username && element.password===this.loginform.value.password)
      {
        this.isValid=true;
      }
    });
    if(this.isValid){
          this.router.navigate(["/whiteboard"]);
    }
    else{
      alert("Invalid username or password.");
    }
  }
}
