import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/Pages/LoginPage";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path="*" element={<LoginPage />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
