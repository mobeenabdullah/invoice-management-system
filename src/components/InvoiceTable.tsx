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
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getInvoices } from "../features/invoices/invoiceThunks";
import { useNavigate, useSearchParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from "react-router-dom";
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Box from "@mui/material/Box";

const Wrapper = styled.div`
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

const SortStyling = styled.div`    
  .sort_icon {
    opacity: 0.6;
    transition: all .2s;    
  }
  &:hover {   
    .sort_icon { 
      opacity: 1;
    }
  }
  
`;

const InvoiceTable: FC = () => {
  const [cookies] = useCookies(["authToken"]);
  const [isLoading, SetIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState<any>(1);
  const [sortBy, setSortBy] = useState<any>('');
  const [sortOrder, setSortOrder] = useState<any>('asc');
  const [clientId, SetClientId] = useState<any>('');
  const [offset, setOffset] = useState<any>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [invoices, setInvoices] = useState([]);
  const [limit, setLimit] = useState<any>(10);
  const [errorMessage, setErrorMessage] = useState("No result found...");
  const [totalInvoices, setTotalInvoices] = useState(0);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
  }

  const handlePagination = (event: React.ChangeEvent<unknown>, currentPage: number) => {
    event.preventDefault();
    setPage(currentPage);
    setOffset((currentPage * 10) - 10);
  }

  const companySort = () => {
    setSortBy('companyName');
    if(!sortOrder || sortOrder === 'desc') {
      setSortOrder('asc')
    } else {
      setSortOrder('desc');
    }
  }
  
  const priceSort = () => {
    setSortBy('price');
    if(!sortOrder || sortOrder === 'desc') {
      setSortOrder('asc')
    } else {
      setSortOrder('desc');
    }
  }
  const dateSort = () => {
    setSortBy('date');
    if(!sortOrder || sortOrder === 'desc') {
      setSortOrder('asc')
    } else {
      setSortOrder('desc');
    }
  }
  const dueDateSort = () => {
    setSortBy('dueDate');
    if(!sortOrder || sortOrder === 'desc') {
      setSortOrder('asc')
    } else {
      setSortOrder('desc');
    }
  }


  const fetchInvoices = async () => {
    const filters = {
      page: page,
      sortBy: sortBy,
      sort: sortOrder,
      clientId: clientId,
      offset: offset,
      limit: limit,
      projectCode: searchParams.get('projectCode') ? searchParams.get('projectCode') : null,
    }

    let urlParams : any = {};
    if(limit != 10) {
      urlParams.limit = limit;
    }
    if(clientId) {
      urlParams.clientId = clientId;
    }
    if(sortBy) {
      urlParams.sortBy = sortBy;
      urlParams.sortOrder = sortOrder;
    }
    if(page > 1) {
      urlParams.page = page
    }
    setSearchParams(urlParams);

    SetIsLoading(true);
    try {
      const invoicesList = await getInvoices(cookies.authToken, filters);
      setTotalInvoices(invoicesList.data.total)
      setInvoices(invoicesList.data.invoices);
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
      setSortBy(searchParams.get('sortBy'));
      
      setSortOrder(searchParams.get('sortOrder'));
      SetClientId(searchParams.get('clientid'));
      
      if(searchParams.get('limit')) {
        setLimit(searchParams.get('limit'));
      }

      if(searchParams.get('page')) {
        setPage(searchParams.get('page'));
        let currentPage : any = searchParams.get('page');
        setOffset((currentPage * limit) - limit);
      }
    }, [])

  useEffect(() => {
    fetchInvoices();
  }, [page, sortBy, clientId , sortOrder]);

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
          sx={{flexWrap: {xs: 'nowrap', sm: 'nowrap', md: 'nowrap'}}}   
        >
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h6">Latest Invoice</Typography>
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
          </Grid>
        </Grid>

        {isError && (
          <Alert severity="error">
            <Typography variant="body1" component="p"  date-test="invoices-fetch-error">{errorMessage}</Typography>
          </Alert>
        )}
        {isLoading && (
          <Card
            sx={{              
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <LoadingWrapper data-test="loading-overlay">
              <CircularProgress color="primary" size="60px" />
            </LoadingWrapper>
            <p>Loading invoices...</p>
          </Card>
        )}
        {!isLoading && (
          <Card>
            <CardContent>
              <TableContainer>
                <Table
                  sx={{ minWidth: 650 }}
                  aria-label="simple table"
                  data-test="clients-table"
                >
                  <TableHead>
                  <TableRow>
                      <TableCell align="left">
                        <SortStyling>
                          <Box display="flex" alignItems="center" className="table_heading" justifyContent="space-between" sx={{ cursor: 'pointer'}}>
                            <Typography component="span" sx={{ fontWeight: '700'}}>Invoice</Typography>                            
                          </Box>
                        </SortStyling>
                      </TableCell>
                      <TableCell align="left">
                        <SortStyling>
                          <Box display="flex" alignItems="center" className="table_heading" justifyContent="space-between" sx={{ cursor: 'pointer'}}>
                            <Typography component="span" sx={{ fontWeight: '700'}}>Client</Typography>                            
                          </Box>
                        </SortStyling>
                      </TableCell>
                      <TableCell align="left" data-test='company-name-header' onClick={companySort}>
                        <SortStyling>
                          <Box display="flex" alignItems="center" className="table_heading" justifyContent="space-between" sx={{ cursor: 'pointer'}}>
                            <Typography component="span" sx={{ fontWeight: '700'}}>Company</Typography>
                            <ImportExportIcon className="sort_icon" />
                          </Box>
                        </SortStyling>                         
                      </TableCell>
                      <TableCell align="left" data-test='total-header' onClick={priceSort}>
                        <SortStyling>
                          <Box display="flex" alignItems="center" className="table_heading" justifyContent="space-between" sx={{ cursor: 'pointer'}}>
                            <Typography component="span" sx={{ fontWeight: '700'}}>Value</Typography>
                            <ImportExportIcon className="sort_icon" />
                          </Box>
                        </SortStyling>                         
                      </TableCell>
                      <TableCell align="left" data-test='creation-date-header' onClick={dateSort}>
                        <SortStyling>
                          <Box display="flex" alignItems="center" className="table_heading" justifyContent="space-between" sx={{ cursor: 'pointer'}}>
                            <Typography component="span" sx={{ fontWeight: '700'}}>Date</Typography>
                            <ImportExportIcon className="sort_icon" />
                          </Box>
                        </SortStyling>                         
                      </TableCell>
                      <TableCell align="left" data-test='due-date-header' onClick={dueDateSort}>
                        <SortStyling>
                          <Box display="flex" alignItems="center" className="table_heading" justifyContent="space-between" sx={{ cursor: 'pointer'}}>
                            <Typography component="span" sx={{ fontWeight: '700'}}>Due Date</Typography>
                            <ImportExportIcon className="sort_icon" />
                          </Box>
                        </SortStyling>                        
                      </TableCell>
                      <TableCell align="left"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoices.length === 0 && (
                      <TableRow>
                        <TableCell component="th" scope="row"   sx={{ border: "none" }}>                          
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
                            data-test='invoice-actions'
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
                            <MenuItem onClick={() => navigate(`/invoice/${invoiceItem.invoice.id}/view`, {replace: true})} >
                              <ListItemIcon>
                                <BorderColorOutlinedIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText>Print invoice</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => navigate(`/invoice/${invoiceItem.invoice.id}/edit`, {replace: true})} >
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

        {totalInvoices/limit > 1 && (
          <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" mt={6}>
            <Pagination
              count={Math.ceil(totalInvoices/limit)}
              color="primary"
              shape="rounded"
              onChange={handlePagination}
              renderItem={(item) => (
                <PaginationItem
                  data-test={`page-${item.page}`}
                  components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
            />
          </Stack>
        )}
       
      </Wrapper>
    </>
  );
};

export default InvoiceTable;
