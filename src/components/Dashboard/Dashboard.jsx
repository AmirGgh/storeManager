import React, { useContext, useMemo, useState } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { AppContext } from "../../App";
import { generateColors, purchList } from "../../utils/displayDataUi";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

import { Bar, Line, Pie } from "react-chartjs-2";
const Dashboard = () => {
  const { customers, purchases, products } = useContext(AppContext);

  // Customer total purchases
  const [userData, setUserData] = useState({
    labels: customers.map((cust) => cust.fname),
    datasets: [
      {
        label: "Totale Purchases",
        data: customers.map((customer) => {
          return purchList(customer.id, purchases, products).reduce(
            (sum, purch) => {
              return sum + Number(purch.price);
            },
            0
          );
        }),
        backgroundColor: generateColors(customers.length),
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  // timeline purchases
  function sortDates(dates) {
    return dates.sort((a, b) => {
      const dateA = new Date(a.p);
      const dateB = new Date(b.p);
      return dateA - dateB;
    });
  }
  const days = new Set(purchases.map((purch) => purch.date));
  let purchDays = [];
  days.forEach((p) => {
    purchDays = [...purchDays, { p }];
  });
  purchDays = sortDates(purchDays);
  const [purchasesData, setpurchasesData] = useState({
    labels: purchDays.map((day) => day.p),
    datasets: [
      {
        label: "Totale Purchases",
        data: purchDays.map((day) => {
          return purchases.filter((p) => p.date === day.p).length;
        }),
        backgroundColor: generateColors(purchases.length),
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  // Product total sales
  const [productSalse, setProductSalse] = useState({
    labels: products.map((prod) => prod.name),
    datasets: [
      {
        label: "product salse",
        data: products.map((prod) => {
          return purchases.filter((p) => p.productID === prod.id).length;
        }),
        backgroundColor: generateColors(products.length),
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  const BarChart = useMemo(() => {
    return (
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Bar data={userData} />
      </Box>
    );
  }, [userData]);

  const PieChart = useMemo(() => {
    return (
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Pie data={productSalse} />
      </Box>
    );
  }, [productSalse]);

  const LineChart = useMemo(() => {
    return (
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Line data={purchasesData} />
      </Box>
    );
  }, [purchasesData]);

  return (
    <Container maxWidth='lg'>
      <Box m={3}>
        <>
          <Typography variant='h4' align='center' gutterBottom>
            Welcome to your dashboard!
          </Typography>
          <Typography variant='h5' align='center'>
            {purchases.length > 0
              ? "This is where you can see your store data."
              : "There are no purchases"}
          </Typography>
          <br />
        </>

        {purchases.length > 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant='body3'>Products Sales: </Typography>
              {PieChart}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant='body3'>
                Total Purchases By Customers:
              </Typography>
              {BarChart}
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography variant='body3'>Timeline Purchases: </Typography>
              {LineChart}
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
