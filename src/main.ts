import { enableProdMode, importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';

import { AccessTokenInterceptor } from '@core/interceptors';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { environment } from './environments/environment';
import { MatDialogModule } from '@angular/material/dialog';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MatDialogModule
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true,
    },
  ],
});
