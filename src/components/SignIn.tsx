import { toast } from 'react-toastify';
import { signin } from '../store/features/user/userThunks';
import { addUser } from '../store/features/user/userSlice';
import { useState } from 'react';
import { Navigate } from "react-router-dom"
import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { RootState } from '../store/store';
import Loading from './Loading';
import { FC } from "react";  
import styled from "styled-components";
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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
        background-image: url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-color: #cecece;
        display: flex;
        align-items: center;
        justify-content: center;
        .avatar {            
            background-color: #1976d2;
        }       
        .submit {
          margin-top: 1rem;
          padding: 1rem;
        }
    `;

const SignIn: FC =  ()=> {

  const dispatch = useAppDispatch();
  const userState = useAppSelector((state:RootState) => state.user); 
  const [inValidEmail, setInValidEmail] = useState(false);
  const [inValidPassword, setInValidPassword] = useState(false);
  const [inValidPasswordMessage, setInValidPasswordMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  

  // cookies Token
  const [cookies, setCookie] = useCookies(['token']);


  // signup message
  if(userState.registeredUser) {
    toast.success(userState.signUpMessage);
  }

  // Handle submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const emailValidRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!userEmail || !userPassword) {
      toast.error("Please fill all fields!");
      return;
    }

    if (!userEmail.match(emailValidRegex)) {
      setInValidEmail(true);
      return;
    }

    if(userPassword.length < 6 ) {
      setInValidPassword(true);
      setInValidPasswordMessage("Password Must be 6 Character Long!")
      return;
    }

    const userData = {
      email: userEmail,
      password: userPassword,
    }
    setIsLoading(true);
    const isLoggedIn = await signin(userData);

    if(isLoggedIn && isLoggedIn.status === 200) {
          
          const {email, name, user_id} = isLoggedIn.data;
          dispatch(addUser({...userState, email, name,user_id}));
          setCookie('token', isLoggedIn.data.token);
          setIsLoading(false);
    }

  }

  if(cookies.token) { 
    return <Navigate to="/dashboard" />
  }

  return ( 
    <Wrapper>
      <Container fixed>
    <Grid container alignItems='center' justifyContent='center' component="main" className="form_login" sx={{ height: "100vh"}}>    
     
      <Grid
        className="size"
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={1}
        square
        sx={{ padding: "30px" }}
      >
        <div className="paper">
          <Stack spacing={2}>
            <Stack className="avatar_alignment" sx={{display: "flex", alignItems: "center"}} spacing={1}>
              <Avatar className="avatar">
                <LockOutlinedIcon />                
              </Avatar>
            </Stack>
            <Stack spacing={1} sx={{textAlign: "center"}}>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </Stack>           
          </Stack>         
          
          <form className="form" noValidate onSubmit={handleSubmit}   >
            
              <Typography component="p" data-test='form-error'></Typography>

            <TextField            
              error= {inValidEmail  ? true : false }
              helperText={inValidEmail  ? 'Invalid email format!' : '' }
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type='email'
              value={userEmail}
              autoFocus
              onChange={(e) => setUserEmail(e.target.value)}
              data-test='email'
            />
            <Typography component="p" data-test='email-error'></Typography>
            <TextField       
              error= {inValidPassword  ? true : false }   
              helperText={inValidPassword  ? inValidPasswordMessage : '' }     
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
              data-test='password'
            />            
            <Typography component="p" data-test='password-error'></Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"      
              data-test='submit-login'        
              disabled= {isLoading  ? true : false }
            >
              {isLoading ? <Loading /> : 'Sign In'}
            </Button>
            <Grid container sx={{ padding: '20px', justifyContent: "center"}}>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>            
          </form>
        </div>
      </Grid>
    </Grid> 
    </Container>
    </Wrapper>     
  )
}

export default SignIn