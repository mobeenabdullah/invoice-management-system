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
import { getClients } from "../features/clients/clientThunks";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

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
  const [errorMessage, setErrorMessage] = useState("No client found...");
  const navigate = useNavigate();

  const fetchClientsList = async () => {
    try {
      const clientsList = await getClients(cookies.authToken);
      setClientRows(clientsList.data.clients.slice(0, 11));
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
    fetchClientsList();
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
            <p date-test="clients-fetch-error">{errorMessage}</p>
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
            <p>No client found...</p>
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
                      <TableCell>Name</TableCell>
                      <TableCell align="left">Company name</TableCell>
                      <TableCell align="left">Email</TableCell>
                      <TableCell align="left">Total billed</TableCell>
                      <TableCell align="left">Invoices</TableCell>
                      <TableCell align="left"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clientRows.length === 0 && (
                      <p data-test="empty-placeholder">No client found...</p>
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
      </Wrapper>
    </>
  );
};

export default ClientTable;
