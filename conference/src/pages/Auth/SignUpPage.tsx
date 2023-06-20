import { Container } from "@mui/material";
import { SignUpForm } from "../../components/SignUpForm";
import { FormHeader } from "../../components/FormHeader";

export const SignUpPage: React.FC<{}> = () => {
    return (
        <Container>
            <FormHeader>Sign Up</FormHeader>
            <SignUpForm />
        </Container>
    );
}