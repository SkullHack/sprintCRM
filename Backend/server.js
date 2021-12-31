const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const stageRoutes = require("./routes/stages");
const clientsRoute = require("./routes/clients");
const projectsRoutes = require("./routes/projects");
const ganttDataRoutes = require("./routes/ganttData");
const consultsRoutes = require("./routes/consults");
const userRoutes = require("./routes/users");
const employeeRoutes = require("./routes/employees");



require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/auth/stages", stageRoutes);

app.use("/api/auth/clients", clientsRoute);
app.use("/Backend/uploads", express.static("uploads"));
app.use("/api/projects", projectsRoutes);
app.use("/", ganttDataRoutes);
app.use("/api/auth/consults", consultsRoutes);
app.use("/users", userRoutes);
app.use("/employees", employeeRoutes);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongodeesDb database connection established successfully!");
});

const userRouter = require("./routes/users");
const employeeRouter = require("./routes/employees");
const clientRouter = require("./routes/clients");
const stageRouter = require("./routes/stages");
const ticketRouter = require("./routes/tickets");
const consultRouter = require("./routes/consults");
const clientViewRouter = require("./routes/clientView");
//config for chat
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

app.use("/users", userRouter);
app.use("/employees", employeeRouter);
app.use("/clients", clientRouter);
app.use("/stages", stageRouter);
app.use("/tickets", ticketRouter);
app.use("/consults", consultRouter);
app.use("/client", clientViewRouter);
//config for chat
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
