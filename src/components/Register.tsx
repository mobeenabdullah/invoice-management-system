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
          
          <form className="form" noValidate>
            <TextField            
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
            />
            <TextField            
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"              
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

            <TextField            
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="current-password"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"              
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