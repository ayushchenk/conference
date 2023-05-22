import { Container } from "@mui/material";
import { SignUpForm } from "../../components/SignUpForm";

interface SignUpPageProps {
    logIn: Function;
  }

export const SignUpPage: React.FC<SignUpPageProps> = ({ logIn }) => {
    return (
        <Container>
            <h2>Sign Up</h2>
            <SignUpForm logIn={logIn} />
        </Container>
    );
}