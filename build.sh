#!/usr/bin/env bash

set -e  # Exit on error

# Variables
EXTENSION_NAME="linkding"
DIST_DIR="dist"
MANIFEST_FILE="manifest.json"
INCLUDE_ITEMS=("manifest.json" "build" "icons" "options" "popup" "styles")

# Detect target browser (default = firefox)
BROWSER="${1:-firefox}"
BROWSER_MANIFEST_FILE="manifest.$BROWSER.json"

# Update dependencies
npm install

# Check for manifest.[browser].json
if [ ! -f "$BROWSER_MANIFEST_FILE" ]; then
    echo "Error: $BROWSER_MANIFEST_FILE not found in the current directory."
    exit 1
fi
cp "$BROWSER_MANIFEST_FILE" "$MANIFEST_FILE"

# Run rollup build
npm run build

# Create dist directory if it doesn't exist
mkdir -p "$DIST_DIR"

# Check for manifest.json
if [ ! -f "$MANIFEST_FILE" ]; then
    echo "Error: $MANIFEST_FILE not found in the current directory."
    exit 1
fi

# Extract version from manifest.json
VERSION=$(grep -o '"version"[[:space:]]*:[[:space:]]*"[^"]*"' "$MANIFEST_FILE" | sed 's/.*: *"//;s/"//')
if [ -z "$VERSION" ]; then
    echo "Error: Could not extract version from $MANIFEST_FILE."
    exit 1
fi

# Define output file
ZIP_FILE="$DIST_DIR/${EXTENSION_NAME}-${VERSION}-${BROWSER}.zip"

# Build the zip
echo "Packaging extension version $VERSION-$BROWSER into $ZIP_FILE..."
zip -r "$ZIP_FILE" "${INCLUDE_ITEMS[@]}"

echo "✅ Done!"
