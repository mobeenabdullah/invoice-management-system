import { toast } from 'react-toastify';
import { signup } from '../features/user/userThunks';
import { Navigate } from "react-router-dom"
import { addUser } from '../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { RootState } from '../store/store';
import { useCookies } from 'react-cookie';
import { useState,useEffect } from 'react';
import { FC } from "react";  
import styled from "styled-components";
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Loading from './Loading';
import { userDetail } from '../features/user/userThunks';

import { 
  Avatar, 
  Button,     
  TextField,    
  Link, 
  Paper,      
  Grid, 
  Typography,
  Stack } from "@mui/material";

  const Wrapper = styled.section`
        height: 100vh;      
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 2%;
        .avatar {            
            background-color: #1976d2;
        }       
        .submit {
          margin-top: 1rem;
          padding: 1rem;
        }
        .login_image {
          height: 95vh;
          border-radius: 16px;
          overflow: hidden;
          background-image: url('sign-up-image.jpg');
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
    
const Register: FC = ()=> {
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['token']);

  const userState = useAppSelector((state:RootState) => state.user); 
  const userRegistered = useAppSelector((state:RootState) => state.user.registeredUser);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');

  const [inValidName, setInValidName] = useState(false);
  const [inValidEmail, setInValidEmail] = useState(false);
  const [inValidEmailMessage, setInValidEmailMessage] = useState('');
  const [inValidPassword, setInValidPassword] = useState(false);
  const [inValidPasswordMessage, setInValidPasswordMessage] = useState('');
  const [inValidConfirmPassword, setInValidConfirmPassword] = useState(false);
  const [inValidConfirmPasswordMessage, setInValidConfirmPasswordMessage] = useState('');
  const [isloggedIn, setIsloggedIn] = useState(false);

  useEffect(() => {
    // has Logged in 
    const hasloggedIn : any =  userDetail(cookies.token);

    hasloggedIn.then((user: any) => {
      if(cookies.token && user.status === 200) {
        setIsloggedIn(true);
      }
    });
  }, [])
  
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const emailValidRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


    if(name === '') {
      setInValidName(true);
      return;
    } else {
      setInValidName(false);
    }

    if(email === '') {
      setInValidEmail(true);
      setInValidEmailMessage('Name is required!');
      return;
    } else {
      setInValidEmail(false);
    }

    if (!email.match(emailValidRegex)) {
      setInValidEmail(true);
      setInValidEmailMessage('Email format is invalid!');
      return;
    } else {
      setInValidEmail(false);
      setInValidEmailMessage('');
    }

    if(password.length < 6 ) {
      setInValidPassword(true);
      setInValidPasswordMessage("Password Must be 6 Character Long!")
      return;
    } else {
      setInValidPassword(false);
      setInValidPasswordMessage("")
    }

    if(password !== confirmpassword) {
      setInValidPassword(true);
      setInValidConfirmPassword(true);
      setInValidConfirmPasswordMessage("Password not match!");
      setInValidPasswordMessage("Password not match!")
      return;
    }


    const user = {
      name : name,
      email: email,
      password: password,
      confirmPassword : confirmpassword
    }

    try{
      const registeredUser = await signup(user);

      if(registeredUser && registeredUser.status === 200) {
        dispatch(addUser({...userState, registeredUser: true, signUpMessage: 'Signup Successfuly!'}))
      }

    } catch (error: any) {

        if(error.status === 500) {
          toast.error('No internet connectivity');
        } 
        toast.error(error.response.data);
        setIsLoading(false);
        
    } 


  }

  if(userRegistered) {
    return <Navigate to='/login' />
  }

  // redirect to dashboard if logged in
  if(isloggedIn) { 
    return <Navigate to="/" />
  }

    return (
      <Wrapper>        
        <Grid container rowSpacing={1} alignItems="center" columnSpacing={{ xs: 1, sm: 2, md: 3, p: 2 }}>
        <Grid item xs={6} className="login_form">
          <Stack className="paper">          
            <Stack spacing={2}>
              <Stack className="avatar_alignment" sx={{display: "flex", alignItems: "center"}} spacing={1}>
                <Avatar className="avatar">
                  <LockOutlinedIcon />
                </Avatar>
              </Stack>
              <Stack spacing={1} sx={{textAlign: "center"}}>
                <Typography component="h1" variant="h5">
                  Register
                </Typography>
              </Stack>           
            </Stack>         
            <form className="form" onSubmit={handleSubmit}>
            <Typography component="p" data-test='form-error'></Typography>

              <TextField  
                error= {inValidName  ? true : false }
                helperText={inValidName  ? 'Name is required!' : '' }          
                variant="outlined"
                margin="normal"
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
                data-test='name'
              />
              <Typography component="p" data-test='name-error'></Typography>

              <TextField       
                error= {inValidEmail  ? true : false }
                helperText={inValidEmail  ? inValidEmailMessage : '' }
                variant="outlined"
                margin="normal"
                fullWidth
                name="email"
                label="Email"
                id="email"       
                onChange={(e: any) => setEmail(e.target.value)}
                data-test='email'
              />
              <Typography component="p" data-test='email-error'></Typography>
              <TextField         
                error= {inValidPassword  ? true : false }   
                helperText={inValidPassword  ? inValidPasswordMessage : '' }
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                data-test='password'
              />
              <Typography component="p" data-test='password-error'></Typography>

              <TextField            
                error= {inValidConfirmPassword  ? true : false }   
                helperText={inValidConfirmPassword  ? inValidConfirmPasswordMessage : '' }
                variant="outlined"
                margin="normal"
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="current-password"
                onChange={(e) => setConfirmpassword(e.target.value)}
                data-test='confirm-password'
              />
              <Typography component="p" data-test='confirm-password-error'></Typography>
            
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"     
                disabled= {isLoading  ? true : false }
              >
                {isLoading ? <Loading /> : 'Register'}
              </Button>
              <Grid container  sx={{ padding: '20px', justifyContent: "center"}}>
                <Grid item  display="flex" sx={{gap: "10px"}}>
                  <Typography component="p" variant="body2">You already have account?</Typography>
                  <Link href="/login" variant="body2">
                    {"Sign In"}
                  </Link>
                </Grid>
              </Grid>         
            </form>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack className="login_image"></Stack>
        </Grid>    
    </Grid> 
    
    </Wrapper>
    )
  }
  
  export default Register