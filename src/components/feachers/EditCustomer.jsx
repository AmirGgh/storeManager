import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import { deleteCustomer, update } from "./utilsDB";
import { styleBoxModal } from "../../utils/displayDataUi";

// get one customer and state for component
const EditCustomer = (props) => {
  const { customers } = useContext(AppContext);
  const { customer, open } = props.editCust;
  const [customerUpdate, setCustomerUpdate] = useState({});

  return (
    <Modal
      open={open}
      onClose={() => {
        props.openEditCustomer({ customer: {}, open: !open });
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={styleBoxModal}>
        <Box>
          <Typography>Edit Customer</Typography>
          <TextField
            sx={{ margin: 1 }}
            id='filled-basic'
            label='First Name'
            variant='filled'
            defaultValue={customer.fname}
            onChange={(e) =>
              setCustomerUpdate({ ...customerUpdate, fname: e.target.value })
            }
          />
          <TextField
            sx={{ margin: 1 }}
            id='filled-basic'
            label='Last Name'
            variant='filled'
            defaultValue={customer.lname}
            onChange={(e) =>
              setCustomerUpdate({ ...customerUpdate, lname: e.target.value })
            }
          />
          <TextField
            sx={{ margin: 1 }}
            id='filled-basic'
            label='City'
            variant='filled'
            defaultValue={customer.city}
            onChange={(e) =>
              setCustomerUpdate({ ...customerUpdate, city: e.target.value })
            }
          />
        </Box>
        <Box>
          <Button
            onClick={() => {
              update(customerUpdate, customer.id, "Customers");
              props.openEditCustomer({ customer: {}, open: !open });
            }}
          >
            Update
          </Button>
          <Button
            onClick={() => {
              deleteCustomer(customer.id, customers);
              props.openEditCustomer({ customer: {}, open: !open });
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditCustomer;
