import * as React from "react";
import { FC } from "react";
import styled from "styled-components";
import { Typography, Button } from "@mui/material";
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
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";

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

function createData(
  invoice: number,
  client: string,
  company: string,
  value: number,
  date: string,
  due_date: string
) {
  return { invoice, client, company, value, date, due_date };
}

const rows = [
  createData(1234, "Jhon", "company", 1234, "2022-02-10", "2022-03-12"),
  createData(1234, "Jhon", "company", 1234, "2022-02-10", "2022-03-12"),
  createData(1234, "Jhon", "company", 1234, "2022-02-10", "2022-03-12"),
  createData(1234, "Jhon", "company", 1234, "2022-02-10", "2022-03-12"),
];

const options = ["None", "Atria", "Callisto"];

const InvoiceTable: FC = () => {
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
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Invoice</TableCell>
                    <TableCell align="left">Client</TableCell>
                    <TableCell align="left">Company</TableCell>
                    <TableCell align="left">value</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Due Date</TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.invoice}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.invoice}
                      </TableCell>
                      <TableCell align="left">{row.client}</TableCell>
                      <TableCell align="left">{row.company}</TableCell>
                      <TableCell align="left">{row.value}</TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.due_date}</TableCell>
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
                          <MenuItem onClick={handleClose}>
                            <ListItemText>Edit Invoice</ListItemText>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <ListItemText>Print Invoice</ListItemText>
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
      </Wrapper>
    </>
  );
};

export default InvoiceTable;
