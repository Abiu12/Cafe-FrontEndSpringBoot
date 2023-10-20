import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: any = FormGroup;
  responseMessage:any;

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private ngxService:NgxUiLoaderService,
    private snackbarService:SnackbarService

  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      password:[null,[Validators.required]]
    })
  }


  //Metodo para mandar
  handleSubmit(){
    this.ngxService.start();
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password
    }
    //usamos el servicio del login del usuario
    this.userService.login(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close(); //cerramos la ventana
      localStorage.setItem('token',response.token);
      this.router.navigate(['/cafe/dashboard']);
    },(error)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    }
    )
  }

}
