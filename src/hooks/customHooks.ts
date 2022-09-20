import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addUser } from "../features/user/userSlice";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { userDetail } from "../features/user/userThunks";
import { useCookies } from "react-cookie";

const useAddUser = () => {
  const [cookies, removeCookie] = useCookies(["authToken"]);
  const userState = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
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
            })
          );
        } else {
          removeCookie("authToken", []);
        }
      }
    };
    userDetailsFetch(cookies.authToken);
  }, []);
  return [];
};

export default useAddUser;
