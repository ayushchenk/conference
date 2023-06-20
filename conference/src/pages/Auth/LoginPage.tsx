import { Container } from "@mui/material";
import { LoginForm } from "../../components/LoginForm";
import { FormHeader } from "../../components/FormHeader";

export const LoginPage: React.FC<{}> = () => {
    return (
        <Container>
            <FormHeader>Login</FormHeader>
            <LoginForm />
        </Container>
    );
}