import { app, ConfigServer } from "./config/ConfigServer";
import HtppFilter from "./core/filter/HtppFilter";
const configServer = new ConfigServer();
configServer.setUpServer();
require('dotenv').config();

app.use(HtppFilter)