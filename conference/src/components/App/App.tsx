import { BrowserRouter, Route, Routes} from "react-router-dom";
import { Header } from "../Header";
import { ConferencesPage } from "../../pages/Conferences";
import { Protected } from "../ProtectedRoute/Protected";
import { SignUpPage, LoginPage } from "../../pages/Auth";

export const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/sign-up" element={<SignUpPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/" element={
                    <Protected> 
                        <ConferencesPage />
                    </Protected>
                }/>
                <Route
                    path="/conferences/:id" 
                    element={
                    <Protected> 
                        <div>test</div>
                    </Protected>
                }/>
            </Routes>
        </BrowserRouter>
    );
}
