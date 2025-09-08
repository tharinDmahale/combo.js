"use strict";

import Utilities from "../../utilities/Utilities";

class Home {
    static getPath() {
        return "/";
    }

    static getBody(req, res) {
        let responseCode = null;
        let responseBody = null;

        try {
            const memoryUsage = process.memoryUsage();
            const cpuUsage = process.cpuUsage();
            const uptime = process.uptime();

            responseCode = 200;
            responseBody = {
                serverStatus: "running",
                serverTime: new Date().toISOString(),
                serverPerformance: {
                    memoryUsage: {
                        rss: memoryUsage.rss, // Resident Set Size
                        heapTotal: memoryUsage.heapTotal,
                        heapUsed: memoryUsage.heapUsed,
                        external: memoryUsage.external,
                    },
                    cpuUsage: {
                        user: cpuUsage.user, // Microseconds spent in user mode
                        system: cpuUsage.system, // Microseconds spent in system mode
                    },
                    uptime: `${uptime} seconds`,
                },
            };

        } catch (error) {
            Utilities.logError(`Error in Home service!\n${error}`);

            responseCode = 500;
            responseBody = {
                error: "Something went wrong!",
                details: error.message
            };
        }

        res.status(responseCode).json(responseBody);
        return responseCode;
    }
}

export default Home;