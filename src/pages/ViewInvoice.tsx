import { FC } from "react";
import { Container } from "@mui/system";
import { Grid, Stack } from "@mui/material";
import { useCompanyDetailGuard } from "../hooks/customHooks";
import { Box } from "@mui/system";
import styled from "styled-components";
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from "@mui/material/TableFooter";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { getSingleInvoice } from "../features/invoices/invoiceThunks";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useSearchParams } from "react-router-dom";

const InvoiceWrapper = styled.section`
  padding: 30px 0;
  .back_to_home {
      text-decoration: none;
  } 
`;

const ViewInvoice: FC = () => {
  useCompanyDetailGuard();  
  const [searchParams, setSearchParams] = useSearchParams();
    const printDocument = useRef<HTMLInputElement | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [cookies] = useCookies(["authToken"]);
    const { invoiceId } = useParams();
    const [invoice , setInvoice] = useState<any>();

    const getSingleInvoiceData = async (id:string, token: string) => {
        try {
            const invoiceData = await getSingleInvoice(token, id);
            setInvoice(invoiceData.data.invoice);
            setIsLoading(false);
            setIsError(false);
            setErrorMessage('');
        } catch(error: any) {
            setIsLoading(false);
            setIsError(true);
            if (error.code === "ERR_NETWORK") {
              setErrorMessage(error.message);
            } else if (error.status === 500) {
              setErrorMessage("No internet connectivity");
            } else {
              setErrorMessage(error.response.data);
            }
        }
    }

    const dateFormat = (format: string, timeStamp: any) => {

        let date;
        //parse the input date
        if(timeStamp) {
          date = new Date(timeStamp);
        } else {
          date = new Date();
        }
          
    
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
    
    useEffect(() => {
      if(invoiceId && cookies.authToken) {
          getSingleInvoiceData(invoiceId, cookies.authToken);
      }
    }, [invoice]);

    useEffect(() => {
      if(searchParams.get('print')) {
        const timer = setTimeout(() => {
          PrintInvoice();
          clearTimeout(timer);
        }, 1000);
      }
    }, []);

  const PrintInvoice = () =>{            
    if(printDocument){
        let printContents =  printDocument!.current!.innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.history.go(0);
        setSearchParams({});
    }
  }

  if(isLoading) {
      return <Card
      sx={{
        minWidth: 350,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <LoadingWrapper data-test="loading-overlay">
        <CircularProgress color="primary" size="60px" />
      </LoadingWrapper>
      <p>Loading invoice...</p>
    </Card>
  }
  
  return (
    <>
      <InvoiceWrapper ref={printDocument} id="printablediv">
        <Container maxWidth="xl">
            <Grid
            container
            rowSpacing={1}
            alignItems="center"
            columnSpacing={{ xs: 1, sm: 2, md: 3, p: 2 }}
            >
              <Stack spacing={2} sx={{width: '100%',}}>
                {isError && (
                  <Alert severity="error" data-test='not-found-message'>{errorMessage}</Alert>
                )}
              </Stack>
              {!isError &&  (
                <Grid item xs={12} sm={12} md={12}>
                    <Box sx={{flexGrow: '1',}} display="flex" alignItems="start" justifyContent="space-between" pt={4} pb={4}>                        
                        <Box display="flex" alignItems="stretch" sx={{ gap: '20px'}} className="invoce_buttons"> 
                        </Box>
                        <Box sx={{ maxWidth: "380px", width: "100%" }}>
                            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ gap: "20px"}} data-test="invoice-date">
                                <Typography variant="subtitle2" sx={{ fontWeight: "700", width: '70%' }}>Invoice Date:</Typography>
                                <Typography variant="subtitle2" sx={{ width: '70%'}} data-test='invoice-date'>{dateFormat('dd/MM/yyyy', invoice.date)}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ gap: "20px"}} data-test="invoice-due-date">
                                <Typography variant="subtitle2"  sx={{ fontWeight: "700", width: '70%' }}>Invoice Due Date:</Typography>
                                <Typography variant="subtitle2" sx={{ width: '70%'}} data-test='invoice-due-date'>{dateFormat('dd/MM/yyyy', invoice.dueDate)}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ gap: "20px"}} data-test="invoice-number">
                                <Typography variant="subtitle2"  sx={{ fontWeight: "700", width: '70%' }}>Invoice Number:</Typography>
                                <Typography variant="subtitle2" sx={{ width: '70%'}} data-test='invoice-number'>{invoice.invoice_number}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ gap: "20px"}} data-test="invoice-project-code">
                                <Typography variant="subtitle2"  sx={{ fontWeight: "700", width: '70%' }}>Invoice Project Code:</Typography>
                                <Typography variant="subtitle2" sx={{ width: '70%'}} data-test='invoice-project-code'>{invoice.projectCode}</Typography>
                            </Box>
                        </Box>                        
                    </Box>
                    <Divider />
                    <Box>
                        <Box pt={4} pb={4}>
                            <Typography variant="h3" textAlign="center">Invoice</Typography>
                        </Box>  
                        <Box>
                        <TableContainer component={Paper}  className="table_wrapper">
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell variant="head" sx={{fontWeight:"700"}}>Description</TableCell>
                                    <TableCell  variant="head" padding="checkbox" align="left" sx={{fontWeight:"700", textAlign:"right", padding: "1rem"}}>Value</TableCell>                                    
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {invoice.meta.items && invoice.meta.items.length && invoice.meta.items.map((row: any, index: number) => (
                                    <TableRow
                                    key={index}
                                    data-test={`invoice-item-${index}`}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                                    >
                                    <TableCell component="th" scope="row" data-test='invoice-item-description'>
                                        {row.description}
                                    </TableCell>
                                    <TableCell align="right" padding="checkbox" sx={{padding: "1rem"}} data-test='invoice-item-value'>{row.value}</TableCell>                                    
                                    </TableRow>
                                ))}
                                </TableBody>
                                <TableFooter sx={{ borderTop: '1px solid', borderColor: 'grey.300'}}>
                                    <TableCell variant="head" sx={{fontWeight:"700", textAlign: "right", padding: "1rem"}}>
                                        <Typography variant="h6">Total Amount</Typography>
                                    </TableCell>
                                    <TableCell  variant="head" padding="checkbox" align="left" sx={{fontWeight:"700", textAlign:"right", padding: "1rem"}}>
                                        <Typography variant="h6" data-test='invoice-total'>{invoice.value}</Typography>
                                    </TableCell>                                    
                                </TableFooter>
                            </Table>
                            </TableContainer>
                        </Box>                      
                    </Box>
                </Grid>
              )}
                
            </Grid>            
        </Container>
      </InvoiceWrapper>
    </>
  );
};

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
`;

export default ViewInvoice;
