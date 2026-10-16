import { VgrButton } from '@vastra-gotalandsregionen/components-react';

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
