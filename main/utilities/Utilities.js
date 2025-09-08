"use strict";

import chalk from "chalk";

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
}

export default Utilities;