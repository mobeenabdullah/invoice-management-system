import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from "@mui/icons-material/AccountCircle";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";

const MenuWrapper = styled.section`
  display: flex;
  .icon_box {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .icon_box:hover {
    background-color: transparent !important;
  }
`;
const MenuItemLink = styled.span`
  .menu_item {
    color: #141414;
    text-decoration: none;
    font-size: 1rem;
    line-height: 1;
  }
  .menu_item-desktop {
    color: #ffffff;
  }
`;

const HeaderLogoText = styled.div`
  a {
    color: #ffffff;
    text-decoration: none;
  }
`;


const pages: any = [{label: 'Home', link: "/"}, {label: 'Clients', link: '/clients'}, {label: 'Invoices', link: '/invoices'}];
const settings: any = [{label: 'Logout', link: "/logout"}];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [cookies, removeCookie] = useCookies(["authToken"]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const userName = useAppSelector((state: RootState) => state.user.name);



  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);    
  };

  const logOut = () => {
    removeCookie("authToken", {path:'/'});
    navigate('/login')
  }

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters> 
          <HeaderLogoText>            
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },              
                fontWeight: 700,              
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <Link to="/">Invoice Management System</Link>                
            </Typography>
          </HeaderLogoText>         

          <Box sx={{flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <HeaderLogoText>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,              
                fontWeight: 700,              
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '1rem',
              }}
            >
              <Link to="/">Invoice Management System</Link>
            </Typography>
          </HeaderLogoText>                    
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },                
              }}
              data-test='nav-bar'
            >
              {pages.map((page: any, index: number) => (
                
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <MenuItemLink>
                        <Link to={page.link} className="menu_item">{page.label}</Link>  
                      </MenuItemLink>
                    </Typography>
                  </MenuItem>
                
              ))}
            </Menu>
          </Box>
      
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: '30px' }}>
            {pages.map((page: any, index: number) => (              
                <Button
                  key={index}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', fontSize: '1.4rem' }}                  
                  component="div"
                >
                <MenuItemLink>
                  <Link to={page.link} className="menu_item menu_item-desktop">{page.label}</Link>  
                </MenuItemLink>
                </Button>
              
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <MenuWrapper className="dropdown_menu">
                <IconButton 
                onClick={handleOpenUserMenu} sx={{ p: 0 }}
                color="inherit"
                className="icon_box"
                >
                  <AccountCircle /> 
                  <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block'}}}>
                  <Typography
                  variant="body1"
                  component="p"
                  sx={{ flexGrow: 1, }}
                  onClick={handleMenu}
                  className="profile_name"
                >
                  {userName}
                </Typography>
                  </Box>                  
                </IconButton>
                <Box sx={{ display: { xs: 'block', sm: 'block', md: 'block', lg: 'none'}}}>
                  <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                  >
                  <MenuIcon />              
                  </IconButton> 
                </Box>
              </MenuWrapper>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              data-test='nav-bar'
            >
              {settings.map((setting: any , index: number) => (                
                  <MenuItem key={index} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={logOut} data-test='logout-button'>{setting.label}</Typography>
                  </MenuItem>                
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
