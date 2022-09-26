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
import { Divider } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { graphqlGetClients } from "../features/clients/clientThunks";


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

const ClientTable: FC = () => {
  const [cookies] = useCookies(["authToken"]);
  const [clientRows, setClientRows] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalClients, setTotalClients] = useState(0);
  const [page, setPage] = useState<any>(1);
  const [offset, setOffset] = useState<any>(0);
  const [limit, setLimit] = useState<any>(10);
  const [sortBy, setSortBy] = useState<any>('creation');
  const [sortOrder, setSortOrder] = useState<any>('asc');

  const handlePagination = (event: React.ChangeEvent<unknown>, currentPage: number) => {
    event.preventDefault();
    setPage(currentPage);
    setOffset((currentPage * limit) - limit);
  }

  const companyNameSort = () => {
    setSortBy('companyName');
    if(!sortOrder || sortOrder === 'desc') {
      setSortOrder('asc')
    } else {
      setSortOrder('desc');
    }
  }

  const clientNameSort = () => {
    setSortBy('clientName');
    if(!sortOrder || sortOrder === 'desc') {
      setSortOrder('asc')
    } else {
      setSortOrder('desc');
    }
  }

  const invoicesCountSort = () => {
    setSortBy('invoicesCount');
    if(!sortOrder || sortOrder === 'desc') {
      setSortOrder('asc')
    } else {
      setSortOrder('desc');
    }
  }

  const totalBilledSort = () => {
    setSortBy('totalBilled');
    if(!sortOrder || sortOrder === 'desc') {
      setSortOrder('asc')
    } else {
      setSortOrder('desc');
    }
  }

  const fetchClientsList = async () => {

    let urlParams : any = {};
    if(limit != 10) {
      urlParams.limit = limit;
    }
    
    if(sortBy !== 'creation') {
      urlParams.sortBy = sortBy;
      urlParams.sortOrder = sortOrder;
    }
    if(page > 1) {
      urlParams.page = page
    }

    setSearchParams(urlParams);

    SetIsLoading(true);
    try {
      const clientsList = await  graphqlGetClients(cookies.authToken, sortOrder, sortBy, limit, offset);
      setClientRows(clientsList.clients.results);
      setTotalClients(clientsList.clients.total)
      SetIsLoading(false);
      setIsError(false);
      setErrorMessage('');
    } catch (error: any) {
      console.error(error)
      SetIsLoading(false);
      setIsError(true);
      if (error.code === "ERR_NETWORK") {
        setErrorMessage(error.message);
      }
      if (JSON.parse(JSON.stringify(error)).response.status === 500) {
        setErrorMessage("No internet connectivity");
      } else {
        if(JSON.parse(JSON.stringify(error)).response.errors){
          setErrorMessage(JSON.parse(JSON.stringify(error)).response.errors[0].message);
        } else {
          setErrorMessage(JSON.parse(JSON.stringify(error)).response.error);
        }
        
      }
    }
  };

  useEffect(() => {
    
    if(searchParams.get('limit')) {
      setLimit(searchParams.get('limit'));
    }

    if(searchParams.get('sortOrder')) {
      setSortOrder(searchParams.get('sortOrder'));
    }

    if(searchParams.get('sortBy')) {
      setSortBy(searchParams.get('sortBy'));
    }

    if(searchParams.get('offset')) {
      setOffset(searchParams.get('offset'));
    }

    if(searchParams.get('page')) {
      setPage(searchParams.get('page'));
      let currentPage : any = searchParams.get('page');
      setOffset((currentPage * limit) - limit);
    }
  }, []);

  useEffect(() => {
    fetchClientsList(); 
  }, [sortBy, sortOrder, page, limit]);

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
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h6">Latest Clients</Typography>
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
            <Button variant="contained" href="/create-client">
              Create Client
            </Button>
          </Grid>
        </Grid>

        {isError && (
          <Alert severity="error">
            <Typography variant="body1" component="p" date-test="clients-fetch-error">{errorMessage}</Typography>
          </Alert>
        )}
        {isLoading && (
          <Card
            sx={{
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
            <p>Loading clients...</p>
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
                      <TableCell data-test='client-name-header' onClick={clientNameSort}>Name</TableCell>
                      <TableCell data-test='company-name-header' align="left" onClick={companyNameSort}>Company name</TableCell>
                      <TableCell align="left">Email</TableCell>
                      <TableCell align="left" data-test='total-billed-header' onClick={totalBilledSort}>Total billed</TableCell>
                      <TableCell align="left" data-test='invoices-count-header' onClick={invoicesCountSort}>Invoices</TableCell>
                      <TableCell align="left"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clientRows.length === 0 && (
                      <Typography variant="body1" component="p"  data-test="empty-placeholder">No client found...</Typography>
                    )}
                    {clientRows.length > 0 &&
                      clientRows.map((row: any) => (
                        <TableRow
                          key={row.id}
                          data-test={`client-row-${row.id}`}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            data-test="client-name"
                            onClick={() => navigate(`/clients/${row.id}`, {replace: true})}
                            sx={{ cursor: "pointer" }}
                          >
                            {row.name}
                          </TableCell>
                          <TableCell
                            align="left"
                            data-test="client-companyName"
                            onClick={() => navigate(`/clients/${row.id}`, {replace: true})}
                            sx={{ cursor: "pointer" }}
                          >
                            {row.companyDetails.name}
                          </TableCell>
                          <TableCell
                            align="left"
                            data-test="client-email"
                            onClick={() => navigate(`/clients/${row.id}`, {replace: true})}
                            sx={{ cursor: "pointer" }}
                          >
                            {row.email}
                          </TableCell>
                          <TableCell
                            align="left"
                            data-test="client-totalBilled"
                            onClick={() => navigate(`/clients/${row.id}`, {replace: true})}
                            sx={{ cursor: "pointer" }}
                          >
                            {row.totalBilled}
                          </TableCell>
                          <TableCell
                            align="left"
                            data-test="client-invoicesCount"
                            onClick={() => navigate(`/clients/${row.id}`, {replace: true})}
                            sx={{ cursor: "pointer" }}
                          >
                            {row.invoicesCount}
                          </TableCell>
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
                              <MenuItem
                                onClick={() => navigate("create-invoice", {replace: true})}
                                data-test="client-actions"
                              >
                                <ListItemIcon>
                                  <BorderColorOutlinedIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Add new invoice</ListItemText>
                              </MenuItem>
                              <Divider />
                              <MenuItem
                                onClick={() => navigate(`clients/${row.id}`, {replace: true})}
                                data-test="client-actions"
                              >
                                <ListItemIcon>
                                  <RemoveRedEyeOutlinedIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Edit client</ListItemText>
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
        {totalClients/limit > 1 && (
          <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" mt={6}>
            <Pagination
              count={Math.ceil(totalClients/limit)}
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

export default ClientTable;
