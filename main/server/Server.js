"use strict";

import express from "express";
import Router from "./middleware/Router.js";
import Configurations from "./middleware/Configurations.js";

class Server {
    static #serverInstance = null;

    static async start() {
        const app = express();
        Configurations.setup(app);

        Router.initialize(app);

        Server.#serverInstance = app.listen(process.env.SERVER_PORT, process.env.HOST, () => {
            console.info(`Server is running at ${process.env.PROTOCOL}://${process.env.HOST}:${process.env.SERVER_PORT}`);
        });
    }

    static async stop() {
        if (Server.#serverInstance) {
            await new Promise(resolve => Server.#serverInstance.close(resolve));
        }
    }
}

export default Server;