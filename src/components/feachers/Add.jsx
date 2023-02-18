import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Chip,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  styled,
} from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../App";
import { handleBuy } from "./utilsDB";
import { FixedSizeList } from "react-window";
import { styleBoxModal } from "../../utils/displayDataUi";

const ListItemChip = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

// Add new product to customers
const Add = (props) => {
  const { products, login } = useContext(AppContext);
  let copyProducts = products;
  const [prodList, setProdList] = useState([]);
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(!open);
    setProdList([]);
  };

  // List of products that in stock,
  // Admin and customers can add multiple products
  const FixList = () => {
    return copyProducts.map((prod) => {
      return (
        prod.quantity > 0 && (
          <ListItem
            key={prod.id}
            sx={{
              borderRadius: 1,
              boxShadow: 3,
              margin: 0.5,
              fontSize: 8,
              maxWidth: 400,
            }}
            align='center'
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
            <ListItemButton
              key={props.userId}
              sx={{
                borderRadius: 1,
                boxShadow: 3,
                margin: 0.5,
                backgroundColor: "primary.light",
              }}
            >
              <ListItemText key={prod.name} primary={prod.name} />
            </ListItemButton>
            <Typography key={prod.price} align='right'>
              price: {prod.price}
            </Typography>
            <Typography key={prod.quantity} p={1}>
              quantity: {prod.quantity}
            </Typography>
          </ListItem>
        )
      );
    });
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        copyProducts = products;
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
        <Typography variant='h6' component='h2'>
          <strong>double click</strong> on item to add new product from The
          list:
        </Typography>

        <Box
          sx={{
            width: "100%",
            maxHeight: 450,
            maxWidth: 600,
            bgcolor: "background.paper",
          }}
        >
          <FixedSizeList
            height={350}
            maxWidth={500}
            itemSize={46}
            itemCount={1}
            overscanCount={1}
          >
            {FixList}
          </FixedSizeList>
        </Box>
        {prodList.length >= 1 && (
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
            }}
            component='ul'
          >
            {prodList.map((pl, index) => {
              return (
                <ListItemChip key={index}>
                  <Chip
                    label={pl.name}
                    onDelete={() => {
                      setProdList((plist) =>
                        plist.filter((p) => p.index !== pl.index)
                      );
                    }}
                  />
                </ListItemChip>
              );
            })}
          </Paper>
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
      </Box>
    </Modal>
  );
};

export default Add;
