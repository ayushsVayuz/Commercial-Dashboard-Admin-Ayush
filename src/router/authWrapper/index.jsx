import { useSearchParams } from "react-router-dom";
import { Unauthorized } from "../../components/unauthorized";

export const AuthWrapper = () => {
  const [searchParams] = useSearchParams();
  // const navigate = useNavigate();

  const tokenFromParams = searchParams.get("token");

  if (tokenFromParams) {
    localStorage.setItem("token", tokenFromParams);
  }

  const tokenFromLocalStorage = localStorage.getItem("token");

  if (!tokenFromLocalStorage) {
    if (window.location.hostname !== "localhost") {
      return <Unauthorized />;
      // window.location.href =
      //   "https://staging-reactdashboard.anacity.com/support_helpdesk";
    }
  }

  return <Outlet />;
};
