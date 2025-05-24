"use strict";

import Server from "./server/Server.js";
import Client from "./client/Client.js";

class Main {
    static async main() {
        console.info("Welcome to combo.js!");

        await Server.start();
        await Client.start();
    }
}

export default Main;