import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import {
  fontTypography,
  getProductSum,
  useToggle,
} from "../../utils/displayDataUi";
import Add from "../feachers/Add";
import AddNewProduct from "../feachers/AddNewProduct";
import EditCustomer from "../feachers/EditCustomer";
import EditProd from "../feachers/EditProd";

const Products = (props) => {
  const { purchases, products, adminLogin, login } = useContext(AppContext);
  const [visibleEdit, togEdit] = useToggle();
  const [visibleBuy, togBuy] = useToggle();
  const [visibleAddProd, togAddProd] = useToggle();
  const [userId, setUserId] = useState("");
  const [prodToBuy, setProdToBuy] = useState({});
  const [editCust, setEditCust] = useState({ customer: {}, open: false });
  const [editProdId, setEditProdId] = useState("");
  const [refImg, setRefImg] = useState("");
  const closeAddProd = () => {
    togAddProd();
  };
  const closeEdit = () => {
    togEdit();
  };
  const openEditCustomer = (obj) => {
    setEditCust({ customer: obj.customer, open: obj.open });
  };
  //
  const sumProducts = getProductSum(products, purchases);
  const totalPurch = sumProducts.reduce((sum, prod) => sum + prod.total, 0);
  const prodSold = purchases.length;
  const uptodate = new Date();

  return (
    <Container maxWidth='lg' sx={{ backgroundColor: "main.dark" }}>
      <Box>
        <Typography sx={fontTypography} align='center' gutterBottom>
          All Products
        </Typography>
        {!adminLogin && !login && (
          <Typography sx={fontTypography} align='center' gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        )}
      </Box>
      {adminLogin && (
        <Box
          key='admin'
          align='center'
          sx={{ backgroundColor: "primary.gray", margin: 3, boxShadow: 5 }}
        >
          <Typography sx={fontTypography} p={1}>
            Up to date {uptodate.toDateString()}, the store sold {prodSold}{" "}
            products in total value of {totalPurch}$.
          </Typography>
          <Button
            sx={{
              ...fontTypography,
              backgroundColor: "primary.light",
              opacity: [0.9],
              color: "black",
              margin: 1,
            }}
            onClick={() => {
              togAddProd();
            }}
          >
            Add New Product
          </Button>
        </Box>
      )}
      <Grid container spacing={4}>
        {sumProducts.map((p) => {
          if (p.quantity > 0 || adminLogin) {
            return (
              <Grid item xs={12} sm={6} md={4} key={p.id}>
                <Card
                  variant='outlined'
                  key={p.id}
                  sx={{
                    boxShadow: 3,
                  }}
                >
                  <CardMedia
                    component='img'
                    height='194'
                    image={p.img}
                    alt={p.name}
                    key={p.img}
                  />
                  <CardContent
                    sx={{
                      backgroundColor: "primary.bright",
                      opacity: [0.9],
                      color: "black",
                    }}
                  >
                    <Typography sx={fontTypography}>{p.name}</Typography>
                    <Typography
                      variant='body2'
                      sx={fontTypography}
                      color='textSecondary'
                      component='p'
                    >
                      {p.details}
                    </Typography>
                    <Typography sx={fontTypography}>
                      Price: {p.price}$
                    </Typography>
                    <Typography sx={fontTypography}>
                      Quantity:{p.quantity}
                    </Typography>
                    {login && (
                      <Button
                        sx={fontTypography}
                        variant='contained'
                        color='primary'
                        onClick={() => {
                          setUserId(props.curCustomer.id);
                          setProdToBuy({
                            id: p.id,
                            name: p.name,
                            price: p.price,
                          });
                          togBuy();
                        }}
                      >
                        Buy Product
                      </Button>
                    )}
                    {adminLogin && (
                      <Box>
                        <Typography sx={fontTypography}>
                          sold: {p.sold}
                        </Typography>
                        {p.total > 0 && (
                          <Typography sx={fontTypography}>
                            in total value: {p.total}$
                          </Typography>
                        )}
                        <Button
                          variant='contained'
                          sx={{
                            ...fontTypography,
                            marginTop: 2,
                            backgroundColor: "primary.light",
                            color: "black",
                            "&:hover": {
                              color: "#fff",
                            },
                          }}
                          p={1}
                          onClick={() => {
                            setEditProdId(p.id);
                            setRefImg(p.refImg);
                            togEdit();
                          }}
                        >
                          Edit This Product
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          }
          return <Box key={p.id}>{""}</Box>;
        })}

        {visibleBuy && (
          <Add
            userId={userId}
            closeBuy={togBuy}
            prodId={prodToBuy.id}
            price={prodToBuy.price}
            name={prodToBuy.name}
          />
        )}
        {visibleAddProd && <AddNewProduct closeAddProd={closeAddProd} />}
        {visibleEdit && (
          <EditProd
            closeEdit={closeEdit}
            editProdId={editProdId}
            editCustomer={openEditCustomer}
            refImg={refImg}
          />
        )}
        {editCust.open && (
          <EditCustomer
            editCust={editCust}
            openEditCustomer={openEditCustomer}
          />
        )}
      </Grid>
    </Container>
  );
};

export default Products;
