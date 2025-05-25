"use strict";

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import favicon from "serve-favicon";
import Cors from "./middleware/Cors.js";
import Router from "./middleware/Router.js";

class Client {
    static #dirname = path.dirname(fileURLToPath(import.meta.url));

    static async start() {
        const app = express();
        const protocol = process.env.PROTOCOL;
        const host = process.env.HOST;
        const port = process.env.CLIENT_PORT;

        app.use(Cors.getCors(protocol, host, port));

        app.use(express.static(path.join(Client.#dirname, "./public")));
        app.use(favicon(path.join(Client.#dirname, "./public/favicon.ico")));
        app.use((req, res, next) => {
            res.setHeader("X-Favicon", "/favicon.ico");
            next();
        });

        app.use("/scripts", express.static(path.join(Client.#dirname, "./scripts")));
        app.use("/styles", express.static(path.join(Client.#dirname, "./styles")));

        Router.initialize(app);

        app.listen(port, host, () => {
            console.info(`Client is running at ${protocol}://${host}:${port}`);
        });
    }
}

export default Client;