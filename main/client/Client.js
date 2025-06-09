"use strict";

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import favicon from "serve-favicon";
import Cors from "./middleware/Cors.js";
import Router from "./middleware/Router.js";
import Configurations from "./middleware/Configurations.js";

class Client {
    static #dirname = path.dirname(fileURLToPath(import.meta.url));

    static async start() {
        const app = express();
        const protocol = process.env.PROTOCOL;
        const host = process.env.HOST;
        const port = process.env.CLIENT_PORT;
        const cors = Cors.getCors(protocol, host, port);
        const staticObjects = express.static(path.join(Client.#dirname, "./public"));
        const faviconObject = favicon(path.join(Client.#dirname, "./public/favicon.ico"));
        const scripts = express.static(path.join(Client.#dirname, "./scripts"));
        const styles = express.static(path.join(Client.#dirname, "./styles"));

        Configurations.setup(app, cors, staticObjects, faviconObject, scripts, styles);
        Router.initialize(app);

        app.listen(port, host, () => {
            console.info(`Client is running at ${protocol}://${host}:${port}`);
        });
    }
}

export default Client;