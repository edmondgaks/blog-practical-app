import mysql from "mysql"

export const db = mysql.createConnection({
  host:"localhost",
  user:"edmondgaks",
  password: process.env.DB_KEY,
  database:"blog"
})