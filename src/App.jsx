import InTheBeginning from "./InTheBeginning";
import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <InTheBeginning />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
