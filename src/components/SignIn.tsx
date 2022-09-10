import { 
    Avatar, 
    Button,     
    TextField,    
    Link, 
    Paper,      
    Grid, 
    Typography,
    Stack } from "@mui/material";

    import styled from 'styled-components';
    
    /*
    const Wrapper = styled.cover`
        height: "100vh";
        background-image: url('https://images.unsplash.com/photo-1662723797266-1649be2dc89f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');
        background-repeat: "no-repeat";
        background-position: "center";
        background-size: "cover";
        background-color: '#cecece';
        display: "flex";
        align-items: "center";
        justify-content: "center";
        .size {
            display: "flex";
            flex-direction: "column";
            align-items: "center";
            justify-content: "center";
        }
        .paper {            
            display: "flex";
            flex-direction: "column";
            align-items: "center";
        }
        .avatar {            
            background-color: red;
        }
        .form {
            width: "100%";            
        }
    `;
*/
const SignIn = ()=> {
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
                Sign in
              </Typography>
            </Stack>           
          </Stack>         
          
          <form className="form" noValidate>
            <TextField            
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField            
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"              
            >
              Sign In
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
  )
}

export default SignIn