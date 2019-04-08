require("dotenv").config();

exports.password = {
    key: process.env.OMDB_key,
    sql: process.env.SQL
}