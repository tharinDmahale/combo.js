"use strict";

import path from "path";
import { fileURLToPath } from "url";

class Router {
    static #dirname = path.dirname(fileURLToPath(import.meta.url));

    static initialize(app) {
        app.get("/", (req, res) => {
            res.sendFile(path.join(Router.#dirname, "../public/Home.html"));
        });
    }
}

export default Router;