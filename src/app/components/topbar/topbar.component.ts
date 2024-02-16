import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  name = "";
  email = "";
  avatar = "";
  showFallback = false;

  constructor(private auth: AuthService, private storage: StorageService) { }

  ngOnInit(): void {
    const user = this.storage.getUser()
    this.name = user.name;
    this.email = user.email;
    this.avatar = user.avatar;
  }

  logout() {
    this.storage.signOut();
    this.auth.canAccess();
  }

  fallbackImage() {
    this.showFallback = true;
  }
}
