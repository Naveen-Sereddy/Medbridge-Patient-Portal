#!/bin/bash
# Copies the live prototype source into Portfolio's case study.
# Run after any edit to ui_kits/portal/*.jsx so the deployed case study
# stays in sync with the project (source of truth stays in this repo).
set -e

SRC="$(dirname "$0")/ui_kits/portal"
DST="$(dirname "$0")/../../Portfolio/case-medbridge/ui_kits/portal"

mkdir -p "$DST"
cp "$SRC"/*.jsx "$SRC"/index.html "$DST"/

echo "Synced $(ls "$SRC"/*.jsx "$SRC"/index.html | wc -l | tr -d ' ') files to Portfolio/case-medbridge/ui_kits/portal/"
echo "Review with: cd ../../Portfolio && git status case-medbridge/"
