import { Container } from "@mui/material";
import { LoginForm } from "../../components/LoginForm";

export const LoginPage: React.FC<{}> = () => {
    return (
        <Container>
            <h2>Login</h2>
            <LoginForm />
        </Container>
    );
}