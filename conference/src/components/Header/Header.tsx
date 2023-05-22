import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Box className="header__box">
                    <Button color="inherit">
                        <Link className="header__link" to="/">Conferences</Link>
                    </Button>
                </Box>
                <Button color="inherit">
                    <Link className="header__link" to="/login">Login</Link>
                </Button>
                <Button color="inherit">
                    <Link className="header__link" to="/sign-up">Sign up</Link>
                </Button>
            </Toolbar>
        </AppBar>
    );
}