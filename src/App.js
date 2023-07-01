import AppRouter from "routes";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "context/socketContext";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SocketProvider>
          <AppRouter />
        </SocketProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
