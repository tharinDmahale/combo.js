"use strict";

import { exec } from "child_process";
import Utilities from "./utilities/Utilities.js";
import Server from "./server/Server.js";
import Client from "./client/Client.js";

class Main {
    static async #shutdown() {
        Utilities.logInfo("\nShutting down combo.js...");

        await Client.stop();
        await Server.stop();

        Utilities.logInfo(`Process {PID:${process.pid}} terminated.`);
        process.exit(0);
    }

    static async main() {
        Utilities.combo();
        Utilities.logInfo(`\nProcess {PID:${process.pid}} started.\nInitializing combo.js...`);

        Utilities.logInfo("\nStarting server...");
        await Utilities.wait(2);
        await Server.start();

        await Utilities.wait(2);

        Utilities.logInfo("\nStarting client...");
        await Utilities.wait(2);
        await Client.start();

        await Utilities.wait(2);
        Utilities.logSuccess("\nInitialization complete.");
        Utilities.logInfo("To exit, please press Ctrl+C.");

        await Utilities.wait(2);
        exec("start http://localhost:3001/");

        process.on("SIGINT", Main.#shutdown);
        process.on("SIGTERM", Main.#shutdown);
    }
}

export default Main;