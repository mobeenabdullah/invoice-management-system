import { toast } from 'react-toastify';
import { signup } from '../store/features/user/userThunks';
import { Navigate } from "react-router-dom"
import { addUser } from '../store/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { RootState } from '../store/store';
import { useCookies } from 'react-cookie';

import { useState } from 'react';

import { 
  Avatar, 
  Button,     
  TextField,    
  Link, 
  Paper,      
  Grid, 
  Typography,
  Stack } from "@mui/material";
    
const Register = ()=> {
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['token']);

  const userState = useAppSelector((state:RootState) => state.user); 
  const userRegistereed = useAppSelector((state:RootState) => state.user.registeredUser);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [inValidEmail, setInValidEmail] = useState(false);
  const [inValidPassword, setInValidPassword] = useState(false);
  const [inValidPasswordMessage, setInValidPasswordMessage] = useState('');
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const emailValidRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


    if(!name || !email || !password || !confirmpassword) {
      toast.error("Please fill all fields!")
      return;
    }

    if (!email.match(emailValidRegex)) {
      setInValidEmail(true);
      return;
    }

    if(password !== confirmpassword) {
      setInValidPassword(true);
      setInValidPasswordMessage("Password not match!")
      return;
    }
    if(password.length < 6 ) {
      setInValidPassword(true);
      setInValidPasswordMessage("Password Must be 6 Character Long!")
      return;
    }

    const user = {
      name : name,
      email: email,
      password: password,
      confirmPassword : confirmpassword
    }

    const registeredUser = await signup(user);

    if(registeredUser && registeredUser.status === 200) {
      dispatch(addUser({...userState, registeredUser: true, signUpMessage: 'Signup Successfuly!'}))
    }
  }

  if(userRegistereed) {
    return <Navigate to='/login' />
  }

  if(cookies.token) { 
    return <Navigate to="/dashboard" />
  }

    return (
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
                {/* <LockOutlinedIcon />             */}
                A
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
              helperText={inValidEmail  ? 'Invalid email format!' : '' }
              variant="outlined"
              margin="normal"
              fullWidth
              name="email"
              label="Email"
              type="email"
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
              error= {inValidPassword  ? true : false }   
              helperText={inValidPassword  ? inValidPasswordMessage : '' }
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
              data-test='submit-sign-up'         
            >
              Register
            </Button>
            <Grid container  sx={{ padding: '20px', justifyContent: "center"}}>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"You already have account? Sign In"}
                </Link>
              </Grid>
            </Grid>         
          </form>
        </div>
      </Grid>
    </Grid> 
    )
  }
  
  export default Register