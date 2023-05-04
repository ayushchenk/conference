import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../Header";
import { ConferencesPage } from "../../pages/Conferences/ConferencesPage";

export const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<ConferencesPage />}></Route>
                <Route path="/conference/:id" element={<div>test</div>}></Route>
            </Routes>
        </BrowserRouter>
    );
}
