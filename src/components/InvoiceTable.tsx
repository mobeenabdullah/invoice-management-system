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
import { useEffect, useState } from "react";
import { getInvoices } from "../features/invoices/invoiceThunks";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const InvoiceTable: FC = () => {

  const [invoices, setInvoices] = useState([]);
  const [cookies] = useCookies(["authToken"]);
  const [isLoading, SetIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("No invoice found...");
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
  }

  const fetchInvoices = async () => {
    try {
      const invoicesList = await getInvoices(cookies.authToken);
      setInvoices(invoicesList.data.invoices.slice(0, 11));
      SetIsLoading(false);
    } catch (error: any) {
      SetIsLoading(false);
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

  useEffect(() => {
    fetchInvoices();
  }, []);


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
          <Grid item xs={12} sm={12} md={6}>
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
          >
            <Button variant="contained" href="/create-invoice">
              Create Invoice
            </Button>
          </Grid>
        </Grid>
        {isError && (
          <Alert severity="error">
            <p date-test="clients-fetch-error">{errorMessage}</p>
          </Alert>
        )}
        {isLoading && (
          <Card
            sx={{
              minWidth: 275,
              minHeight: "388px",
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
                      <TableCell align="left">Invoice</TableCell>
                      <TableCell align="left">Client</TableCell>
                      <TableCell align="left">Company</TableCell>
                      <TableCell align="left">Value</TableCell>
                      <TableCell align="left">Date</TableCell>
                      <TableCell align="left">Due Date</TableCell>
                      <TableCell align="left"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoices.length === 0 && (
                        <p data-test="empty-placeholder">No invoice found...</p>
                      )}
                    {invoices.length > 0 && invoices.map((invoiceItem: any) => (
                      <TableRow
                        key={invoiceItem.invoice.id}
                        data-test={`invoice-row-${invoiceItem.invoice.id}`}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" data-test='invoice-number' onClick={() => navigate(`/invoice/${invoiceItem.invoice.id}/view`, {replace: true})}>{invoiceItem.invoice.invoice_number}</TableCell>
                        <TableCell align="left" data-test='invoice-client-name' onClick={() => navigate(`/invoice/${invoiceItem.invoice.id}/view`, {replace: true})}>{invoiceItem.client.name}</TableCell>
                        <TableCell align="left" data-test='invoice-client-company-name' onClick={() => navigate(`/invoice/${invoiceItem.invoice.id}/view`, {replace: true})}>{invoiceItem.client.companyDetails.name}</TableCell>
                        <TableCell align="left" data-test='invoice-value' onClick={() => navigate(`/invoice/${invoiceItem.invoice.id}/view`, {replace: true})}>{invoiceItem.invoice.value}</TableCell>
                        <TableCell align="left" data-test='invoice-date' onClick={() => navigate(`/invoice/${invoiceItem.invoice.id}/view`, {replace: true})}>{formatDate(invoiceItem.invoice.date)}</TableCell>
                        <TableCell align="left" data-test='invoice-due-date' onClick={() => navigate(`/invoice/${invoiceItem.invoice.id}/view`, {replace: true})}>{formatDate(invoiceItem.invoice.dueDate)}</TableCell>                      
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

export default InvoiceTable;
