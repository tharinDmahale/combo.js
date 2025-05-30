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

    static async loadData() {
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
            const errorStateMessage = "Error getting server data!";

            // Server
            Home.#assign("serverStatus", "The server came across an error!");
            Home.#assign("serverTime", errorStateMessage);

            // Server performance
            Home.#assign("uptime", errorStateMessage);

            // Server memory usage
            Home.#assign("memoryRss", errorStateMessage);
            Home.#assign("memoryHeapTotal", errorStateMessage);
            Home.#assign("memoryHeapUsed", errorStateMessage);
            Home.#assign("memoryExternal", errorStateMessage);

            // Server CPU usage
            Home.#assign("cpuUser", errorStateMessage);
            Home.#assign("cpuSystem", errorStateMessage);

            console.error("Error loading server data! ", res.data.error, res.data.details);
        }

        Home.#wait(1);
    }
}

window.Home = Home;
export default Home;