// pull sensitive data from .env
require("dotenv").config();

// export data to other files
exports.password = {
    key: process.env.OMDB_key,
    sql: process.env.SQL
}