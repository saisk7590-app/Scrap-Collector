const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ✅ ALLOW BROWSER REQUESTS
app.use(cors());

// ✅ PARSE JSON
app.use(express.json());

// ✅ UNIFIED ROUTES
const routes = require("./src/routes");
app.use("/api", routes);

// ✅ SUPABASE CLIENT CHECK
const supabase = require("./src/config/supabase");
const supabaseUrl = process.env.SUPABASE_URL || 'https://mvdpuuokpdmowbdaedud.supabase.co';

if (supabaseUrl) {
  console.log("✅ Supabase initialized for project:", supabaseUrl);
}

// ✅ START SERVER
const PORT = process.env.PORT || 5000;

// ✅ GLOBAL ERROR HANDLING
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Unified Backend running on port ${PORT}`);
});
