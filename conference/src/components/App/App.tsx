import axios from 'axios';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { Header } from "../Header";
import { ConferencesPage } from "../../pages/Conferences";
import { Protected } from "../ProtectedRoute/Protected";
import { SignUpPage, LoginPage } from "../../pages/Auth";


export const App = () => {
    const logIn = (token: string) => {
        localStorage.setItem("accessToken", token);
        axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
    };
    const logOut = () => {
        localStorage.removeItem("accessToken");
        delete axios.defaults.headers.common["Authorization"];
    };

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/sign-up" element={<SignUpPage logIn={logIn} />}></Route>
                <Route path="/login" element={<LoginPage logIn={logIn} />}></Route>
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
