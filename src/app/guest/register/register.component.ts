import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
   user: User = new User();

   faUser = faUserCircle;
   errorMessage: string = " ";
   

   constructor(private authenticationService: AuthenticationService, private router: Router ){}

    ngOnInit(): void {
      if(this.authenticationService.currentUserValue?.id){
        this.router.navigate(['/profile']);
        return;
      }
    }

      register() {
        this.authenticationService.register(this.user).subscribe(data => {
          this.router.navigate(['/login']);
        }, err => {
          if(err?.status=== 409){
            this.errorMessage = 'Username already exist.';

          }else{
            this.errorMessage = 'Unexpected error occured. Error is:' + err?.errorMessage;
            console.log(err);
          }

        })
      }

    }
   


