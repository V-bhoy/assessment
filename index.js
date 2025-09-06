import "dotenv/config.js";
import express from "express";
import knex from "knex";

const app = express();
app.use(express.json());

const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

export {
  app,
  db,
};
