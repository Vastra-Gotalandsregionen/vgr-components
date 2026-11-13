import { Component } from '@angular/core';
import {
  VgrButton,
  VgrHelpIconAndText,
  VgrIcon,
  VgrTextField,
} from '@vastra-gotalandsregionen/components-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VgrButton, VgrIcon, VgrHelpIconAndText, VgrTextField],
  templateUrl: './app.html',
})
export class App {
  readonly plusIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z"/></svg>';

  readonly longInfo = {
    title: 'Regionövergripande dokument',
    text: 'Inkluderar övergripande dokument som gäller för alla verksamheter och förvaltningar i Västra Götalandsregionen. Det innefattar bland annat regionala medicinska riktlinjer och rutiner, men också andra styrande dokument som gäller övergripande för hela Västra Götalandsregionen.',
  };

  showAlert(message: string) {
    alert(message);
  }
}
