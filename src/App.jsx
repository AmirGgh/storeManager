import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

import { db } from "./firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

import { Box } from "@mui/material";

import { useToggle } from "./utils/displayDataUi";

import Dashboard from "./components/Dashboard/Dashboard";
import Products from "./components/Products/Products";
import Customers from "./components/Customers/Customers";
import Purchases from "./components/Purchases/Purchases";
import NavbarHomepage from "./components/NavbarHomepage";

export const AppContext = createContext();

const App = () => {
  const [users, setUsers] = useState([]);
  const [curCustomer, setCurCustomer] = useState({});
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [adminLogin, setAdminLogin] = useToggle();
  const [login, userLogin] = useToggle();
  // save user after login
  const updateUser = (user) => {
    const cur = customers.find((cust) => cust.id === user.idCust);
    setCurCustomer(cur);
  };

  // Fatching data from firebase.
  useEffect(() => {
    const fetchData = async () => {
      const qUsers = query(collection(db, "Users"));
      onSnapshot(qUsers, (querySnapshot) => {
        setUsers(
          querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
        );
      });
    };
    fetchData();
  }, [users]);

  useEffect(() => {
    const fetchData = async () => {
      const qProd = query(collection(db, "Products"));
      onSnapshot(qProd, (querySnapshot) => {
        setProducts(
          querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
        );
      });
    };
    fetchData();
  }, [products]);

  useEffect(() => {
    const fetchData = async () => {
      const qPurch = query(collection(db, "Purchases"));
      onSnapshot(qPurch, (querySnapshot) => {
        setPurchases(
          querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
        );
      });
    };
    fetchData();
  }, [purchases]);

  useEffect(() => {
    const fetchData = async () => {
      const qCust = query(collection(db, "Customers"));
      onSnapshot(qCust, (querySnapshot) => {
        setCustomers(
          querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
        );
      });
    };
    fetchData();
  }, [customers]);

  return (
    <AppContext.Provider
      value={{
        products,
        purchases,
        customers,
        adminLogin,
        login,
        users,
      }}
    >
      <NavbarHomepage
        login={login}
        adminLogin={adminLogin}
        userLogin={userLogin}
        setAdminLogin={setAdminLogin}
        updateUser={updateUser}
        nameC={curCustomer?.name}
      />
      {/* Access to components by login state */}
      <Box>
        <Routes>
          <Route>
            <Route path='/' element={<Products />} />
          </Route>
          {adminLogin && (
            <Route>
              <Route>
                <Route path='/Dashboard' element={<Dashboard />} />
                <Route path='/products' element={<Products />} />
                <Route path='/customers' element={<Customers />} />
                <Route path='/purchases' element={<Purchases />} />
              </Route>
            </Route>
          )}
          {login && (
            <Route>
              <Route
                path='/products'
                element={<Products curCustomer={curCustomer} />}
              />
              <Route path='/customers' element={<Customers />} />
            </Route>
          )}
        </Routes>
      </Box>
    </AppContext.Provider>
  );
};

export default App;
