import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../logic/Auth";

export const LogoutForm: React.FC<{}> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Auth.logout()
    navigate("/login");
  }, []);

  return null;
};