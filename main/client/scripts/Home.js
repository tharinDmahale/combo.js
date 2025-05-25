"use strict";

class Home {
    static async loadData() {
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

        if (res.status === 200) {
            const resData = res.data;
            // Server
            document.getElementById("serverStatus").innerText = resData.serverStatus;
            document.getElementById("serverTime").innerText = resData.serverTime;

            // Server performance
            document.getElementById("uptime").innerText = resData.serverPerformance.uptime;

            // Server memory usage
            document.getElementById("memoryRss").innerText = resData.serverPerformance.memoryUsage.rss;
            document.getElementById("memoryHeapTotal").innerText = resData.serverPerformance.memoryUsage.heapTotal;
            document.getElementById("memoryHeapUsed").innerText = resData.serverPerformance.memoryUsage.heapUsed;
            document.getElementById("memoryExternal").innerText = resData.serverPerformance.memoryUsage.external;

            // Server CPU usage
            document.getElementById("cpuUser").innerText = resData.serverPerformance.cpuUsage.user;
            document.getElementById("cpuSystem").innerText = resData.serverPerformance.cpuUsage.system;

            console.info("Server data loaded successfully!");

        } else {
            const errorStateMessage = "Error getting server data!";

            // Server
            document.getElementById("serverStatus").innerText = "The server came across an error!";
            document.getElementById("serverTime").innerText = errorStateMessage;

            // Server performance
            document.getElementById("uptime").innerText = errorStateMessage;

            // Server memory usage
            document.getElementById("memoryRss").innerText = errorStateMessage;
            document.getElementById("memoryHeapTotal").innerText = errorStateMessage;
            document.getElementById("memoryHeapUsed").innerText = errorStateMessage;
            document.getElementById("memoryExternal").innerText = errorStateMessage;

            // Server CPU usage
            document.getElementById("cpuUser").innerText = errorStateMessage;
            document.getElementById("cpuSystem").innerText = errorStateMessage;

            console.error("Error loading server data! ", res.data.error, res.data.details);
        }
    }
}

window.Home = Home;
export default Home;