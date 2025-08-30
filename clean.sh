#!/usr/bin/env bash

set -e  # Exit on error

# Files and directories to always remove
TARGETS=("manifest.json" "dist" "build")

# Remove standard targets
for item in "${TARGETS[@]}"; do
    if [ -e "$item" ]; then
        echo "Removing $item..."
        rm -rf "$item"
    fi
done

# Remove node_modules if --all specified
if [ "$1" == "--all" ]; then
    if [ -d "node_modules" ]; then
        echo "Removing node_modules..."
        rm -rf node_modules
    fi
fi

echo "✅ Clean done!"
