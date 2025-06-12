"use strict";

class Home {
    static async #getData() {
        const url = `http://localhost:3000/`;
        let res;

        try {
            const result = (await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }));

            if (result.ok) {
                res = {
                    status: result.status,
                    data: (await result.json())
                };

                console.info(`Data fetched successfully from ${url}!`);

            } else {
                console.error(`Error fetching data from ${url}! Status: ${result.status}`);
                res = {
                    status: result.status,
                    data: {}
                };
            }

        } catch (error) {
            res = {
                status: 500,
                data: {
                    error: `Error fetching data from ${url}!`,
                    details: error.message
                }
            }

        }

        return res;
    }

    static async #wait(seconds) {
        await new Promise(resolve => setTimeout(resolve, (seconds * 1000)));
    }

    static #assign(id, value) {
        document.getElementById(id).innerText = value;
    }

    static async #loadData() {
        const res = (await Home.#getData());

        if (res.status === 200) {
            const resData = res.data;

            // Server
            Home.#assign("serverStatus", resData.serverStatus);
            Home.#assign("serverTime", resData.serverTime);

            // Server performance
            Home.#assign("uptime", resData.serverPerformance.uptime);

            // Server memory usage
            Home.#assign("memoryRss", resData.serverPerformance.memoryUsage.rss);
            Home.#assign("memoryHeapTotal", resData.serverPerformance.memoryUsage.heapTotal);
            Home.#assign("memoryHeapUsed", resData.serverPerformance.memoryUsage.heapUsed);
            Home.#assign("memoryExternal", resData.serverPerformance.memoryUsage.external);

            // Server CPU usage
            Home.#assign("cpuUser", resData.serverPerformance.cpuUsage.user);
            Home.#assign("cpuSystem", resData.serverPerformance.cpuUsage.system);

            console.info("Server data loaded successfully!");

        } else {
            const serverShutdownMessage = "_";

            // Server
            Home.#assign("serverStatus", "stopped");
            Home.#assign("serverTime", serverShutdownMessage);

            // Server performance
            Home.#assign("uptime", serverShutdownMessage);

            // Server memory usage
            Home.#assign("memoryRss", serverShutdownMessage);
            Home.#assign("memoryHeapTotal", serverShutdownMessage);
            Home.#assign("memoryHeapUsed", serverShutdownMessage);
            Home.#assign("memoryExternal", serverShutdownMessage);

            // Server CPU usage
            Home.#assign("cpuUser", serverShutdownMessage);
            Home.#assign("cpuSystem", serverShutdownMessage);

            console.error("Error loading server data! ", res.data.error, res.data.details);
        }
    }

    static async streamData() {
        while (true) {
            await Home.#loadData();
            await Home.#wait(1);
        }
    }
}

window.Home = Home;
export default Home;