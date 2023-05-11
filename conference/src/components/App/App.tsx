import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../Header";
import { ConferencesPage } from "../../pages/Conferences";
import { SignUpPage } from "../../pages/Auth";

export const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<ConferencesPage />}></Route>
                <Route path="/conference/:id" element={<div>test</div>}></Route>
                <Route path="/sign-up" element={<SignUpPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
