import { Box, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../../App";
import { getCustList } from "../../utils/displayDataUi";

//Return a list of all the customers of one product
const CustomerOfProduct = (props) => {
  const { customers, purchases } = useContext(AppContext);
  return (
    <Box>
      <Typography>Customers of this product:</Typography>
      {getCustList(customers, purchases, props.id).map((cust) => {
        return (
          <Button
            key={cust.id}
            onClick={() => {
              props.editCustomer({ customer: cust, open: true });
              props.handleClose();
              props.closeEdit();
            }}
          >
            {cust.fname} {cust.lname}
          </Button>
        );
      })}
    </Box>
  );
};

export default CustomerOfProduct;
