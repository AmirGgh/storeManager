import { Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../App";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
import { purchList, useToggle } from "../../utils/displayDataUi";
import Add from "../feachers/Add";
import EditProd from "../feachers/EditProd";
import EditCustomer from "../feachers/EditCustomer";

// Display all customers and thier products, Admin have
// some functionalitis in this component. customer can see only other customers
// and all the products thay bought.

const Customers = () => {
  const { customers, purchases, products, adminLogin, login } =
    useContext(AppContext);
  const [visible, togBuy] = useToggle();
  const [visibleEdit, togEdit] = useToggle();
  const [userId, setUserId] = useState("");
  const [editProdId, setEditProdId] = useState("");
  const [editCust, setEditCust] = useState({ customer: {}, open: false });

  const closeBuy = () => {
    togBuy();
  };
  const closeEdit = () => {
    togEdit();
  };
  const openEditCustomer = (obj) => {
    setEditCust({ customer: obj.customer, open: obj.open });
  };

  return (
    <Container maxWidth='xl'>
      <>
        <Typography variant='h4' align='center' gutterBottom>
          All Customers
        </Typography>
      </>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "primary.gray" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Customer Name</TableCell>
              <TableCell align='center'>City</TableCell>
              <TableCell align='center'>Prudocts</TableCell>
              {adminLogin && <TableCell align='center'></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody key={customers[0].lname}>
            {customers.map((cust) => (
              <TableRow
                key={cust.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component='th'
                  scope='row'
                  align='center'
                  key={cust.lname + "ADC"}
                >
                  {cust.fname} {cust.lname}
                </TableCell>
                <TableCell
                  component='th'
                  scope='row'
                  align='center'
                  key={cust.city}
                >
                  {cust.city}
                </TableCell>

                {adminLogin && (
                  <>
                    <TableCell align='center' key={cust.fname}>
                      {purchList(cust.id, purchases, products).map(
                        (purch, index) => {
                          return (
                            <Button
                              p={1}
                              key={index}
                              onClick={() => {
                                setEditProdId(purch.id);
                                togEdit();
                              }}
                              sx={{
                                backgroundColor: "primary.bright",
                                margin: 0.5,
                              }}
                            >
                              {purch.name} - {purch.date}
                            </Button>
                          );
                        }
                      )}
                    </TableCell>
                    <TableCell align='center' key={cust.fname + cust.lname}>
                      <Button
                        sx={{ backgroundColor: "primary.light" }}
                        onClick={() => {
                          setUserId(cust.id);
                          togBuy();
                        }}
                      >
                        Buy Product
                      </Button>
                    </TableCell>
                  </>
                )}
                {login && (
                  <TableCell key={cust.lname}>
                    {purchList(cust.id, purchases, products).map(
                      (purch, index) => {
                        return (
                          <Typography key={index} align='center'>
                            {purch.name} - {purch.date}
                          </Typography>
                        );
                      }
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {visible && <Add userId={userId} closeBuy={closeBuy} />}
        {visibleEdit && (
          <EditProd
            closeEdit={closeEdit}
            editProdId={editProdId}
            editCustomer={openEditCustomer}
          />
        )}
        {editCust.open && (
          <EditCustomer
            editCust={editCust}
            openEditCustomer={openEditCustomer}
          />
        )}
      </TableContainer>
    </Container>
  );
};

export default Customers;
