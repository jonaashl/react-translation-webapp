import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginView from "./views/LoginView"
import TranslationView from "./views/TranslationView"
import ProfileView from "./views/ProfileView"
import Navbar from "./components/Navbar/Navbar"

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/" element={<LoginView />} />
                    <Route path="/translation" element={<TranslationView />} />
                    <Route path="/profile" element={<ProfileView />} />
                    <Route path="*" element={<LoginView />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
