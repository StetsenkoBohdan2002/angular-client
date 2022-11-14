import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { ButtonComponent } from './components/button/button.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';

@NgModule({
  declarations: [LogoComponent, ButtonComponent, ErrorModalComponent],
  imports: [CommonModule],
  exports: [LogoComponent, ButtonComponent, ErrorModalComponent],
})
export class SharedModule {}
