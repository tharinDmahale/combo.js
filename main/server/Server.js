"use strict";

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import favicon from "serve-favicon";
import Cors from "./middleware/Cors.js";
import Router from "./middleware/Router.js";
import Configurations from "./middleware/Configurations.js";

class Server {
    static #dirname = path.dirname(fileURLToPath(import.meta.url));

    static async start() {
        const app = express();
        const protocol = process.env.PROTOCOL;
        const host = process.env.HOST;
        const serverPort = process.env.SERVER_PORT;
        const clientPort = process.env.CLIENT_PORT;
        const cors = Cors.getCors(protocol, host, clientPort);
        const format = express.json();
        const staticObjects = express.static(path.join(Server.#dirname, "./public"));
        const faviconObject = favicon(path.join(Server.#dirname, "./public/favicon.ico"));

        Configurations.setup(app, format, cors, staticObjects, faviconObject);
        Router.initialize(app);

        app.listen(serverPort, host, () => {
            console.info(`Server is running at ${protocol}://${host}:${serverPort}`);
        });
    }
}

export default Server;