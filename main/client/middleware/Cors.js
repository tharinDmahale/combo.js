"use strict";

import cors from "cors";

class Cors {
    static getCors(protocol, host, port) {
        return cors({
            origin: `${protocol}://${host}:${port}`,
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"]
        });
    }
}

export default Cors;