import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import LaptopTwoToneIcon from "@mui/icons-material/LaptopTwoTone";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useToggle } from "../utils/displayDataUi";
import SignupForm from "./StoreAndLogin/SignupForm";
import LoginForm from "./StoreAndLogin/LoginForm";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

const userPages = ["Products", "Customers"];
const adminPages = ["Dashboard", "Products", "Customers", "Purchases"];

function NavbarHomepage(props) {
  const { adminLogin, login } = useContext(AppContext);
  const navigate = useNavigate();
  const [togSignup, setSignup] = useToggle();
  const [togLogin, setLogin] = useToggle();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position='static' sx={{ backgroundColor: "primary.dark" }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <LaptopTwoToneIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant='h6'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            COMPU
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            {/* Menu For small Display/Mobail */}
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {login &&
                userPages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign='center'
                      onClick={() => {
                        navigate(`/${page}`);
                      }}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              {adminLogin &&
                adminPages.map((page) => (
                  <MenuItem key={page}>
                    <Typography
                      textAlign='center'
                      onClick={() => {
                        navigate(`/${page}`);
                      }}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              {!(adminLogin || login) && (
                <Box>
                  <MenuItem key={"login"} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign='center'
                      onClick={() => {
                        setLogin();
                      }}
                    >
                      login
                    </Typography>
                  </MenuItem>
                  <MenuItem key={"sign_up"} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign='center'
                      onClick={() => {
                        setSignup();
                      }}
                    >
                      sign up
                    </Typography>
                  </MenuItem>
                </Box>
              )}
            </Menu>
          </Box>
          <LaptopTwoToneIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant='h5'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            COMPU
          </Typography>
          {/* Navbar Buttons - pages and login/logout/signin */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {login &&
              userPages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    navigate(`/${page}`);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            {adminLogin &&
              adminPages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    navigate(`/${page}`);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {!(adminLogin || login) && (
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  onClick={() => {
                    setLogin();
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    setSignup();
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  sign up
                </Button>
                {togLogin && (
                  <LoginForm
                    updateUser={props.updateUser}
                    setClick={setLogin}
                    userLogin={props.userLogin}
                    setAdminLogin={props.setAdminLogin}
                  />
                )}
                {togSignup && <SignupForm setClick={setSignup} />}
              </Box>
            )}
            {(adminLogin || login) && (
              <Box>
                <Button
                  sx={{ my: 2, color: "white", display: "block" }}
                  onClick={() => {
                    login ? props.userLogin() : props.setAdminLogin();
                    setLogin();
                    props.updateUser({});
                    navigate(`/`);
                  }}
                >
                  Logout
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavbarHomepage;
