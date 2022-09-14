
import * as React from 'react';
import { FC } from "react"; 
import styled from "styled-components";
import { Typography, Button } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
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
    name: string,
    company: string,
    email: string,
    total_blled: number,    
    no_invoices: number,
    
  ) {
    return { name, company, email, total_blled, no_invoices };
  }
  
  const rows = [
    createData('Frozen yoghurt', 'Test Company', 'test@test.com', 24, 4),
    createData('Ice cream sandwich', 'Test Company', 'test@test.com', 37,6),
    createData('Eclair', 'Test Company', 'test@test.com', 24,30),
    createData('Cupcake', 'Test Company', 'test@test.com', 67,10),       
  ];

  const options = [
    'None',
    'Atria',
    'Callisto',   
  ];


const ClientTable: FC = ()=> {
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
                <Grid container rowSpacing={1} alignItems="center" m={2} columnSpacing={{ xs: 1, sm: 2, md: 3, p: 2 }}>
                    <Grid item xs={12} sm={12} md={6}><Typography variant="h6">Latest Clients</Typography></Grid>
                    <Grid item xs={12} sm={12} md={6} display="flex" justifyContent="end" gap="10px">
                        <Button variant="contained" href="/create-client">Create Client</Button>
                    </Grid>
                </Grid>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>                                               
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="left">Company</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="left">Total Billed</TableCell>
                                    <TableCell align="left"># of Invoices</TableCell>
                                    <TableCell align="left"></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">{row.company}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="left">{row.total_blled}</TableCell>
                                    <TableCell align="left">{row.no_invoices}</TableCell>
                                    <TableCell align="left">                                    
                                        <IconButton
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
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
                                            vertical: 'top',
                                            horizontal: 'left',
                                          }}
                                          keepMounted
                                          transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                          }}
                                        onClose={handleClose}
                                        MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                        }}                                                                               
                                    >     <MenuItem onClick={handleClose}>                                                
                                                <ListItemText>Edit Client</ListItemText>                                                    
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>                                                
                                                <ListItemText>Create Invoice</ListItemText>                                                        
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
}

export default ClientTable;