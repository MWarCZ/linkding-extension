#!/usr/bin/env node
import shell from "shelljs";
import fs from "fs";

// Files and directories to always remove
const TARGETS = ["manifest.json", "dist", "build"];

// Remove standard targets
for (const item of TARGETS) {
  if (fs.existsSync(item)) {
    shell.echo(`Removing ${item}...`);
    shell.rm("-rf", item);
  }
}

// Remove node_modules if --all specified
if (process.argv.includes("--all")) {
  if (fs.existsSync("node_modules")) {
    shell.echo("Removing node_modules...");
    shell.rm("-rf", "node_modules");
  }
}

shell.echo("✓ Clean done!");
