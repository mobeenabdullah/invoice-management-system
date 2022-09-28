import { Button, TextField, Grid, Typography, Stack } from "@mui/material";
import { FC } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Autocomplete from '@mui/material/Autocomplete';
import { getClientsName } from "../features/clients/clientThunks";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { createInvoice } from "../features/invoices/invoiceThunks";

const Wrapper = styled.section`
  height: calc(100vh - 8%);
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 2%;
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
    background-image: url("invoice.jpg");
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
    .login_image {
      height: 300px;
      width: 100%;
    }
    .login_form .paper {
      max-width: 100%;
    }
  }
`;

const CreateInvoice: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cookies] = useCookies(["authToken"]);
  const [clients, setClient] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [company, setCompany] = useState<any>();
  const [date, setDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [projectCode, setProjectCode] = useState('');
  const [dueDateError, setDueDateError] = useState('');
  const [dateError, setDateError] = useState('');
  const [invoiceNumberError, setInvoiceNumberError] = useState('');
  const [projectCodeError, setProjectCodeError] = useState('');
  const [companyError, setCompanyError] = useState('');

  const userId = useAppSelector((state: RootState) => state.user.user_id);


  function dateFormat(format: string) {
    //parse the input date
    const date = new Date();

    //extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();    

    //replace the month
    format = format.replace("MM", month.toString().padStart(2,"0"));        

    //replace the year
    if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2,2));
    }

    //replace the day
    format = format.replace("dd", day.toString().padStart(2,"0"));

    return format;
  }


  const handleClientChange = (event: React.SyntheticEvent, value: any) => {
    event.preventDefault();
    setCompany(value);
  }

  const fetchClientsName = async () => {
    try {
      const clientsList = await getClientsName(cookies.authToken);

      if(clientsList.data.clients.length > 0) {
          let clientsArray = clientsList.data.clients.map((item : any) => {
            return {
              id: item.id,
              label: item.companyName
            };
          });
          setClient(clientsArray);
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setIsError(true);
      if (error.code === "ERR_NETWORK") {
        setErrorMessage(error.message);
      }
      if (error.status === 500) {
        setErrorMessage("No internet connectivity");
      } else {
        setErrorMessage(error.response.data);
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log('here')

    if(!date) {
      setDateError('Invoice date is required!');
      return;
    } else {
      setDateError('');
    }

    if(!dueDate) {
      console.log(dueDate);
      setDueDateError('Invoice due date is required!');
      return;
    } else {
      setDueDateError('');
    }

    if(new Date(dueDate).getTime() < new Date(date).getTime()) {
      setDueDateError('Invoice due date should be greater than invoice date!');
      return;
    } else {
      setDueDateError('');
    }

    if(invoiceNumber.length < 3) {
      setInvoiceNumberError('Invoice number must be 3 character long!');
      return;
    } else {
      setInvoiceNumberError('');
    }

    if(projectCode && projectCode.length < 3) {
      setProjectCodeError('Project code must be 3 character long!');
      return;
    } else {
      setProjectCodeError('');
    }

    if(company.id) {
      setCompanyError('');
    } else {
      setCompanyError('Please Select invoice client!');
      return;
    }

    const invoiceData = {
      "user_id": userId,
      "invoice_number": invoiceNumber,
      "client_id": company.id,
      "date": new Date(date).getTime(),
      "dueDate": new Date(dueDate).getTime(),
      "value": 1234
    }


    console.log(invoiceData, 'ncasdjkcbjk');

    try {
      let response: any;
      setIsLoading(true);
      
        response = await createInvoice(invoiceData, cookies.authToken);
      
      if (response && response.status === 200) {
        setIsLoading(false);
        
        setErrorMessage("");
        setIsError(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      // setSuccessMessage("");
      setIsError(true);
      if (error.code === "ERR_NETWORK") {
        console.log(error.message);
        setErrorMessage(error.message);
      } else if (error.status === 500) {
        setErrorMessage("No internet connectivity");
      } else {
        setErrorMessage(error.response.data);
      }
    }



  }

  useEffect(() => {
    fetchClientsName();
    setDate(dateFormat('yyyy-MM-dd'));
  }, []);

  return (
    <>
      <Header />
      <Wrapper>
        <Grid
          container
          rowSpacing={1}
          alignItems="stretch"
          columnSpacing={{ xs: 1, sm: 2, md: 3, p: 2 }}
          sx={{ flexDirection: {xs: 'column', sm: 'column', md: 'row', lg: 'row'}, gap: {xs: "30px", sm: "30px", md: 'inherit', lg: 'inherit'}}}                
        >
          <Grid item xs={6} sx={{maxWidth: {xs: "100vw", sm: "100vw"}, width: {xs: '100%', sm: "100%"}}}>
            <Stack className="login_image"></Stack>
          </Grid>
          <Grid item xs={6} className="login_form"  sx={{maxWidth: {xs: "100vw", sm: "100vw"}, width: {xs: '100%', sm: "100%"}}}  display="flex" alignItems="center">
            <Stack className="paper" sx={{maxWidth: {xs: "100%", sm: "100%"}, paddingBottom: {xs: '2rem', sm: '2rem'}}}>
              <Stack spacing={2}>
                <Stack spacing={1} sx={{ textAlign: "center" }}>
                  <Typography component="h1" variant="h4">
                    Create Invoice
                  </Typography>
                </Stack>
              </Stack>

              <form className="form" noValidate onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="date"
                  label="Invoice Date"
                  data-test="invoice-date"
                  name="date"
                  type="date"
                  value={date}
                  error={dateError ? true : false}
                  helperText={dateError ? dateError : ""}
                  onChange={(e: any) => setDate(e.target.value)}
                />
                <Typography component="p" data-test="invoice-date-error"></Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="due-date"
                  label="Invoice Due Date"
                  data-test="invoice-due-date"
                  name="due-date"
                  type="date"
                  value={dueDate}
                  error={dueDateError ? true : false}
                  helperText={dueDateError ? dueDateError : ""}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <Typography component="p" data-test="invoice-due-date-error"></Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="number"
                  label="Invoice Number"
                  name="number"
                  data-test="invoice-number"
                  value={invoiceNumber}
                  error={invoiceNumberError ? true : false}
                  helperText={invoiceNumberError ? invoiceNumberError : ""}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
                <Typography component="p" data-test="invoice-number-error"></Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="project-code"
                  label="Invoice Project Code"
                  name="project-code"
                  data-test="invoice-project-code"
                  value={projectCode}
                  error={projectCodeError ? true : false}
                  helperText={projectCodeError ? projectCodeError : ""}
                  onChange={(e) => setProjectCode(e.target.value)}
                />
                <Typography component="p" data-test="invoice-project-code-error"></Typography>
                
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={clients}
                  data-test='invoice-company-id'
                  onChange={handleClientChange}
                  value={company}
                  renderInput={(params) => <TextField {...params} label="Invoice Client" />}
                />
                <Typography component="p" data-test="invoice-project-code-error">{companyError}</Typography>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
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

export default CreateInvoice;
