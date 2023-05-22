import { Container } from "@mui/material";
import { LoginForm } from "../../components/LoginForm";

interface LoginPageProps {
    logIn: Function;
  }

export const LoginPage: React.FC<LoginPageProps> = ({ logIn }) => {
    return (
        <Container>
            <h2>Login</h2>
            <LoginForm logIn={logIn} />
        </Container>
    );
}