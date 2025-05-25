"use strict";

import Home from "../service/Home.js";

class Router {
    static initialize(app) {
        app.get(Home.getPath(), Home.getBody);
    }
}

export default Router;