import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Unauthorized } from "../../components/unauthorized";

export const AuthWrapper = () => {
  const [searchParams] = useSearchParams();
  // const navigate = useNavigate();

  const tokenFromParams = searchParams.get("token");
  const tokenFromLocalStorage = localStorage.getItem("token");

  useEffect(() => {
    if (tokenFromParams) {
      localStorage.setItem("token", tokenFromParams);
    }
  }, [searchParams, tokenFromParams]);

  useEffect(() => {
    if (!tokenFromLocalStorage) {
      if (window.location.hostname !== "localhost") {
        <Unauthorized />;
        // window.location.href =
        //   "https://staging-reactdashboard.anacity.com/support_helpdesk";
      }
    }
  }, [tokenFromLocalStorage]);

  return <Outlet />;
};
