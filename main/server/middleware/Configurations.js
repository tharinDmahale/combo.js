"use strict";

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import favicon from "serve-favicon";
import Cors from "./Cors.js";

class Configurations {
    static setup(app) {
        const dirname = path.dirname(fileURLToPath(import.meta.url));
        const cors = Cors.getCors(
            process.env.PROTOCOL, 
            process.env.HOST, 
            process.env.CLIENT_PORT
        );

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

        app.use(express.static(path.join(dirname, "../public")));

        app.use(favicon(path.join(dirname, "../public/favicon.ico")));

        app.use((req, res, next) => {
            res.setHeader("X-Favicon", "/favicon.ico");
            next();
        });

        
    }
}

export default Configurations;