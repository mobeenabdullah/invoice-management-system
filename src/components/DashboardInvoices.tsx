import * as React from "react";
import { FC } from "react";
import styled from "styled-components";
import { Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { Grid } from "@mui/material";
import {useEffect, useState} from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { getInvoices } from "../features/invoices/invoiceThunks";
import { Link } from "react-router-dom";

const Wrapper = styled.section`
  padding: 30px 0;
  .TableHeader {
    display: flex;
    justify-content: space-between;
  }
  .TableButtons {
    display: flex;
    gap: 10px;
  }
`;

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

const ButtonStyle = styled.div`
  a {
    text-decoration: none;
    pointer-event: none;    
  }
`;

function createData(
  name: string,
  company_name: number,
  total_blled: number,
  invoices: number
) {
  return { name, company_name, total_blled, invoices };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24),
  createData("Ice cream sandwich", 237, 9.0, 37),
  createData("Eclair", 262, 16.0, 24),
  createData("Cupcake", 305, 3.7, 67),
];

const options = ["None", "Atria", "Callisto"];

const DashboardInvoices: FC = () => {

  const navigate = useNavigate();

  const [invoices, setInvoices] = useState([]);
  const [cookies] = useCookies(["authToken"]);
  const [isLoading, SetIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("No result found...");

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
  }

  const fetchInvoices = async () => {
    try {
      const invoicesList = await getInvoices(cookies.authToken, {});
      setInvoices(invoicesList.data.invoices.slice(0, 11));
      SetIsLoading(false);
    } catch (error: any) {
      SetIsLoading(false);
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

  useEffect(() => {
    fetchInvoices();
  }, []);


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Wrapper>
        <Grid
          container
          rowSpacing={1}
          alignItems="center"
          m={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3, p: 2 }}
        >
          <Grid item xs={12} sm={12} md={6}  sx={{ textAlign: {xs: 'center', sm: 'center', md: 'left', lg: 'left'}}}>
            <Typography variant="h6">Latest Invoices</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            display="flex"
            justifyContent="end"
            gap="10px"
            sx={{ justifyContent: {xs: 'center', sm: 'center', md: 'right', lg: 'right'}}}
          >           
            <ButtonStyle>
              <Link
                  to="/create-invoice"
                  data-test="add-client"
                >
                <Button
                  variant="contained"              
                  data-test="add-client"
                >              
                  Create Invoice
                </Button>
              </Link>
            </ButtonStyle>
            <ButtonStyle>
              <Link
                  to="/invoices"
                  data-test="add-client"
                >
              <Button
                variant="contained"              
                data-test="view-all-clients"
              >
                ALl Invoices
              </Button>
              </Link>
            </ButtonStyle>
          </Grid>
        </Grid>
        {isError && (
          <Alert severity="error">
            <Typography variant="body1" component="p"  date-test="clients-fetch-error">{errorMessage}</Typography>
          </Alert>
        )}
        {isLoading && (
          <Card
            sx={{
              minWidth: 275,  
              minHeight: "150px",            
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <LoadingWrapper data-test="loading-overlay">
              <CircularProgress color="primary" size="60px" />
            </LoadingWrapper>
            <p>Loading Invoices...</p>
          </Card>
        )}

        {!isLoading && (
          <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left"><Typography component="span" sx={{ fontWeight: '700'}}>Invoice number</Typography></TableCell>
                    <TableCell align="left"><Typography component="span" sx={{ fontWeight: '700'}}>Client</Typography></TableCell>
                    <TableCell align="left"><Typography component="span" sx={{ fontWeight: '700'}}>Date</Typography></TableCell>
                    <TableCell align="left"><Typography component="span" sx={{ fontWeight: '700'}}>Project</Typography></TableCell>
                    <TableCell align="left"><Typography component="span" sx={{ fontWeight: '700'}}>Amount</Typography></TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.length === 0 && (
                    <TableRow>
                      <TableCell component="th" scope="row"  sx={{ border: "none" }}>                          
                        <Typography variant="body1" component="p" data-test="empty-placeholder">No result found...</Typography>                            
                      </TableCell>                        
                    </TableRow>
                      
                    )}
                  {invoices.length > 0 && invoices.map((invoiceItem: any) => (
                    <TableRow
                      key={invoiceItem.invoice.id}
                      data-test={`invoice-row-${invoiceItem.invoice.id}`}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      
                      <TableCell component="th" scope="row" data-test='invoice-number' onClick={() => navigate(`/invoice/${invoiceItem.invoice.id}/view`, {replace: true})}>{invoiceItem.invoice.invoice_number}</TableCell>
                      <TableCell align="left" data-test='invoice-company' onClick={() => navigate(`/invoice/${invoiceItem.invoice.id}/view`, {replace: true})}>{invoiceItem.client.name}</TableCell>
                      <TableCell align="left" data-test='invoice-date' onClick={() => navigate(`/invoice/${invoiceItem.invoice.id}/view`, {replace: true})}>{formatDate(invoiceItem.invoice.date)}</TableCell>
                      <TableCell align="left" data-test='invoice-project' onClick={() => navigate(`/invoice/${invoiceItem.invoice.id}/view`, {replace: true})}>{invoiceItem.invoice.projectCode}</TableCell>
                      <TableCell align="left" data-test='invoice-price' onClick={() => navigate(`/invoice/${invoiceItem.invoice.id}/view`, {replace: true})}>{invoiceItem.invoice.value}</TableCell>
                      <TableCell align="left">
                        <IconButton
                          id="basic-button"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClick}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          elevation={1}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          {" "}
                          <MenuItem onClick={() => navigate(`/invoice/${invoiceItem.invoice.id}/view`, {replace: true})} data-test='invoice-actions'>
                            <ListItemIcon>
                              <BorderColorOutlinedIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Print invoice</ListItemText>
                          </MenuItem>
                          <MenuItem onClick={() => navigate(`/invoice/${invoiceItem.invoice.id}/edit`, {replace: true})} data-test='invoice-actions'>
                            <ListItemIcon>
                              <DeleteOutlineOutlinedIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Edit invoice</ListItemText>
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
        )}
        
      </Wrapper>
    </>
  );
};

export default DashboardInvoices;
