import { FC } from "react";
import Header from '../components/Header'; 
import { Container } from "@mui/system";
import DashboardClients from '../components/DashboardClients';
import DashboardInvoices from '../components/DashboardInvoices';
import { Grid } from "@mui/material";

const HomePage: FC = ()=> {
    return (
        <>
        <Header />
        <Container maxWidth="xl">
            <Grid container rowSpacing={1} alignItems="start" columnSpacing={{ xs: 1, sm: 2, md: 3, p: 2 }}>
                <Grid item xs={12} sm={12} md={6}>
                    <DashboardClients />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <DashboardInvoices />
                </Grid>
            </Grid>
            
        </Container>
        </>
    );    
}

export default HomePage;