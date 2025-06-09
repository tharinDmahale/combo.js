"use strict";

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import favicon from "serve-favicon";
import Cors from "./Cors.js";

class Configurations {
    static setup(app) {
        const dirname = path.dirname(fileURLToPath(import.meta.url));
        const clientUrl = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.CLIENT_PORT}`;
        const cors = Cors.getCors(clientUrl);

        app.use(cors);

        app.use(express.static(path.join(dirname, "../public")));

        app.use(favicon(path.join(dirname, "../public/favicon.ico")));

        app.use((req, res, next) => {
            res.setHeader("X-Favicon", "/favicon.ico");
            next();
        });

        app.use("/scripts", express.static(path.join(dirname, "../scripts")));
        
        app.use("/styles", express.static(path.join(dirname, "../styles")));

        return clientUrl;
    }
}

export default Configurations;