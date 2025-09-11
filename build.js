#!/usr/bin/env node
import shell from "shelljs";
import fs from "fs";
import path from "path";
import archiver from "archiver";

const EXTENSION_NAME = "linkding";
const DIST_DIR = "dist";
const MANIFEST_FILE = "manifest.json";
const INCLUDE_ITEMS = ["manifest.json", "build", "icons", "options", "popup", "styles"];

const browser = process.argv[2] || "firefox";
const browserManifestFile = `manifest.${browser}.json`;

shell.echo(`
==========================
Installing dependencies...
==========================`);
if (shell.exec("npm install").code !== 0) {
  shell.exit(1);
}

shell.echo(`
========================
Copying manifest.json...
========================`);
if (!fs.existsSync(browserManifestFile)) {
  shell.echo(`Error: ${browserManifestFile} not found.`);
  shell.exit(1);
}
shell.cp(browserManifestFile, MANIFEST_FILE);

shell.echo(`
=======================
Running rollup build...
=======================`);
if (shell.exec("npm run build").code !== 0) {
  shell.exit(1);
}

shell.mkdir("-p", DIST_DIR);

// Find version
if (!fs.existsSync(MANIFEST_FILE)) {
  shell.echo(`Error: ${MANIFEST_FILE} not found.`);
  shell.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, "utf8"));
const version = manifest.version;
if (!version) {
  shell.echo("Error: Could not extract version from manifest.");
  shell.exit(1);
}

// Archive

shell.echo(`
===================
Creating archive...
===================`);
const zipFile = path.join(DIST_DIR, `${EXTENSION_NAME}-${version}-${browser}.zip`);

shell.echo(`Packaging extension version ${version}-${browser} into ${zipFile}...`);

const output = fs.createWriteStream(zipFile);
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => {
  shell.echo(`✓ Done! ${archive.pointer()} total bytes written.`);
});
archive.on("error", (err) => {
  throw err;
});
archive.pipe(output);

for (const item of INCLUDE_ITEMS) {
  if (fs.existsSync(item)) {
    const stats = fs.statSync(item);
    if (stats.isDirectory()) {
      archive.directory(item, item);
    } else {
      archive.file(item, { name: item });
    }
  }
}

archive.finalize();
