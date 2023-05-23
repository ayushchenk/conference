import { Container } from "@mui/material";
import { LogoutForm } from "../../components/LogoutForm";

export const LogoutPage: React.FC<{}> = () => {
    return (
        <Container>
            <LogoutForm />
        </Container>
    );
}