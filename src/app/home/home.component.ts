import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SettingsService } from '../services/settings.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  enableAccount = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private settingsService: SettingsService,
    private authService: AuthService
  ) {
    this.settingsService.accountSettingChanged$.subscribe(result => {
      this.enableAccount = result;
    });

    this.settingsService
      .userSettings()
      .pipe(tap((settings: any) => (this.enableAccount = settings.isAccountEnabled)))
      .subscribe();
  }

  ngOnInit(): void {}

  onLogoutClick() {
    this.authService.redirectToLogin();
  }
}
