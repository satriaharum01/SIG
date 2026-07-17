import app from "./app.js";
import env from "./config/env.js";
import pool from "./config/database.js";

async function start() {

    try {

        const conn = await pool.getConnection();

        console.log("===================================");

        console.log("MySQL Connected");

        console.log("===================================");

        conn.release();

        app.listen(env.PORT, () => {

            console.log(`Server : http://localhost:${env.PORT}`);

        });

    } catch (err) {

        console.error(err);

    }

}

start();