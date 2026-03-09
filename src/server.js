const express = require("express");
const orderRoutes = require("./router/orderRoutes");
const authRoutes = require("./router/authRoutes")
const errorHandler = require("./middleware/errorHandler")




const app = express();

app.use(express.json());
app.use(authRoutes)
app.use(orderRoutes);

app.use(errorHandler)


app.listen(3000, () => {
  console.log("API rodando na porta 3000");
});