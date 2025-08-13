const fs = require("fs");
const path = require("path");

function filePath(file) {
  return path.join(__dirname, "../data", file);
}

function readJSON(file, fallback = []) {
  try {
    const p = filePath(file);
    if (!fs.existsSync(p)) return fallback;
    const raw = fs.readFileSync(p, "utf8") || "";
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error("readJSON error", file, e);
    return fallback;
  }
}

function writeJSON(file, data) {
  const p = filePath(file);
  fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf8");
}

module.exports = { readJSON, writeJSON };
