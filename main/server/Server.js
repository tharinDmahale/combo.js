"use strict";

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import favicon from "serve-favicon";
import Cors from "./middleware/Cors.js";

class Server {
    static #dirname = path.dirname(fileURLToPath(import.meta.url));

    static async start() {
        const app = express();
        const protocol = process.env.PROTOCOL;
        const host = process.env.HOST;
        const port = process.env.SERVER_PORT;
        const cors = Cors.getCors(protocol, host, port);

        app.use(express.json());

        app.use((req, res, next) => {
            res.setHeader(cors.origin.header, cors.origin.value);
            res.setHeader(cors.methods.header, cors.methods.value);
            res.setHeader(cors.headers.header, cors.headers.value);
            res.setHeader(cors.credentials.header, cors.credentials.value);

            if (req.method === "OPTIONS") {
                res.sendStatus(204);

            } else {
                next();
            }
        });

        app.use(express.static(path.join(Server.#dirname, "./public")));
        app.use(favicon(path.join(Server.#dirname, "./public/favicon.ico")));
        app.use((req, res, next) => {
            res.setHeader("X-Favicon", "/favicon.ico");
            next();
        });

        app.listen(port, host, () => {
            console.info(`Server is running at ${cors.origin.value}`);
        });
    }
}

export default Server;