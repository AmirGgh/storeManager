import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Chip, Container, Grid, ListItem, Paper, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useContext, useState } from "react";
import { AppContext } from "../../App";
import { handleBuy } from "./utilsDB";
import { fontTypography, styleBoxModal } from "../../utils/displayDataUi";
const StyleModale = styled(Modal)({
  display: "flex",
  alignItems: "center",
  jastifyContent: "center",
  p: 1,
  ...fontTypography,
});

// Add new product to customers
const Add = (props) => {
  const { products, login } = useContext(AppContext);
  const [prodList, setProdList] = useState([]);
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(!open);
    setProdList([]);
  };

  return (
    <StyleModale
      open={open}
      onClose={() => {
        handleClose();
        props.closeBuy();
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      {/* Customer can add the product he click on */}
      <Box sx={{ ...styleBoxModal, ...fontTypography }}>
        {login && (
          <Paper
            sx={{
              ...fontTypography,
              justifyContent: "center",
              flexWrap: "wrap",
              p: { xs: 0.5, sm: 1, md: 2, lg: 4 },
              boxShadow: 3,
            }}
          >
            <Typography sx={fontTypography}>Product: {props.name} </Typography>

            <Typography sx={fontTypography}>price: {props.price} </Typography>
            <Button
              onClick={() => {
                const buyProd = [
                  {
                    id: props.prodId,
                    custID: props.userId,
                    name: props.name,
                    date: new Date().toDateString(),
                  },
                ];
                handleBuy(buyProd, products);
                props.closeBuy();
              }}
              sx={{
                backgroundColor: "primary.light",
                ...fontTypography,
              }}
            >
              Buy Only This Product
            </Button>
          </Paper>
        )}
        <br />
        {/* Admin and customers can add multiple products */}
        <Typography sx={fontTypography}>
          add new product from The list:
        </Typography>
        <Paper sx={{ padding: 1 }}>
          {products.length > 0 &&
            products.map((prod) => {
              return (
                prod.quantity > 0 && (
                  <Grid container spacing={1}>
                    <Grid
                      xs={1}
                      container
                      justifyContent='center'
                      alignItems='center'
                    >
                      <AddIcon
                        onClick={() =>
                          setProdList([
                            ...prodList,
                            {
                              id: prod.id,
                              custID: props.userId,
                              name: prod.name,
                              date: new Date().toDateString(),
                              index: prodList.length,
                            },
                          ])
                        }
                      />
                    </Grid>

                    <Grid Typography xs={5} padding={1}>
                      <Typography
                        sx={fontTypography}
                        key={prod.name}
                        align='left'
                        padding={1}
                      >
                        {prod.name}
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      xs={5}
                      alignItems={"center"}
                      justifyContent={"flex-end"}
                      padding={1}
                    >
                      <Typography
                        sx={fontTypography}
                        key={prod.price}
                        align='right'
                      >
                        price:{prod.price} quantity:{prod.quantity}
                      </Typography>
                    </Grid>
                    <Grid
                      xs={1}
                      container
                      justifyContent='center'
                      alignItems='center'
                    >
                      <RemoveIcon
                        onClick={() => {
                          let fl = true;
                          const p = prodList.filter((pl) => {
                            if (fl && pl?.id === prod?.id) {
                              fl = false;
                              return false;
                            } else {
                              return true;
                            }
                          });
                          setProdList(p);
                        }}
                      />
                    </Grid>
                  </Grid>
                )
              );
            })}
        </Paper>
        <br />
        {prodList.length > 0 && (
          <Paper
            sx={{
              justifyContent: "center",
              flexWrap: "wrap",
              padding: 3,
              boxShadow: 3,
            }}
          >
            {prodList.length > 0 && (
              <Container>
                {prodList.map((prInList) => {
                  <Chip
                    label='Chip Filled'
                    sx={{ margin: 0.5, ...fontTypography }}
                    size='small'
                  />;
                  return (
                    <Chip
                      label={prInList.name}
                      sx={{ margin: 0.5, ...fontTypography }}
                      size='small'
                    />
                  );
                })}
              </Container>
            )}
            <Typography
              id='modal-modal-description'
              sx={{ mt: 2, ...fontTypography }}
            >
              <Button
                onClick={() => {
                  handleBuy(prodList, products);
                  props.closeBuy();
                }}
                sx={{ backgroundColor: "primary.light", ...fontTypography }}
              >
                Add Products
              </Button>
            </Typography>
          </Paper>
        )}
      </Box>
    </StyleModale>
  );
};

export default Add;
