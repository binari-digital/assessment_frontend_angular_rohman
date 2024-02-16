import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService, private storage: StorageService) { }

  ngOnInit(): void {
    if (this.storage.getToken()) {
      this.auth.canAuthenticate();
    } else {
      this.router.navigate(['not-found']);
    }
  }
}
