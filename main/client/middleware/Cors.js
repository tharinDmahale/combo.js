"use strict";

import cors from "cors";

class Cors {
    static getCors(clientUrl) {
        return cors({
            origin: clientUrl,
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"]
        });
    }
}

export default Cors;