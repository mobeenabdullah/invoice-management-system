import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { FC } from "react";
import Link from "@mui/material/Link";
import AccountCircle from "@mui/icons-material/AccountCircle";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";

const MenuWrapper = styled.section`
  .icon_box {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .icon_box:hover {
    background-color: transparent !important;
  }
`;

const Header: FC = () => {
  const [cookies, removeCookie] = useCookies(["authToken"]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const userCompanyDetail = useAppSelector((state: RootState) => state.user.companyDetails);
  const userName = useAppSelector((state: RootState) => state.user.name);


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    removeCookie("authToken", []);
    navigate('/login')
  };

  useEffect(() => {
     if(!userCompanyDetail) {
        navigate('/company-detail')
     }
  }, [])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              color: "#ffffff",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Invoice Management System
          </Typography>
          
          <MenuWrapper className="dropdown_menu">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              className="icon_box"
            >
              <AccountCircle />
              <Typography
                variant="body1"
                component="p"
                sx={{ flexGrow: 1, textTransform: "capitalize" }}
                onClick={handleMenu}
                className="profile_name"
              >
                {userName}
              </Typography>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link underline="none" color="#141414">
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </MenuWrapper>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
