#!/bin/bash
# Copies the live prototype source into Portfolio's case study.
# Run after any edit to ui_kits/portal/*.jsx so the deployed case study
# stays in sync with the project (source of truth stays in this repo).
set -e

SRC="$(dirname "$0")/ui_kits/portal"
# Portfolio serves the prototypes verbatim out of public/, so the deploy copy
# lives under public/case-medbridge, not at the repo root. The old path here
# predated that move and pointed at Portfolio/case-medbridge, which no longer
# exists: mkdir -p happily created it and every sync since wrote to a
# directory nothing reads, leaving the real deployed copy untouched.
DST="$(dirname "$0")/../../Portfolio/public/case-medbridge/ui_kits/portal"

if [ ! -d "$DST" ]; then
  echo "error: expected deploy copy at $DST, not found. Refusing to create it," >&2
  echo "since a wrong path here silently no-ops the sync. Check the Portfolio layout." >&2
  exit 1
fi

cp "$SRC"/*.jsx "$SRC"/index.html "$DST"/

echo "Synced $(ls "$SRC"/*.jsx "$SRC"/index.html | wc -l | tr -d ' ') files to Portfolio/public/case-medbridge/ui_kits/portal/"
echo "Review with: cd ../../Portfolio && git status public/case-medbridge/"
