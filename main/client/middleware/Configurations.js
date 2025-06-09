"use strict";

class Configurations {
    static setup(app, cors, staticObjects, favicon, scripts, styles) {
        app.use(cors);

        app.use(staticObjects);

        app.use(favicon);

        app.use((req, res, next) => {
            res.setHeader("X-Favicon", "/favicon.ico");
            next();
        });

        app.use("/scripts", scripts);
        
        app.use("/styles", styles);
    }
}

export default Configurations;