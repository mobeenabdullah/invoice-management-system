import { useEffect } from "react";
import { userDetail } from "../features/user/userThunks";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addUser } from "../features/user/userSlice";
import { RootState } from "../store/store";

export const useAddUser = () => {
  const [cookies, removeCookie] = useCookies(["authToken"]);
  const userState = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const userDetailsFetch: any = async (token: string) => {
    if (token) {
      const response = await userDetail(token);
      if (response.status === 200) {
        const user = response.data;
        dispatch(
          addUser({
            ...userState,
            user_id: user.id,
            name: user.name,
            email: user.email,
            companyDetails: user.companyDetails
          })
        );
      } else {
        removeCookie("authToken", {path:'/'});
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    userDetailsFetch(cookies.authToken);
  }, []);
  return [];
};

export const useCompanyDetailGuard = () => {
  const navigate = useNavigate();
  const userCompanyDetail = useAppSelector((state: RootState) => state.user.companyDetails);

  useEffect(() => {
    if(!userCompanyDetail) {
      navigate('/company-detail');
    }
  }, [userCompanyDetail])

  return;
}
