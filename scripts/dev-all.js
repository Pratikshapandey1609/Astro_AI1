const { spawn } = require("child_process");
const path = require("path");

const root = path.resolve(__dirname, "..");
const node = process.execPath;
const services = [
  { name: "API", args: ["--watch", "backend/src/server.js"] },
  { name: "AI", args: ["--watch", "ai-service/src/server.js"] },
  { name: "WEB", args: ["node_modules/vite/bin/vite.js", "--host", "127.0.0.1", "--port", "5173"] }
];

const children = services.map(({ name, args }) => {
  const child = spawn(node, args, { cwd: root, stdio: "inherit" });
  child.on("exit", (code) => {
    if (code && !isShuttingDown) {
      console.error(`[${name}] exited with code ${code}`);
    }
  });
  return child;
});

let isShuttingDown = false;

function shutdown() {
  if (isShuttingDown) return;
  isShuttingDown = true;
  console.log("\nStopping ASTRO-AI local services...");
  children.forEach((child) => child.kill("SIGINT"));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
