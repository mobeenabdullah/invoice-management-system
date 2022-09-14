import {
    Button,     
    TextField,            
    Grid, 
    Typography,
    Stack } from "@mui/material";

import { FC } from "react";  
import styled from "styled-components";
import Header from './Header'; 
import { updateUser } from "../features/user/userThunks";
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import Loading from "./Loading";
import { Navigate } from "react-router-dom";
import { userDetail } from "../features/user/userThunks";
import Alert from '@mui/material/Alert';

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
        background-image: url('company.jpg');
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

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    useEffect( () => {
      const userDetailsFetch : any  = async (token: string) => {
        if(token) {

          const response =  await userDetail(token);
          if(response.status === 200) {
            if(response.data.companyDetails !== null) {
              const companyDetails = response.data.companyDetails;
              setName(companyDetails.name);
              setAddress(companyDetails.address);
              setIban(companyDetails.iban);
              setVat(companyDetails.vatNumber);
              setRegistrationNumber(companyDetails.regNumber);
              setSwift(companyDetails.swift);
            }
          }
        }
      }
        userDetailsFetch(cookies.token);  

      const timer = setTimeout(() => {
        setErrorMessage('');
        setSuccessMessage('');
        clearTimeout(timer)
      }, 3000);

    }, [errorMessage, successMessage, cookies.token])

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
            setSuccessMessage('Successfully company details updated!')
          } else if(userUpdated && userUpdated.response && userUpdated.response.status === 200 && userUpdated.type === 'added'){
            setIsLoading(false);
            setCompanyAdded(true);
          }

          
  
        } catch (error: any) {

          console.log(error)

            if(error.code === "ERR_NETWORK") {
              setErrorMessage(error.message);
            }
            if(error.status === 500) {
              setErrorMessage('No internet connectivity');
            } 
            setIsLoading(false);
            setErrorMessage(error.response.data);
        }     
  
    }

    if(companyAdded) {
      return <Navigate to='/' />
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

                    {errorMessage && (
                      <Stack sx={{ width: '100%' }} my={2} >
                        <Alert severity="error">
                          {errorMessage}
                        </Alert>
                      </Stack>
                    )}
                    {successMessage && (
                      <Stack sx={{ width: '100%' }} my={2} >
                        <Alert severity="success">
                          {successMessage}
                        </Alert>
                      </Stack>
                    )}

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
              </Stack>
            </Grid>             
          </Grid>        
        </Wrapper>
        </>
         
      )
    }
    
    export default CompanyDetails