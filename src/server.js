const express = require("express");
const orderRoutes = require("./router/orderRoutes");




const app = express();

app.use(express.json());
app.use(orderRoutes);


app.listen(3000, () => {
  console.log("API rodando na porta 3000");
});