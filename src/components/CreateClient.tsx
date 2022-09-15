import {
    Button,     
    TextField,            
    Grid, 
    Typography,
    Stack } from "@mui/material";

import { FC } from "react";  
import styled from "styled-components";
import Header from './Header'; 
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import Loading from "./Loading";
import { Navigate } from "react-router-dom";
import { createClient } from "../features/clients/clientThunks";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";

  const Wrapper = styled.section`
      height: calc(100vh - 64px);      
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 2%;
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
      .login_image {
        height: 85vh;
        border-radius: 16px;
        overflow: hidden;
        background-image: url('clients.jpg');
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

  const CreateClient: FC = ()=> {
    const [cookies] = useCookies(['token']);
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [iban, setIban] = useState('');
    const [vat, setVat] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [swift, setSwift] = useState('');
    const [email, setEmail] = useState('');

    const [invalidName, setInvalidName] = useState(false);
    const [invalidCompanyName, setInvalidCommpanyName] = useState(false);
    const [invalidAddress, setInvalidAddress] = useState(false);
    const [invalidVat, setInvalidVat] = useState(false);
    const [invalidRegistrationNumber, setInvalidRegistrationNumber] = useState(false);
    const [inValidEmail, setInValidEmail] = useState(false);
    const [inValidEmailMessage, setInValidEmailMessage] = useState('');
    const [invalidIban, setInvalidIban] = useState(false);
    const [invalidSwift, setInvalidSwift] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const userId = useAppSelector((state:RootState) => state.user.user_id); 
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);



    const handleSubmit = async (e: any) => {
      e.preventDefault();
      const emailValidRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if(name === '' || name.length > 3) {
        setInvalidName(true);
        return;
       } else {
          setInvalidName(false)
       };

       if(!email.match(emailValidRegex)) {
        setInValidEmail(true);
        setInValidEmailMessage('Email format is invalid!');
        return;
      } else {
        setInValidEmail(false);
        setInValidEmailMessage('');
      }

       if(companyName === '') {
        setInvalidCommpanyName(true);
        return;
       } else {
        setInvalidCommpanyName(false)
       };

       if(address === '') {
        setInvalidAddress(true)
        return;
       } else {
        setInvalidAddress(false)
       };

       if(iban === '') {
        setInvalidIban(true)
        return;
       } else {
        setInvalidIban(false)
       };

       if(registrationNumber === '') {
        setInvalidRegistrationNumber(true);
        return;
       } else {
        setInvalidRegistrationNumber(false);
       };

       if(swift === '') {
          setInvalidSwift(true)
          return;
       } else {
          setInvalidSwift(false)
       };

       if(vat === '') {
        setInvalidVat(true)
        return;
       } else {
        setInvalidVat(false)
       };


      const clientData = {
        user_id: userId,
        email: email,
        name: name,
        companyDetails: {
            name: companyName,
            vatNumber: vat,
            regNumber: registrationNumber,
            address: address
        }
      }
  
        try{
          setIsLoading(true);
          const response = await createClient(clientData, cookies.token);
          if(response && response.status === 200) { 
            setIsLoading(false);

          }

        } catch (error: any) {
            setIsLoading(false);
            setIsError(true);
            if(error.code === "ERR_NETWORK") {
              setErrorMessage(error.message);
            }
            if(error.status === 500) {
              setErrorMessage('No internet connectivity');
            } else {
              setErrorMessage(error.response.data);
            }
        }     
  
    }

      return (
        <>
        <Header />
        <Wrapper>   
          <Grid container rowSpacing={1} alignItems="center" columnSpacing={{ xs: 1, sm: 2, md: 3, p: 2 }}>
            <Grid item xs={6}>
              <Stack className="login_image"></Stack>
            </Grid>
            <Grid item xs={6} className="login_form">
              <Stack className="paper">
                <Stack spacing={2}>                               
                    <Stack spacing={1} sx={{textAlign: "center"}}>
                        <Typography component="h1" variant="h4">
                          Create Client
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
                    id="name"
                    label="Name"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    data-test='client-name'
                  />
                  <Typography component="p" data-test='client-name-error'></Typography>
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
                    data-test='client-email'
                  />
                  <Typography component="p" data-test='client-email-error'></Typography>
                  <TextField       
                    error= {invalidCompanyName  ? true : false }   
                    helperText={invalidCompanyName  ? 'Company name is required!' : '' }     
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="company_name"
                    label="Company Name"
                    name="company_name"
                    onChange={(e) => setCompanyName(e.target.value)}
                    value={companyName}
                    data-test='client-company-name'
                  />
                  <Typography component="p" data-test='client-company-name-error'></Typography>
                  
                  <TextField            
                    error= {invalidAddress  ? true : false }   
                    helperText={invalidAddress  ? 'Company address is required!' : '' } 
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="company_address"
                    label="Company Address"
                    name="company_address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    data-test='client-company-address'
                  />
                  <Typography component="p" data-test='client-company-address-error'></Typography>
                  <TextField            
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="company_iban"
                    label="IBAN"
                    name="company_iban"
                    onChange={(e) => setIban(e.target.value)}
                    value={iban}
                    data-test='client-company-iban'
                  />
                  <Typography component="p" data-test='client-company-iban-error'></Typography>
                  
                  <TextField            
                    error= {invalidRegistrationNumber  ? true : false }   
                    helperText={invalidRegistrationNumber  ? 'Registration number is required!' : '' }
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="registry_number"
                    label="Registry Number"
                    name="registry_number"
                    type='number'
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    value={registrationNumber}
                    data-test='client-company-reg'
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Typography component="p" data-test='client-company-reg-error'></Typography>
                  <TextField            
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="swift"
                    label="SWIFT"
                    name="swift"
                    onChange={(e) => setSwift(e.target.value)}
                    value={swift}
                    data-test='client-company-swift'
                  />
                  <Typography component="p" data-test='client-company-swift-error'></Typography>
                  <TextField         
                    error= {invalidVat  ? true : false }   
                    helperText={invalidVat  ? 'Vat number is required!' : '' }   
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="vat_number"
                    label="VAT Number"
                    name="vat_number"
                    type='number'
                    onChange={(e) => setVat(e.target.value)}
                    value={vat}
                    data-test='client-company-vat'
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Typography component="p" data-test='client-company-vat-error'></Typography>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="submit"      
                    data-test='submit-client'        
                    disabled= {isLoading  ? true : false }
                    >
                      {isLoading ? <Loading /> : 'submit'}
                  </Button>                  
                </form>
              </Stack>
            </Grid>             
          </Grid>        
        </Wrapper>
        </>
         
      )
    }
    
    export default CreateClient