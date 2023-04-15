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
import { fontTypography, styleBoxModal } from "../../utils/displayDataUi";
const StyleModale = styled(Modal)({
  display: "flex",
  alignItems: "center",
  jastifyContent: "center",
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
            <Typography sx={fontTypography} variant='body1'>
              Product: {props.name}{" "}
            </Typography>

            <Typography sx={fontTypography} variant='body1'>
              price: {props.price}{" "}
            </Typography>
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
        <Typography sx={fontTypography} variant='body2'>
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
                        maxWidth: 400,
                        backgroundColor: "primary.bright",
                      }}
                      align='center'
                    >
                      <Typography
                        key={prod.name}
                        sx={fontTypography}
                        variant='body2'
                      >
                        {prod.name}
                      </Typography>
                      <Typography
                        variant='body1'
                        key={prod.price}
                        align='right'
                        sx={fontTypography}
                      >
                        price: {prod.price}
                      </Typography>
                      <Typography
                        sx={fontTypography}
                        variant='body1'
                        key={prod.quantity}
                        p={1}
                      >
                        quantity: {prod.quantity}
                      </Typography>
                    </ListItem>
                    <ButtonGroup
                      sx={{
                        borderRadius: 1,
                        boxShadow: 3,
                        margin: 0.5,
                      }}
                      size='small'
                      orientation='vertical'
                      disableElevation
                      variant='contained'
                      aria-label='Disabled elevation buttons'
                    >
                      <Button
                        sx={{
                          borderRadius: 1,
                          boxShadow: 3,
                          backgroundColor: "primary.light",
                          ...fontTypography,
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
                          ...fontTypography,
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
                  return <Chip label={prInList.name} sx={fontTypography} />;
                })}
              </Box>
            )}
            <Typography
              variant='body1'
              id='modal-modal-description'
              sx={{ mt: 2, ...fontTypography }}
            >
              <Button
                onClick={() => {
                  handleBuy(prodList, products);
                  props.closeBuy();
                }}
                sx={fontTypography}
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
