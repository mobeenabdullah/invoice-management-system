import { FC } from "react";
import Header from "../components/Header";
import { Container } from "@mui/system";
import ClientTable from "../components/ClientTable";
import { Grid } from "@mui/material";
import { useCompanyDetailGuard } from "../hooks/customHooks";

const Clients: FC = () => {
  useCompanyDetailGuard();
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Grid
          container
          rowSpacing={1}
          alignItems="center"
          columnSpacing={{ xs: 1, sm: 2, md: 3, p: 2 }}
        >
          <Grid item xs={12} sm={12} md={12}>
            <ClientTable />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Clients;
