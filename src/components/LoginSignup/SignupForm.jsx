import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Modal,
} from "@mui/material";

import { signup } from "../feachers/utilsDB";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const SignupForm = (props) => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [city, setCity] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = () => {
    signup({ fname, lname, city }, { username, password });
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
          Sign Up
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label='First Name'
                value={fname}
                onChange={(event) => setFName(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Last Name'
                value={lname}
                onChange={(event) => setLName(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='City'
                value={city}
                onChange={(event) => setCity(event.target.value)}
                fullWidth
              />
            </Grid>
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
                color='primary'
                onClick={() => {
                  handleSignup();
                  props.setClick();
                }}
                fullWidth
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Modal>
  );
};

export default SignupForm;
