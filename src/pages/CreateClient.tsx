import { FC, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import styled from "styled-components";
import { Button, TextField, Grid, Typography, Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import { createClient } from "../features/clients/clientThunks";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import {
  getSingleClient,
  updateClient,
} from "../features/clients/clientThunks";
import { useCompanyDetailGuard } from '../hooks/customHooks';

const CreateClient: FC = () => {
  useCompanyDetailGuard();
  const [cookies] = useCookies(["authToken"]);
  const { clientId } = useParams();
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [iban, setIban] = useState("");
  const [vat, setVat] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [swift, setSwift] = useState("");
  const [email, setEmail] = useState("");

  const [invalidName, setInvalidName] = useState(false);
  const [invalidCompanyName, setInvalidCommpanyName] = useState(false);
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [invalidVat, setInvalidVat] = useState(false);
  const [invalidRegistrationNumber, setInvalidRegistrationNumber] =
    useState(false);
  const [inValidEmail, setInValidEmail] = useState(false);
  const [inValidEmailMessage, setInValidEmailMessage] = useState("");
  const [invalidIban, setInvalidIban] = useState(false);
  const [invalidSwift, setInvalidSwift] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const userId = useAppSelector((state: RootState) => state.user.user_id);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getSingleClientData = async (clientId: string, token: any) => {
      const singleClient: any = await getSingleClient(clientId, token);
      if (singleClient.status === 200) {
        const client = singleClient.data.client;
        setName(client.name);
        setEmail(client.email);
        setCompanyName(client.companyDetails.name);
        setAddress(client.companyDetails.address);
        setIban(client.iban);
        setVat(client.companyDetails.vatNumber);
        setRegistrationNumber(client.companyDetails.regNumber);
        setSwift(client.swift);
      } else {
        navigate("/", {replace: true});
      }
    };

    if (clientId && cookies.authToken) {
      getSingleClientData(clientId, cookies.authToken);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsError(false);
      setErrorMessage("");
      setSuccessMessage("");
      clearTimeout(timer);
    }, 3000);
  }, [isError, successMessage]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const emailValidRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (name === "" || name.length < 3 || name.length > 16) {
      setInvalidName(true);
      return;
    } else {
      setInvalidName(false);
    }

    if (email === "") {
      setInValidEmail(true);
      setInValidEmailMessage("Email is required!");
      return;
    } else {
      setInValidEmail(false);
      setInValidEmailMessage("");
    }

    if (!email.match(emailValidRegex)) {
      setInValidEmail(true);
      setInValidEmailMessage("Email format is invalid!");
      return;
    } else {
      setInValidEmail(false);
      setInValidEmailMessage("");
    }

    if (companyName === "") {
      setInvalidCommpanyName(true);
      return;
    } else {
      setInvalidCommpanyName(false);
    }

    if (address === "") {
      setInvalidAddress(true);
      return;
    } else {
      setInvalidAddress(false);
    }

    if (iban === "") {
      setInvalidIban(true);
      return;
    } else {
      setInvalidIban(false);
    }

    if (registrationNumber === "") {
      setInvalidRegistrationNumber(true);
      return;
    } else {
      setInvalidRegistrationNumber(false);
    }

    if (swift === "") {
      setInvalidSwift(true);
      return;
    } else {
      setInvalidSwift(false);
    }

    if (vat === "") {
      setInvalidVat(true);
      return;
    } else {
      setInvalidVat(false);
    }

    let clientData = {
      id: "",
      user_id: userId,
      email: email,
      name: name,
      iban: iban,
      swift: swift,
      companyDetails: {
        name: companyName,
        vatNumber: vat,
        regNumber: registrationNumber,
        address: address,
      },
    };

    try {
      let response: any;
      setIsLoading(true);
      if (clientId) {
        clientData.id = clientId;
        response = await updateClient(clientData, cookies.authToken);
      } else {
        response = await createClient(clientData, cookies.authToken);
      }

      if (response && response.status === 200) {
        setIsLoading(false);
        if (clientId) {
          setSuccessMessage("Client updated successfully!");
        } else {
          setSuccessMessage("Client created successfully!");
          setName("");
          setEmail("");
          setCompanyName("");
          setAddress("");
          setIban("");
          setVat("");
          setRegistrationNumber("");
          setSwift("");
        }
        setErrorMessage("");
        setIsError(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      setSuccessMessage("");
      setIsError(true);
      if (error.code === "ERR_NETWORK") {
        setErrorMessage(error.message);
      } else if (error.status === 500) {
        setErrorMessage("No internet connectivity");
      } else {
        setErrorMessage(error.response.data);
      }
    }
  };

  return (
    <>
      <Header />
      <Wrapper>
        <Grid
          container
          rowSpacing={1}
          alignItems="stretch"
          columnSpacing={{ xs: 1, sm: 2, md: 3, p: 2 }}
          sx={{ flexDirection: {xs: 'column', sm: 'column', md: 'row', lg: 'row'}, gap: {xs: "30px", sm: "30px", md: '30px', lg: 'inherit'}}}            
        >
          <Grid item xs={6} sx={{maxWidth: {xs: "100vw", sm: "100vw"}, width: {xs: '100%', sm: "100%"}, display: {xs: 'none', sm: 'none', md: 'none', lg: 'block'}}}>
            <Stack className="login_image"></Stack>
          </Grid>
          <Grid item xs={6} className="login_form" sx={{maxWidth: {xs: "100vw", sm: "100vw"}, width: {xs: '100%', sm: "100%"}}} display="flex" alignItems="center">
            <Stack className="paper" sx={{maxWidth: {xs: "100%", sm: "100%"}, paddingBottom: "2rem"}}>
              <Stack spacing={2} sx={{width: '100%',}}>
                {isError && (
                  <Alert severity="error">{errorMessage}</Alert>
                )}
                {!isError && successMessage && (                
                  <Alert severity="success">{successMessage}</Alert>                
                )}
              </Stack>
              <Stack spacing={2}>
                <Stack spacing={1} sx={{ textAlign: "center" }}>
                  <Typography component="h1" variant="h4">{`${
                    clientId ? "Edit client" : "Create client"
                  }`}</Typography>
                </Stack>
              </Stack>
              <form className="form" noValidate onSubmit={handleSubmit}>
                <Typography component="p" data-test="form-success"></Typography>
                <Typography component="p" data-test="form-error"></Typography>
                <TextField
                  error={invalidName ? true : false}
                  helperText={invalidName ? "Client name must be 3-16 character long!" : ""}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  disabled={isLoading ? true : false}
                  data-test="client-name"
                />
                <Typography
                  component="p"
                  data-test="client-name-error"
                ></Typography>
                <TextField
                  error={inValidEmail ? true : false}
                  helperText={inValidEmail ? inValidEmailMessage : ""}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="email"
                  label="Email"
                  id="email"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                  data-test="client-email"
                  disabled={isLoading ? true : false}
                />
                <Typography
                  component="p"
                  data-test="client-email-error"
                ></Typography>
                <TextField
                  error={invalidCompanyName ? true : false}
                  helperText={
                    invalidCompanyName ? "Company name is required!" : ""
                  }
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="company_name"
                  label="Company Name"
                  name="company_name"
                  onChange={(e) => setCompanyName(e.target.value)}
                  value={companyName}
                  data-test="client-company-name"
                  disabled={isLoading ? true : false}
                />
                <Typography
                  component="p"
                  data-test="client-company-name-error"
                ></Typography>
                <TextField
                  error={invalidAddress ? true : false}
                  helperText={
                    invalidAddress ? "Company address is required!" : ""
                  }
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="company_address"
                  label="Company Address"
                  name="company_address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  data-test="client-company-address"
                  disabled={isLoading ? true : false}
                />
                <Typography
                  component="p"
                  data-test="client-company-address-error"
                ></Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="company_iban"
                  label="IBAN"
                  name="company_iban"
                  onChange={(e) => setIban(e.target.value)}
                  value={iban}
                  data-test="client-company-iban"
                  disabled={isLoading ? true : false}
                  error={invalidIban ? true : false}
                  helperText={invalidIban ? "IBAN is required!" : ""}
                />
                <Typography
                  component="p"
                  data-test="client-company-iban-error"
                ></Typography>
                <TextField
                  error={invalidRegistrationNumber ? true : false}
                  helperText={
                    invalidRegistrationNumber
                      ? "Registration number is required!"
                      : ""
                  }
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="registry_number"
                  label="Registry Number"
                  name="registry_number"
                  type="number"
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  value={registrationNumber}
                  data-test="client-company-reg"
                  disabled={isLoading ? true : false}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Typography
                  component="p"
                  data-test="client-company-reg-error"
                ></Typography>
                <TextField
                  error={invalidSwift ? true : false}
                  helperText={invalidSwift ? "Swift is required!" : ""}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="swift"
                  label="SWIFT"
                  name="swift"
                  onChange={(e) => setSwift(e.target.value)}
                  value={swift}
                  data-test="client-company-swift"
                  disabled={isLoading ? true : false}
                />
                <Typography
                  component="p"
                  data-test="client-company-swift-error"
                ></Typography>
                <TextField
                  error={invalidVat ? true : false}
                  helperText={invalidVat ? "Vat number is required!" : ""}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="vat_number"
                  label="VAT Number"
                  name="vat_number"
                  type="number"
                  onChange={(e) => setVat(e.target.value)}
                  value={vat}
                  data-test="client-company-vat"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={isLoading ? true : false}
                />
                <Typography
                  component="p"
                  data-test="client-company-vat-error"
                ></Typography>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  data-test="submit-client"
                  disabled={isLoading ? true : false}
                >
                  {isLoading ? <Loading /> : "submit"}
                </Button>
              </form>
            </Stack>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  height: calc(100vh - 8%);
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 2%;
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
    background-image: url("../clients.jpg");
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
  @media screen and (max-width: 992px) {
    padding: 2rem;
    align-items: start;
    .login_image {
      height: 500px;
    }  
    .login_form .paper {
      max-width: 80%;
    }  
  }
  @media screen and (max-width: 767px) {
    padding: 2rem;
    align-items: start;
    .login_image {
      height: 300px;
      width: 100%;
    }
    .login_form .paper {
      max-width: 100%;
    }
  }
`;

export default CreateClient;
