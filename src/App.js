import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartupPage from "./Pages/StartupPage";
import TranslationPage from "./Pages/TranslationPage";
import ProfilePage from "./Pages/ProfilePage";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path="/" element={<StartupPage />}></Route>
                    <Route path="/translation" element={<TranslationPage />}></Route>
                    <Route path="/profile" element={<ProfilePage />}></Route>
                    <Route path="*" element={<StartupPage />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
