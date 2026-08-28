import { VgrButton } from "@vgregion/components-react";
import "@vgregion/design-tokens/dist/css/tokens.css";

function App() {
  return (
    <VgrButton variant="primary" onVgrClick={() => alert("Reactknapp!")}>
      Spara
    </VgrButton>
  );
}

export default App;
