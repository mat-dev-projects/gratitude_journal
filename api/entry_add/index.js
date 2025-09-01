const { getPool } = require("../db");

module.exports = async function (context, req) {
  const userId = req.headers["x-ms-client-principal-id"];
  const text = req.body && req.body.text;

  if (!userId) {
    context.res = { status: 401, body: { message: "Unauthorized" } };
    return;
  }

  if (!text) {
    context.res = { status: 400, body: { message: "Text is required" } };
    return;
  }

  const pool = await getPool();
  await pool.request()
    .input("user_id", userId)
    .input("text", text)
    .query(`
      IF NOT EXISTS (
        SELECT 1 FROM entries WHERE user_id=@user_id AND date=CAST(GETDATE() AS DATE)
      )
      INSERT INTO entries (user_id, date, text)
      VALUES (@user_id, CAST(GETDATE() AS DATE), @text)
    `);

  context.res = { body: { message: "Gratitude saved!" } };
};
