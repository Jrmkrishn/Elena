import { Outlet } from "react-router-dom";
import "./App.css";
import Container from "./(Component)/Container";

function App() {
  return (
    <Container className="w-full min-h-screen flex-row">
      <Outlet />
    </Container>
  );
}

export default App;
