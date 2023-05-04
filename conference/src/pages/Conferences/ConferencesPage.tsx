import { Container } from "@mui/material";
import { ConferencesGrid } from "../../components/ConferencesGrid";

export const ConferencesPage = () => {
    return (
        <Container>
            <h2>Your conferences</h2>
            <ConferencesGrid />
        </Container>
    );
}