import logo from "./logo.svg";
import "./App.css";
import HomePage from "./components/screens/HomePage";
import { SnackbarProvider } from "notistack";

function App() {
    return (
        <SnackbarProvider>
            <div className="App">
                <HomePage />
            </div>
        </SnackbarProvider>
    );
}

export default App;
