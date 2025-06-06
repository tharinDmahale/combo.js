"use strict";

class Configurations {
    static setup(app, format, cors, staticObjects, favicon) {
        app.use(format);

        app.use((req, res, next) => {
            res.setHeader(cors.origin.header, cors.origin.value);
            res.setHeader(cors.methods.header, cors.methods.value);
            res.setHeader(cors.headers.header, cors.headers.value);
            res.setHeader(cors.credentials.header, cors.credentials.value);

            if (req.method === "OPTIONS") {
                res.sendStatus(204);

            } else {
                next();
            }
        });

        app.use(staticObjects);

        app.use(favicon);

        app.use((req, res, next) => {
            res.setHeader("X-Favicon", "/favicon.ico");
            next();
        });
    }
}

export default Configurations;