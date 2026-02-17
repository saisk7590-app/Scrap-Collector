const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ✅ ALLOW BROWSER REQUESTS
app.use(cors());

// ✅ PARSE JSON
app.use(express.json());

// ✅ ROUTES
app.use("/api/auth", require("./routes/authRoutes"));

// ✅ DB CHECK
const pool = require("./config/db");
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("DB error", err);
  } else {
    console.log("DB time:", res.rows[0]);
  }
});

// ✅ START SERVER
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
