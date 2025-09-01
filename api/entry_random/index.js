const { getPool } = require("../db");

module.exports = async function (context, req) {
  const userId = req.headers["x-ms-client-principal-id"];
  if (!userId) {
    context.res = { status: 401, body: { message: "Unauthorized" } };
    return;
  }

  const pool = await getPool();
  const result = await pool.request()
    .input("user_id", userId)
    .query(`
      SELECT TOP 1 text, date 
      FROM entries 
      WHERE user_id=@user_id AND date < CAST(GETDATE() AS DATE)
      ORDER BY NEWID()
    `);

  context.res = { body: result.recordset[0] || {} };
};
