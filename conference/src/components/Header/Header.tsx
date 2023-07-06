import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { Auth } from "../../util/Auth";
import "./Header.css";
import { AdminVisibility } from "../ProtectedRoute/AdminVisibility";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useCallback } from "react";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    Auth.logout();
    navigate("/login");
  }, [navigate]);

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Box className="header__box">
          <Button color="inherit">
            <Link className="header__link" to="/">
              Conferences
            </Link>
          </Button>
          <AdminVisibility>
            <Button color="inherit">
              <Link className="header__link" to="/users">
                Users
              </Link>
            </Button>
            <Button color="inherit">
              <Link className="header__link" to="/conferences/new">
                Create conference
              </Link>
            </Button>
          </AdminVisibility>
        </Box>
        {Auth.isAuthed() ? (
          <>
            <Button color="inherit" className="header__link" onClick={handleLogout}>
              Logout
            </Button>
            <IconButton size="large" color="inherit" onClick={() => navigate("/profile")}>
              <AccountCircle />
            </IconButton>
          </>
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
