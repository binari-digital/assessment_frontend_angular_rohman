import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formdata = { email: "",password: "" };
  submit = false;
  loading = false;
  isError = false;
  message= "";

  constructor(private auth: AuthService, private storage: StorageService) { }

  ngOnInit(): void {
    if (this.storage.getToken()) {
      this.auth.canAuthenticate()
    } else {
      this.auth.canAccess()
    }
  }

  login() {
    this.loading = true;
    this.auth.login(this.formdata.email, this.formdata.password).subscribe(
      (message) => {
        this.message = message
        this.isError = false;
        this.loading = false;
        setTimeout(() => this.auth.canAuthenticate(), 500);
      },
      (error) => {
        this.message = error.message;
        this.isError = true;
        this.loading = false;
      }
    )
  }

  logout() {
    this.storage.signOut()
  }
}
