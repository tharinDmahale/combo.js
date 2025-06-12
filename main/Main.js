"use strict";

import { exec } from "child_process";
import Server from "./server/Server.js";
import Client from "./client/Client.js";

class Main {
    static #combo() {
        console.log(`
        ||     ___   __    _  _   ___     __     ||
        ||    |     |  |  | \\/ |  |__|   |  |    ||
        ||    |___  |__|  |    |  |___|  |__|    ||
        ||                                       ||
        `);
    }

    static async #wait(time) {
        return new Promise(resolve => setTimeout(resolve, (time * 1000)));
    }

    static async #shutdown() {
        console.info("\nShutting down combo.js...");

        await Client.stop();
        await Server.stop();

        console.info(`Process {PID:${process.pid}} terminated.`);
        process.exit(0);
    }

    static async main() {
        Main.#combo();
        console.info(`\nProcess {PID:${process.pid}} started.\nInitializing combo.js...`);

        console.info("\nStarting server...");
        await Main.#wait(2);
        await Server.start();

        await Main.#wait(2);

        console.info("\nStarting client...");
        await Main.#wait(2);
        await Client.start();

        await Main.#wait(2);
        console.info("\nInitialization complete.\nTo exit, please press Ctrl+C.");

        await Main.#wait(2);
        exec("start http://localhost:3001/");

        process.on("SIGINT", Main.#shutdown);
        process.on("SIGTERM", Main.#shutdown);
    }
}

export default Main;