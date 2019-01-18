import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { SidebarModule } from 'ng-sidebar';
import { CellDetailComponent } from './modules/cell-detail/cell-detail.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CellDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SidebarModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
