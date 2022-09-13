import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { FC } from "react"; 
import Link from '@mui/material/Link';
import AccountCircle from '@mui/icons-material/AccountCircle';
import styled from "styled-components";

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

//const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header: FC = () => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
 
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{justifyContent: "space-between"}}>               
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Invoice Management System
          </Typography>
          {auth && (
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
                <Typography variant="body1" component="p" sx={{ flexGrow: 1 }} onClick={handleMenu} className="profile_name">John Doe</Typography>               
              </IconButton>              
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >                
                <MenuItem onClick={handleClose}><Link href="#" underline="none" color="#141414">Logout</Link></MenuItem>
              </Menu>
            </MenuWrapper>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
