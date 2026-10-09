import { VgrButton } from '@vastra-gotalandsregionen/components-react';
import '@vastra-gotalandsregionen/components-core/dist/styles.css';

function App() {
  return (
    <VgrButton
      variant="primary"
      onVgrClick={() => alert('Reactknapp!')}
      text="Sparaa"
    />
  );
}

export default App;
