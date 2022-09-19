import { FC } from "react";
import Header from './Header'; 
import { Container } from "@mui/system";
import DashboardClients from './DashboardClients';
import DashboardInvoices from './DashboardInvoices';
import { Grid } from "@mui/material";

const Dashboard: FC = ()=> {
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

export default Dashboard;