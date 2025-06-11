"use strict";

import Server from "./server/Server.js";
import Client from "./client/Client.js";

class Main {
    static async #wait(time) {
        return new Promise(resolve => setTimeout(resolve, (time * 1000)));
    }

    static async #setupGracefulShutdown() {
        const shutdown = async () => {
            console.info("\nShutting down combo.js...");

            if (Client.stop) {
                await Client.stop();
            }

            if (Server.stop) {
                await Server.stop();
            }

            console.info("Runtime terminated\n");
            process.exit(0);
        };

        process.on("SIGINT", shutdown);
        process.on("SIGTERM", shutdown);
    }

    static async main() {
        console.info("\nInitializing combo.js...");

        console.info("\nStarting server...");
        await Main.#wait(2);
        await Server.start();

        await Main.#wait(2);

        console.info("\nStarting client...");
        await Main.#wait(2);
        await Client.start();

        await Main.#wait(2);
        console.info("\nInitialization complete.\nTo exit, please press Ctrl+C.");

        Main.#setupGracefulShutdown();
    }
}

export default Main;