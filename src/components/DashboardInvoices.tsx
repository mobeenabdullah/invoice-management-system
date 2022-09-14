
import * as React from 'react';
import { FC } from "react"; 
import styled from "styled-components";
import { Button, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Menu from '@mui/material/Menu';
import { Divider } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
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
    company_name: number,
    total_blled: number,
    invoices: number,
    
  ) {
    return { name, company_name, total_blled, invoices };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24),
    createData('Ice cream sandwich', 237, 9.0, 37),
    createData('Eclair', 262, 16.0, 24),
    createData('Cupcake', 305, 3.7, 67),    
  ];

  const options = [
    'None',
    'Atria',
    'Callisto',   
  ];


const DashboardInvoices: FC = ()=> {
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
                    <Grid item xs={12} sm={12} md={6}><Typography variant="h6">Latest Invoices</Typography></Grid>
                    <Grid item xs={12} sm={12} md={6} display="flex" justifyContent="end" gap="10px">
                        <Button variant="contained" href="/create-invoice">Create Invoice</Button>
                        <Button variant="contained" href="/invoices">ALl Invoices</Button>
                    </Grid>
                </Grid>
                <Card sx={{ minWidth: 275 }}>                    
                    <CardContent>                                                
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="left">Company name</TableCell>
                                    <TableCell align="left">Total billed</TableCell>
                                    <TableCell align="left">Invoices</TableCell>
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
                                    <TableCell align="left">{row.company_name}</TableCell>
                                    <TableCell align="left">{row.total_blled}</TableCell>
                                    <TableCell align="left">{row.invoices}</TableCell>
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
                                                <ListItemIcon>
                                                    <BorderColorOutlinedIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText>Edit</ListItemText>                                                    
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <DeleteOutlineOutlinedIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText>Delete</ListItemText>                                                        
                                            </MenuItem>
                                        
                                            <Divider />
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <RemoveRedEyeOutlinedIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText>View</ListItemText>
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

export default DashboardInvoices;