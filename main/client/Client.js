"use strict";

import express from "express";
import Router from "./middleware/Router.js";
import Configurations from "./middleware/Configurations.js";

class Client {
    static async start() {
        const app = express();
        const clientUrl = Configurations.setup(app);
        Router.initialize(app);

        app.listen(process.env.CLIENT_PORT, process.env.HOST, () => {
            console.info(`Client is running at ${clientUrl}`);
        });
    }
}

export default Client;