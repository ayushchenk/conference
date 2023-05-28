import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { Auth } from "../../logic/Auth";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();

  function handleLogout() {
    Auth.logout();
    navigate("/login");
  }

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Box className="header__box">
          <Button color="inherit">
            <Link className="header__link" to="/users">
              Users
            </Link>
          </Button>
          <Button color="inherit">
            <Link className="header__link" to="/">
              Conferences
            </Link>
          </Button>
          <Button color="inherit">
            <Link className="header__link" to="/create-conference">
              Create conference
            </Link>
          </Button>
        </Box>
        {Auth.isAuthed() ? (
          <Button color="inherit" className="header__link" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button color="inherit">
              <Link className="header__link" to="/login">
                Login
              </Link>
            </Button>
            <Button color="inherit">
              <Link className="header__link" to="/sign-up">
                Sign up
              </Link>
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
