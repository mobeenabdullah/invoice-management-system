import { signin } from "../features/user/userThunks";
import { addUser } from "../features/user/userSlice";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import Loading from "../components/Loading";
import { FC } from "react";
import styled from "styled-components";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alert from "@mui/material/Alert";
import jwt_decode from "jwt-decode";

import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Stack,
} from "@mui/material";

const Wrapper = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2%;
  .avatar {
    background-color: #13a800;
  }
  .submit {
    margin-top: 1rem;
    padding: 1rem;
  }
  .login_image {
    height: 95vh;
    border-radius: 16px;
    overflow: hidden;
    background-image: url("invoice-login.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .login_image li {
    height: 100% !important;
  }
  .login_image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .login_form .paper {
    max-width: 50%;
    width: 100%;
    margin: 0 auto;
  }
`;

const SignIn: FC = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state: RootState) => state.user);
  const userRegistered = useAppSelector(
    (state: RootState) => state.user.registeredUser
  );
  const signUpSuccessMessage = useAppSelector(
    (state: RootState) => state.user.signUpMessage
  );

  const [inValidEmail, setInValidEmail] = useState(false);
  const [inValidPassword, setInValidPassword] = useState(false);
  const [inValidPasswordMessage, setInValidPasswordMessage] = useState("");
  const [inValidEmailMessage, setInValidEmailMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isloggedIn, setIsloggedIn] = useState(false);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [signupMessage, setSignupMessage] = useState("");

  // cookies Token
  const [cookies, setCookie] = useCookies(["authToken"]);

  useEffect(() => {
    // signup message
    if (userRegistered) {
      setSignupMessage(signUpSuccessMessage);
    }
    if (cookies.authToken) {
      try {
        const decodedToken: any = jwt_decode(cookies.authToken);
        const dateNow = new Date();
        if (decodedToken.exp * 1000 > dateNow.getTime()) {
          setIsloggedIn(true);
        } else {
          setIsloggedIn(false);
        }
      } catch (error) {
        setIsloggedIn(false);
      }
    }

    const timer = setTimeout(() => {
      setIsError(false);
      setErrorMessage("");
      setSignupMessage("");
      clearTimeout(timer);
    }, 3000);
  }, [isError, cookies.authToken]);

  // Handle submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const emailValidRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (userEmail === "") {
      setInValidEmail(true);
      setInValidEmailMessage("Email is required!");
      return;
    }

    if (!userEmail.match(emailValidRegex)) {
      setInValidEmail(true);
      setInValidEmailMessage("Email format is inValid!");
      return;
    }

    if (userPassword.length < 6) {
      setInValidPassword(true);
      setInValidPasswordMessage("Password Must be 6 Character Long!");
      return;
    }

    try {
      const userData = {
        email: userEmail,
        password: userPassword,
      };

      setIsLoading(true);
      const isLoggedIn = await signin(userData);
      if (isLoggedIn && isLoggedIn.status === 200) {
        const { email, name, user_id } = isLoggedIn.data;
        dispatch(addUser({ ...userState, email, name, user_id }));
        setCookie("authToken", isLoggedIn.data.token);
        setIsLoading(false);
        setIsloggedIn(true);
      }
    } catch (error: any) {
      setIsError(true);
      if (error.status === 500) {
        setErrorMessage("No internet connectivity");
      } else {
        setErrorMessage(error.response.data);
      }
      setIsLoading(false);
      setUserEmail("");
      setUserPassword("");
    }
  };

  // redirect to dashboard if logged in
  if (isloggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Wrapper>
      <Grid
        container
        rowSpacing={1}
        alignItems="center"
        columnSpacing={{ xs: 1, sm: 2, md: 3, p: 2 }}
      >
        <Grid item xs={6}>
          <Stack className="login_image"> </Stack>
        </Grid>
        <Grid item xs={6} className="login_form">
          <Stack className="paper">
            {signupMessage && (
              <Stack sx={{ width: "100%" }} mb={2}>
                <Alert severity="success">{signupMessage}</Alert>
              </Stack>
            )}
            {isError && (
              <Stack sx={{ width: "100%" }} mb={2}>
                <Alert severity="error">{errorMessage}</Alert>
              </Stack>
            )}
            <Stack spacing={2}>
              <Stack
                className="avatar_alignment"
                sx={{ display: "flex", alignItems: "center" }}
                spacing={1}
              >
                <Avatar className="avatar">
                  <LockOutlinedIcon />
                </Avatar>
              </Stack>
              <Stack spacing={1} sx={{ textAlign: "center" }}>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
              </Stack>
            </Stack>

            <form className="form" noValidate onSubmit={handleSubmit}>
              <Typography
                component="p"
                color="error"
                data-test="form-error"
              ></Typography>
              <TextField
                error={inValidEmail ? true : false}
                helperText={inValidEmail ? inValidEmailMessage : ""}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                data-test="email"
              />
              <Typography component="p" data-test="email-error"></Typography>
              <TextField
                error={inValidPassword ? true : false}
                helperText={inValidPassword ? inValidPasswordMessage : ""}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={userPassword}
                autoComplete="current-password"
                onChange={(e) => setUserPassword(e.target.value)}
                data-test="password"
              />
              <Typography component="p" data-test="password-error"></Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
                data-test="submit-login"
                disabled={isLoading ? true : false}
              >
                {isLoading ? <Loading /> : "Sign In"}
              </Button>
              <Grid
                container
                sx={{ padding: "20px", justifyContent: "center" }}
              >
                <Grid item display="flex" sx={{ gap: "10px" }}>
                  <Typography component="p" variant="body2">
                    Don't have an account?
                  </Typography>
                  <Link href="/register" variant="body2">
                    {"Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Stack>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default SignIn;
