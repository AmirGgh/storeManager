import React, { useContext, useState } from "react";
import { AppContext } from "../../App";

import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Modal,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};
const LoginForm = (props) => {
  const { users } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wrongLogin, setWrongLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const adm = "storeA";
    let curCust = users.find(
      (user) =>
        user.password === password &&
        user.username.localeCompare(username) === 0
    );
    if (curCust?.username.length > 0) {
      if (curCust.username.localeCompare(adm) === 0) {
        props.setAdminLogin();
        navigate(`/dashboard`);
      } else {
        props.updateUser(curCust);
        props.userLogin();
        navigate(`/products`);
      }
      setWrongLogin(false);
      props.setClick();
    } else {
      setWrongLogin(true);
    }
  };

  return (
    <Modal
      open={true}
      onClose={() => {
        props.setClick();
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Container maxWidth='sm' sx={style}>
        <Typography variant='h4' align='center' gutterBottom>
          Login
        </Typography>
        {wrongLogin && (
          <Typography color='error.main' variant='h5' align='center'>
            Wrong password or username, try again.
          </Typography>
        )}
        <br />
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label='Username'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Password'
                type='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='contained'
                onClick={() => {
                  handleLogin();
                }}
                fullWidth
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Modal>
  );
};

export default LoginForm;
