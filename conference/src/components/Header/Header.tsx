import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { Auth } from "../../logic/Auth";
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
                {
                    Auth.isAuthed() ? 
                    <Button color="inherit">
                        <Link className="header__link" to="/logout">Logout</Link>
                    </Button>
                    :
                    <>
                        <Button color="inherit">
                            <Link className="header__link" to="/login">Login</Link>
                        </Button>
                        <Button color="inherit">
                            <Link className="header__link" to="/sign-up">Sign up</Link>
                        </Button>
                    </>
                }
            </Toolbar>
        </AppBar>
    );
}