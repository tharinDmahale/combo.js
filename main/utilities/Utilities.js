"use strict";

import chalk from "chalk";
import { exec } from "child_process";

class Utilities {
    static combo() {
        console.log(`
        ||     ___   __    _  _   ___     __     ||
        ||    |     |  |  | \\/ |  |__|   |  |    ||
        ||    |___  |__|  |    |  |___|  |__|    ||
        ||                                       ||
        `);
    }

    static async wait(time) {
        return new Promise(resolve => setTimeout(resolve, (time * 1000)));
    }

    static logError(message) {
        console.error(chalk.red(message));
    }

    static logInfo(message) {
        console.info(chalk.blue(message));
    }

    static logSuccess(message) {
        console.log(chalk.green(message));
    }

    static initBrowser() {
        const url = "http://localhost:3001/";
        let command;
        
        if (process.platform === "win32") {
            command = `start ${url}`;

        } else {
            command = `open ${url}`;
        }

        exec(command);
    }
}

export default Utilities;