import { VgrButton } from '@vgregion/components-react';
import '@vgregion/design-tokens/dist/css/tokens.css';

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
