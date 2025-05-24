"use strict";

import express from "express";

class Client {
    static async start() {
        const app = express();
        const protocol = process.env.PROTOCOL;
        const host = process.env.HOST;
        const port = process.env.CLIENT_PORT;

        app.listen(port, host, () => {
            console.info(`Client is running at ${protocol}://${host}:${port}`);
        });
    }
}

export default Client;