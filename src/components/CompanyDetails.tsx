import {
    Button,     
    TextField,        
    Paper,      
    Grid, 
    Typography,
    Stack } from "@mui/material";

  import { FC } from "react";  
  import styled from "styled-components";
  import Container from '@mui/material/Container'; 
  import Header from './Header'; 

  const Wrapper = styled.section`
        width:100%;
        height: 100vh;
        background-image: url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
        background-repeat: no-repeat !important;
        background-position: center;
        background-size: cover;
        background-color: #cecece;
        display: flex;
        align-items: center;
        justify-content: center;
              
      .size {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
      }
      .paper {            
          display: flex;
          flex-direction: column;
          align-items: center;
      }
      .avatar {            
          background-color: #1976d2;
      }
      .form {
          width: 100%;            
      }
      .submit {
        margin-top: 1rem;
        padding: 1rem;
      }
  `;

  const CompanyDetails: FC = ()=> {
      return (
        <>
        <Header />
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
                      <Stack spacing={1} sx={{textAlign: "center"}}>
                          <Typography component="h1" variant="h4">
                            Let's Get Started
                          </Typography>
                          <Typography component="p">
                              First, we need some information
                          </Typography>
                      </Stack>           
                  </Stack>         
                  
                  <form className="form" noValidate>
                    <TextField            
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="company_name"
                      label="Company Name"
                      name="company_name"
                      autoFocus
                    />
                    <TextField            
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="company_address"
                      label="Company Address"
                      name="company_address"
                      autoFocus
                    />
                    <TextField            
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="company_iban"
                      label="IBAN"
                      name="company_iban"
                      autoFocus
                    />
                    <TextField            
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="vat_number"
                      label="VAT Number"
                      name="vat_number"
                      autoFocus
                    />
                    <TextField            
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="registry_number"
                      label="Registry Number"
                      name="registry_number"
                      autoFocus
                    />
                    <TextField            
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="swift"
                      label="SWIFT"
                      name="swift"
                      autoFocus
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className="submit"              
                    >
                      Submit
                    </Button>                          
                  </form>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Wrapper>
        </>
         
      )
    }
    
    export default CompanyDetails