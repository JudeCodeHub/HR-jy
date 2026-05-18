const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
const port = 3501;
app.use(cors());
app.use(bodyparser.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyparser.json({ limit: "10mb" }));

const EmployeeRoute = require("./Routers/EmployeeRouter");
const AttendenceRoute = require("./Routers/AttendenceRouter");
const PaymentRoute = require("./Routers/PaymentRouter");
const Attendance_record_Router = require("./Routers/Attendance_record_Router");
const Login = require("./Routers/LoginRouter");
const HRroute = require("./Routers/HR_router");
const chatRoutes = require("./Routers/chat");
const Tasks=require("./Routers/TasksRouter")
const location=require("./Routers/LocationRouter")

app.use("/Employee", EmployeeRoute);

app.use("/Attendance", AttendenceRoute);
app.use("/Payment", PaymentRoute);
app.use("/Attendance_record", Attendance_record_Router);
app.use("/login", Login);
app.use("/HR", HRroute);
app.use("/chat", chatRoutes);
app.use("/Tasks",Tasks);
app.use("/location",location);



mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Server is running successfully on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed:", err);
  });
