#!/usr/bin/env bash
# Builds the client preview for GitHub Pages and pushes it to the gh-pages branch.
# Live at https://moathalgunimi17-svg.github.io/nooma/ (noindex: not nooma.om).
set -euo pipefail
cd "$(dirname "$0")/.."
export MSYS_NO_PATHCONV=1 MSYS2_ARG_CONV_EXCL='*'   # stop Git Bash rewriting /nooma/ into a Windows path
export SITE_URL=https://moathalgunimi17-svg.github.io BASE_PATH=/nooma/
find src -iname desktop.ini -delete
npm run build
node tools/check-links.mjs > /dev/null
touch dist/.nojekyll                                 # keep Pages from hiding the _astro/ folder
remote=$(git remote get-url origin)
cd dist
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.name="$(cd .. && git config user.name)" -c user.email="$(cd .. && git config user.email)" \
  commit -q -m "Preview build $(date -u +%Y-%m-%dT%H:%MZ)"
git push -q -f "$remote" gh-pages
rm -rf .git
echo "Pushed. Live in ~1 min at https://moathalgunimi17-svg.github.io/nooma/"
