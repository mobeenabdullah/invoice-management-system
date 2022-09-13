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
import { updateUser } from "../features/user/userThunks";
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import Loading from "./Loading";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

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
    const [cookies] = useCookies(['token']);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [iban, setIban] = useState('');
    const [vat, setVat] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [swift, setSwift] = useState('');

    const [invalidName, setInvalidName] = useState(false);
    const [invalidAddress, setInvalidAddress] = useState(false);
    const [invalidVat, setInvalidVat] = useState(false);
    const [invalidRegistrationNumber, setInvalidRegistrationNumber] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [companyAdded, setCompanyAdded] = useState(false);

    const handleSubmit = async (e: any) => {
      e.preventDefault();

      if(name === '' || name.length < 3 || name.length > 16 ) {
        setInvalidName(true);
        return;
       } else {
          setInvalidName(false)
       };


       if(address === '') {
        setInvalidAddress(true)
        return;
       } else {
        setInvalidAddress(false)
       };

       if(vat === '') {
        setInvalidVat(true)
        return;
       } else {
        setInvalidVat(false)
       };

       if(registrationNumber === '') {
        setInvalidRegistrationNumber(true);
        return;
       } else {
        setInvalidRegistrationNumber(false);
       };

        const companyData = {
          name: name,
          address: address,
          vatNumber: vat,
          regNumber: registrationNumber,
          iban: iban,
          swift: swift
        }
  
        try{
          setIsLoading(true);
          const userUpdated = await updateUser(companyData, cookies.token);
  
          if(userUpdated && userUpdated.response && userUpdated.response.status === 200 && userUpdated.type === 'updated') { 
            setIsLoading(false);
            toast.success('Successfully company details updated!')
          } else if(userUpdated && userUpdated.response && userUpdated.response.status === 200 && userUpdated.type === 'added'){
            setIsLoading(false);
            setCompanyAdded(true);
          }

          
  
        } catch (error: any) {
  
            if(error.status === 500) {
              toast.error('No internet connectivity');
            } 
            toast.error(error.response.data);
        }     
  
      


    }

    if(companyAdded) {
      return <Navigate to='/' />
    }

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
                  
                  <form className="form" noValidate onSubmit={handleSubmit}>
                    <Typography component="p" data-test='success-message'></Typography>
                    <TextField       
                      error= {invalidName  ? true : false }   
                      helperText={invalidName  ? 'Company name is required!' : '' }     
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="company_name"
                      label="Company Name"
                      name="company_name"
                      autoFocus
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      data-test='company-name'
                    />
                    <Typography component="p" data-test='company-name-error'></Typography>
                    <TextField            
                      error= {invalidAddress  ? true : false }   
                      helperText={invalidAddress  ? 'Company address is required!' : '' } 
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="company_address"
                      label="Company Address"
                      name="company_address"
                      autoFocus
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      data-test='company-address'
                    />
                    <Typography component="p" data-test='company-address-error'></Typography>
                    <TextField            
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="company_iban"
                      label="IBAN"
                      name="company_iban"
                      autoFocus
                      onChange={(e) => setIban(e.target.value)}
                      value={iban}
                      data-test='company-iban'
                    />
                    <Typography component="p" data-test='company-iban-error'></Typography>
                    <TextField         
                      error= {invalidVat  ? true : false }   
                      helperText={invalidVat  ? 'Vat number is required!' : '' }   
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="vat_number"
                      label="VAT Number"
                      name="vat_number"
                      autoFocus
                      type='number'
                      onChange={(e) => setVat(e.target.value)}
                      value={vat}
                      data-test='company-vat'
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <Typography component="p" data-test='company-vat-error'></Typography>
                    <TextField            
                      error= {invalidRegistrationNumber  ? true : false }   
                      helperText={invalidRegistrationNumber  ? 'Registration number is required!' : '' }
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="registry_number"
                      label="Registry Number"
                      name="registry_number"
                      autoFocus
                      type='number'
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      value={registrationNumber}
                      data-test='company-reg-number'
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <Typography component="p" data-test='company-reg-error'></Typography>
                    <TextField            
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="swift"
                      label="SWIFT"
                      name="swift"
                      autoFocus
                      onChange={(e) => setSwift(e.target.value)}
                      value={swift}
                      data-test='company-swift'
                    />
                    <Typography component="p" data-test='company-swift-error'></Typography>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className="submit"              
                      disabled= {isLoading  ? true : false }
                      >
                        {isLoading ? <Loading /> : 'submit'}
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