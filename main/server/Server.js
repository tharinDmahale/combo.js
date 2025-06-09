"use strict";

import express from "express";
import Router from "./middleware/Router.js";
import Configurations from "./middleware/Configurations.js";

class Server {
    static async start() {
        const app = express();
        Configurations.setup(app);

        Router.initialize(app);

        app.listen(process.env.SERVER_PORT, process.env.HOST, () => {
            console.info(`Server is running at ${process.env.PROTOCOL}://${process.env.HOST}:${process.env.SERVER_PORT}`);
        });
    }
}

export default Server;