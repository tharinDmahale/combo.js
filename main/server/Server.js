"use strict";

import express from "express";

class Server {
    static async start() {
        const app = express();
        const protocol = process.env.PROTOCOL;
        const host = process.env.HOST;
        const port = process.env.SERVER_PORT;

        app.listen(port, host, () => {
            console.info(`Server is running at ${protocol}://${host}:${port}`);
        });
    }
}

export default Server;