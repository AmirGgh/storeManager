import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

//GENERIC FUNCTIONS
const getAll = async (collec) => {
  const q = query(collection(db, collec));
  onSnapshot(q, (querySnapshot) => {
    return querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  });
};
const update = async (update, id, collec) => {
  await updateDoc(doc(db, collec, id), update);
};
const addNewObj = async (obj, collec) => {
  await addDoc(collection(db, collec), obj);
};

//-----------------------------------------------------------------
//USERS
const signup = async (customer, user) => {
  const newCust = await addDoc(collection(db, "Customers"), customer);
  const id = newCust.id;
  addNewObj({ ...user, idCust: id }, "Users");
};
//-----------------------------------------------------------------
// PRODUCTS
const deleteProduct = async (id, purchases) => {
  purchases.forEach(async (purch) => {
    if (purch.productID === id) await deleteDoc(doc(db, "Purchases", purch.id));
  });
  await deleteDoc(doc(db, "Products", id));
};

//---------------------------------------------------------------------------------
// Customers

const deleteCustomer = async (id, customers) => {
  customers.forEach(async (cust) => {
    if (cust.id === id) await deleteDoc(doc(db, "Customers", cust.id));
  });
};
//---------------------------------------------------------------------------------
// Purchases
// If all products in stack add all products to user's purchases
const handleBuy = async (addedProd, products) => {
  let outOfStack = false;
  const uptProducts = products.map((prod) => {
    const newQuant =
      prod.quantity - addedProd.filter((addp) => addp.id === prod.id).length;
    if (newQuant >= 0) {
      return {
        ...prod,
        quantity: newQuant,
      };
    } else {
      outOfStack = true;
      alert(
        `Not enought ${prod.name} in store, See max amount in the right side - ('quantity:')`
      );
      return -1;
    }
  });
  if (!outOfStack) {
    uptProducts.forEach(async (p) => {
      await update(p, p.id, "Products");
    });

    addedProd.forEach(async (p) => {
      const obj = {
        customerID: p.custID,
        productID: p.id,
        date: p.date,
      };
      await addNewObj(obj, "Purchases");
    });
  }
};

export {
  getAll,
  update,
  deleteProduct,
  handleBuy,
  deleteCustomer,
  addNewObj,
  signup,
};
