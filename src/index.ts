import { ConfigServer } from "./config/ConfigServer";
const configServer = new ConfigServer();
configServer.setUpServer();
require('dotenv').config();