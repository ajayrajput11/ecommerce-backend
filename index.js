const express = require('express');
const dotenv = require('dotenv');
const {connectDB} = require('./config/db');
const {router:admineoute} = require("./routes/adminroute")
const {router:categoryroute} = require("./routes/categoryroute")
const {router:orderroute} = require("./routes/orderroute")
const {router:userrouter} = require("./routes/userrouter")    
const {router:productroute} = require("./routes/productroute")
const {router:wishlistrouter} = require("./routes/wishlistrouter")
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


connectDB()


app.use("/api/admin",admineoute)
app.use("/api/categories",categoryroute)
app.use("/api/orders",orderroute)
app.use("/api/users",userrouter)
app.use("/api/products",productroute)
app.use("/api/wishlist",wishlistrouter)

app.listen(PORT,()=>{
    console.log(`server is running at Port ${PORT}`);
})

