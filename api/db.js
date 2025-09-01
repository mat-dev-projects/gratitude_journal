const sql = require("mssql");

let pool;

async function getPool() {
  if (!pool) {
    pool = await sql.connect(process.env.SQL_CONNECTION_STRING);
  }
  return pool;
}

module.exports = { getPool };
