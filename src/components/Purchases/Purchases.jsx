import React, { useState, useContext } from "react";
import {
  Autocomplete,
  Box,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { fontTypography, purchList } from "../../utils/displayDataUi";
import { AppContext } from "../../App";
import Combobox from "../feachers/Combobox";

const Purchases = () => {
  const { customers, purchases, products } = useContext(AppContext);
  const [customersSearch, setCustomersSearch] = useState(customers);
  const [purchSearch, setPurchSearch] = useState(null);
  return (
    <Container maxWidth='lg' sx={fontTypography}>
      <Typography sx={fontTypography} variant='h4' align='center' gutterBottom>
        All Purchases
      </Typography>
      {purchases.length === 0 && (
        <Typography sx={fontTypography} variant='h5' align='center'>
          There are no purchases
        </Typography>
      )}
      {purchases.length > 0 && (
        <>
          <Typography sx={fontTypography} variant='h5'>
            Search for customer and their purchases:
          </Typography>
          <br />
          <Stack
            sx={{ margin: "auto", ...fontTypography }}
            direction='row'
            spacing={2}
          >
            <Autocomplete
              id='search_customer'
              getOptionLabel={(customers) =>
                `${customers.fname} ${customers.lname}`
              }
              options={customers}
              sx={{ width: 200 }}
              isOptionEqualToValue={(option, value) =>
                option.fname === value.fname
              }
              noOptionsText={"No available customer"}
              renderOption={(props, customers) => (
                <Box
                  component='li'
                  {...props}
                  key={customers.id}
                  sx={fontTypography}
                >
                  {customers.fname} {customers.lname}
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} label={"Search for a customer"} />
              )}
              onChange={(event, newValue) => {
                if (newValue != null) {
                  setCustomersSearch([newValue]);
                } else {
                  setCustomersSearch(customers);
                }
              }}
            />

            {
              <Autocomplete
                id='search_products'
                getOptionLabel={(products) => `${products.name} `}
                options={products}
                sx={{ width: 200, ...fontTypography }}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                noOptionsText={"No available product"}
                renderOption={(props, products) => (
                  <Box component='li' {...props} key={products.id}>
                    {products.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} label={"Search for a product"} />
                )}
                onChange={(event, newValue) => {
                  if (newValue != null) {
                    setPurchSearch(newValue.id);
                  } else {
                    setPurchSearch(null);
                  }
                }}
              />
            }
          </Stack>
          <br />
          <TableContainer
            component={Paper}
            sx={{ backgroundColor: "primary.gray", ...fontTypography }}
          >
            <Table aria-label='simple table' sx={fontTypography}>
              <TableHead>
                <TableRow>
                  <TableCell fontTypographyalign='center'>
                    Customer Name
                  </TableCell>
                  <TableCell align='center'>Prudocts</TableCell>
                  <TableCell align='center'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customersSearch.map((cust) => {
                  return (
                    <TableRow
                      key={cust.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component='th' scope='row' align='center'>
                        {cust.fname} {cust.lname}
                      </TableCell>

                      <TableCell align='center'>
                        {
                          <Combobox
                            purchList={purchList(cust.id, purchases, products)}
                            id={purchSearch}
                          />
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default Purchases;
