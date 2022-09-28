import { FC } from "react";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import { useCompanyDetailGuard } from "../hooks/customHooks";
import { Box } from "@mui/system";
import styled from "styled-components";
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
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
import ReactToPrint from "react-to-print";
import { useRef } from "react";


function createData(
    name: string,
    calories: number,    
  ) {
    return { name, calories };
  }
  
  const rows = [
    createData('Frozen yoghurt', 15453),
    createData('Ice cream sandwich', 2334537),
    createData('Eclair', 234534562),
    createData('Cupcake', 303455),
    createData('Gingerbread', 353456),
  ];



const InvoiceWrapper = styled.section`
  padding: 30px 0;
  .back_to_home {
      text-decoration: none;
  } 
`;

const ViewInvoice: FC = () => {
  useCompanyDetailGuard();  
    const printDocument = useRef<HTMLInputElement | null>(null);

  const PrintInvoice = () =>{                 
    if(printDocument){
        let printContents =  printDocument!.current!.innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }
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
                <Grid item xs={12} sm={12} md={12}>
                    <Box sx={{flexGrow: '1',}} display="flex" alignItems="start" justifyContent="space-between" pt={4} pb={4}>                        
                        <Box display="flex" alignItems="stretch" sx={{ gap: '20px'}} className="invoce_buttons">
                            <Link to="/" className="back_to_home">
                                <Button variant="outlined" startIcon={<ArrowBackRoundedIcon />}>
                                Back to Homepage
                                </Button>
                            </Link>
                            <Button variant="outlined" startIcon={<LocalPrintshopOutlinedIcon />} onClick={PrintInvoice}>
                                Print Invoice
                            </Button>                            
                        </Box>
                        <Box sx={{ maxWidth: "250px", width: "100%" }}>
                            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ gap: "20px"}} data-test="invoice-date">
                                <Typography variant="subtitle2" sx={{ fontWeight: "700", width: '70%' }}>Invoice Date:</Typography>
                                <Typography variant="subtitle2" sx={{ width: '30%'}}>02/06/2022</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ gap: "20px"}} data-test="invoice-due-date">
                                <Typography variant="subtitle2"  sx={{ fontWeight: "700", width: '70%' }}>Invoice Due Date:</Typography>
                                <Typography variant="subtitle2" sx={{ width: '30%'}}>02/06/2022</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ gap: "20px"}} data-test="invoice-number">
                                <Typography variant="subtitle2"  sx={{ fontWeight: "700", width: '70%' }}>Invoice Number:</Typography>
                                <Typography variant="subtitle2" sx={{ width: '30%'}}>12534</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ gap: "20px"}} data-test="invoice-project-code">
                                <Typography variant="subtitle2"  sx={{ fontWeight: "700", width: '70%' }}>Invoice Project Code:</Typography>
                                <Typography variant="subtitle2" sx={{ width: '30%'}}>SGF1254</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ gap: "20px"}} data-test="invoice-project-code">
                                <Typography variant="subtitle2"  sx={{ fontWeight: "700", width: '70%' }}>Invoice Project Code:</Typography>
                                <Typography variant="subtitle2" sx={{ width: '30%'}}>12546</Typography>
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
                                {rows.map((row) => (
                                    <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                                    >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right" padding="checkbox" sx={{padding: "1rem"}}>{row.calories}</TableCell>                                    
                                    </TableRow>
                                ))}
                                </TableBody>
                                <TableFooter sx={{ borderTop: '1px solid', borderColor: 'grey.300'}}>
                                    <TableCell variant="head" sx={{fontWeight:"700", textAlign: "right", padding: "1rem"}}>
                                        <Typography variant="h6">Total Amount</Typography>
                                    </TableCell>
                                    <TableCell  variant="head" padding="checkbox" align="left" sx={{fontWeight:"700", textAlign:"right", padding: "1rem"}}>
                                        <Typography variant="h6">95723432</Typography>
                                    </TableCell>                                    
                                </TableFooter>
                            </Table>
                            </TableContainer>
                        </Box>                      
                    </Box>
                </Grid>
            </Grid>            
        </Container>
      </InvoiceWrapper>
    </>
  );
};

export default ViewInvoice;
