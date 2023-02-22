import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  ButtonGroup,
  Chip,
  ListItem,
  ListItemText,
  Paper,
  styled,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { useContext, useState } from "react";
import { AppContext } from "../../App";
import { handleBuy } from "./utilsDB";
import { styleBoxModal } from "../../utils/displayDataUi";

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
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        props.closeBuy();
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      {/* Customer can add the product he click on */}
      <Box sx={styleBoxModal}>
        {login && (
          <Paper
            sx={{
              justifyContent: "center",
              flexWrap: "wrap",
              padding: 3,
              boxShadow: 3,
            }}
          >
            <Typography>Product: {props.name} </Typography>

            <Typography>price: {props.price} </Typography>
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
              }}
            >
              Buy Only This Product
            </Button>
          </Paper>
        )}
        <br />
        {/* Admin and customers can add multiple products */}
        <Typography variant='h6' component='h2'>
          add new product from The list:
        </Typography>
        <Paper
          sx={{
            justifyContent: "center",
            flexWrap: "wrap",
            padding: 3,
            boxShadow: 3,
          }}
        >
          {products.length > 0 &&
            products.map((prod) => {
              return (
                prod.quantity > 0 && (
                  <ListItem>
                    <ListItem
                      key={prod.id}
                      sx={{
                        borderRadius: 1,
                        boxShadow: 3,
                        margin: 0.5,
                        fontSize: 8,
                        maxWidth: 400,
                        backgroundColor: "primary.bright",
                      }}
                      align='center'
                    >
                      <ListItemText key={prod.name} primary={prod.name} />
                      <Typography key={prod.price} align='right'>
                        price: {prod.price}
                      </Typography>
                      <Typography key={prod.quantity} p={1}>
                        quantity: {prod.quantity}
                      </Typography>
                    </ListItem>
                    <ButtonGroup
                      sx={{
                        borderRadius: 1,
                        boxShadow: 3,
                        margin: 0.5,
                      }}
                      disableElevation
                      variant='contained'
                      aria-label='Disabled elevation buttons'
                    >
                      <Button
                        sx={{
                          borderRadius: 1,
                          boxShadow: 3,
                          backgroundColor: "primary.light",
                        }}
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
                      >
                        <AddCircleOutlineOutlinedIcon />
                      </Button>
                      <Button
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
                        sx={{
                          borderRadius: 1,
                          boxShadow: 3,
                          backgroundColor: "primary.light",
                        }}
                      >
                        <RemoveCircleOutlineOutlinedIcon />
                      </Button>
                    </ButtonGroup>
                  </ListItem>
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
              <Box>
                {prodList.map((prInList) => {
                  <Chip label='Chip Filled' sx={{ margin: 0.5 }} />;
                  return <Chip label={prInList.name} />;
                })}
              </Box>
            )}
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              <Button
                onClick={() => {
                  handleBuy(prodList, products);
                  props.closeBuy();
                }}
              >
                Add Products
              </Button>
            </Typography>
          </Paper>
        )}
      </Box>
    </Modal>
  );
};

export default Add;
