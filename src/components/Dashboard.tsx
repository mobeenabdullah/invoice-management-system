import { FC } from "react";  
import styled from "styled-components";
import Header from './Header'; 
import { Container } from "@mui/system";
import InvoiceTable from './InvoiceTable';
import { Grid } from "@mui/material";

const Dashboard: FC = ()=> {
    return (
        <>
        <Header />
        <Container maxWidth="xl">
            <Grid container rowSpacing={1} alignItems="center" columnSpacing={{ xs: 1, sm: 2, md: 3, p: 2 }}>
                <Grid item xs={12} sm={12} md={6}>
                    <InvoiceTable />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <InvoiceTable />
                </Grid>
            </Grid>
            
        </Container>
        </>
    );    
}

export default Dashboard;