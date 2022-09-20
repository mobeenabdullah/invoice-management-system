import { Button, TextField, Grid, Typography, Stack } from "@mui/material";
import { FC } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useState } from "react";
import Loading from "../components/Loading";

const Wrapper = styled.section`
  height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2%;
  .size {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .paper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .avatar {
    background-color: #1976d2;
  }
  .form {
    width: 100%;
  }
  .submit {
    margin-top: 1rem;
    padding: 1rem;
  }
  .login_image {
    height: 85vh;
    border-radius: 16px;
    overflow: hidden;
    background-image: url("invoice.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .login_image li {
    height: 100% !important;
  }
  .login_image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .login_form .paper {
    max-width: 50%;
    width: 100%;
    margin: 0 auto;
  }
`;

const CreateInvoice: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Header />
      <Wrapper>
        <Grid
          container
          rowSpacing={1}
          alignItems="center"
          columnSpacing={{ xs: 1, sm: 2, md: 3, p: 2 }}
        >
          <Grid item xs={6}>
            <Stack className="login_image"></Stack>
          </Grid>
          <Grid item xs={6} className="login_form">
            <Stack className="paper">
              <Stack spacing={2}>
                <Stack spacing={1} sx={{ textAlign: "center" }}>
                  <Typography component="h1" variant="h4">
                    Create Invoice
                  </Typography>
                </Stack>
              </Stack>

              <form className="form" noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="client"
                  label="Client"
                  name="client"
                  value=""
                />
                <Typography component="p" data-test="client-error"></Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="company"
                  label="Company"
                  name="company"
                  value=""
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="company_value"
                  label="Value"
                  name="company_value"
                  type="number"
                  value=""
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="date"
                  label="Date"
                  name="date"
                  type="text"
                  value=""
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="due_date"
                  label="Due Date"
                  name="due_date"
                  type="text"
                  value=""
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  disabled={isLoading ? true : false}
                >
                  {isLoading ? <Loading /> : "submit"}
                </Button>
              </form>
            </Stack>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
};

export default CreateInvoice;
