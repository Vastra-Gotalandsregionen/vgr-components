import { VgrButton } from '@vgregion/components-react';
import '@vgregion/components-core/dist/styles.css';

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
