"use strict";

class Cors {
    static getCors(protocol, host, port) {
        return {
            origin: {
                header: "Access-Control-Allow-Origin",
                value: `${protocol}://${host}:${port}`
            },
            methods: {
                header: "Access-Control-Allow-Methods",
                value: "GET, POST, PUT, DELETE, OPTIONS"
            },
            headers: {
                header: "Access-Control-Allow-Headers",
                value: "Content-Type, Authorization"
            },
            credentials: {
                header: "Access-Control-Allow-Credentials",
                value: "true"
            }
        };
    }
}

export default Cors;