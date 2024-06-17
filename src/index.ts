import { io, app, ConfigServer } from "./config/ConfigServer";
import HtppFilter from "./core/filter/HtppFilter";
import socketFilter from "./core/filter/SocketFilter";
import AuthRoute from "./routes/AuthRoute";
const configServer = new ConfigServer();
configServer.setUpServer();
require("dotenv").config();

app.use(HtppFilter);

app.use("/api", AuthRoute);

io.use(socketFilter);
