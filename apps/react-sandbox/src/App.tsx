import {
  VgrButton,
  VgrHelpIconAndText,
  VgrIcon,
  VgrTextField,
} from '@vastra-gotalandsregionen/components-react';

const plusIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z"/></svg>';

const longInfo = {
  title: 'Regionövergripande dokument',
  text: 'Inkluderar övergripande dokument som gäller för alla verksamheter och förvaltningar i Västra Götalandsregionen. Det innefattar bland annat regionala medicinska riktlinjer och rutiner, men också andra styrande dokument som gäller övergripande för hela Västra Götalandsregionen.',
};

function App() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 16 }}
    >
      <h2>Button</h2>
      <div style={{ display: 'flex', gap: 12 }}>
        <VgrButton
          variant="primary"
          text="Spara"
          onVgrClick={() => alert('React: Spara')}
        />
        <VgrButton
          variant="secondary"
          text="Avbryt"
          icon={plusIcon}
          onVgrClick={() => alert('React: Avbryt')}
        />
      </div>

      <h2>Icon</h2>
      <VgrIcon icon={plusIcon} />

      <h2>Help icon and text</h2>
      <VgrHelpIconAndText info={{ text: 'Hejhej min text' }} />

      <h2>Text field</h2>
      <VgrTextField label="Namn" helpText="Skriv ditt namn" />
      <VgrTextField label="Titel" error="Titel får inte vara tom" required />
      <VgrTextField label="Dokumenttyp" optional info={longInfo} />
      <VgrTextField type="textarea" label="Adress" disabled />
    </div>
  );
}

export default App;
