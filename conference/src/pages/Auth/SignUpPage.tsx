import { Container } from "@mui/material";
import { SignUpForm } from "../../components/SignUpForm";

export const SignUpPage = () => {
    return (
        <Container>
            <h2>Sign Up</h2>
            <SignUpForm />
        </Container>
    );
}