import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit{

  form: FormGroup;
  isSubmitted = false;

  constructor(private authService: AuthService, private router: Router,private formBuilder: FormBuilder){}

  ngOnInit(): void{
    this.form = new FormGroup({
      login: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }

  submit(){
    if(this.form.valid){

      console.log(this.form.value);

      this.authService.connecte(this.form.value).subscribe( result =>{
        if(result.auth===true){
          console.log(result);
          this.router.navigate(['/affiche']);
        }
      })
    }
    
  }
}
