import { Component } from '@angular/core';
import { VgrButton } from '@vastra-gotalandsregionen/components-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VgrButton],
  templateUrl: './app.html',
})
export class App {
  onSave() {
    console.log('Klick!');
  }
}
