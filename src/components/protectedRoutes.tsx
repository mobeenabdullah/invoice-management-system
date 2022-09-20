import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import useAddUser from "../hooks/customHooks";

type propstype = {
  component: JSX.Element;
};

const Protected = ({ component }: propstype) => {
  const [cookies] = useCookies(["authToken"]);
  useAddUser();
  if (cookies.authToken) {
    try {
      const decodedToken: any = jwt_decode(cookies.authToken);
      const dateNow = new Date();

      if (decodedToken.exp * 1000 > dateNow.getTime()) {
        return component;
      } else {
        return <Navigate to="/login" />;
      }
    } catch (error) {
      return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default Protected;
