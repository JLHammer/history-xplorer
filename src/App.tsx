import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Header } from "./components/partials/Header";
import { NavBar } from "./components/partials/NavBar";
import { Main } from "./components/partials/Main";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <NavBar />
      <Main>
        <AppRouter />
      </Main>
    </BrowserRouter>
  );
}

export default App;
