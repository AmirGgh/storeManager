import { useState } from "react";
// Toggle between components
const useToggle = (initalVal = false) => {
  const [state, setState] = useState(initalVal);
  const toggle = () => {
    setState((prev) => !prev);
  };
  return [state, toggle];
};

// Rturen a summery of product details and sales
const getProductSum = (products, purchases) => {
  const productCount = products.map((product) => {
    const customersWhoBoughtProduct = purchases.filter(
      (purch) => purch.productID === product.id
    );
    const sold = customersWhoBoughtProduct.length;
    return {
      ...product,
      sold,
      total: product.price * sold,
    };
  });
  return productCount;
};

// Return list of all customer's (id = custID) purchases
//  Dan purchases: PC,TV....
const purchList = (custID, purchases, products) => {
  return purchases
    .filter((purch) => purch.customerID === custID)
    .map((purch) => {
      return {
        id: purch.productID,
        date: purch.date,
        name: products.find((p) => p.id === purch.productID).name,
        price: products.find((p) => p.id === purch.productID).price,
      };
    });
};

//return list of customers' id how bought this product
// Customers of TV: Dana, Ron, Joe..
const getCustList = (customers, purchases, prodID) => {
  const customerIdList = purchases
    .filter((purch) => prodID === purch.productID)
    .map((purch) => purch.customerID);

  return [...new Set(customerIdList)]
    .map((cId) => {
      return customers.filter((cust) => cId === cust.id);
    })
    .flatMap((cust) => cust);
};

// Generate colors for dashbord
const generateColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const color = `rgb(${red}, ${green}, ${blue})`;
    colors.push(color);
  }
  return colors;
};

// Box modal  style
const styleBoxModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWith: { xs: 400, sm: 500, md: 800 },
  minHight: { xs: 250, sm: 500, md: 800 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export {
  useToggle,
  purchList,
  getProductSum,
  getCustList,
  generateColors,
  styleBoxModal,
};
