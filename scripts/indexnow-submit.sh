#!/usr/bin/env bash
# Submits every URL in sitemap.xml to IndexNow (https://www.indexnow.org/).
# IndexNow is a single ping that Bing and the other participating search
# engines (Yandex, Seznam.cz, Naver...) share, so one submission here reaches
# all of them instead of just Bing.
#
# Run this after publishing a new page or meaningfully changing an existing
# one. The key file at the repo root must already be live on the real site
# (deployed via GitHub Pages) before this will validate -- IndexNow checks
# that <key>.txt is fetchable at https://theministrycpa.com/<key>.txt and
# matches the key submitted here.
#
# Usage: scripts/indexnow-submit.sh

set -euo pipefail

HOST="theministrycpa.com"
KEY_FILE=$(ls "$(dirname "$0")"/../[0-9a-f][0-9a-f][0-9a-f][0-9a-f]*.txt 2>/dev/null | head -n1)

if [ -z "$KEY_FILE" ]; then
  echo "Could not find the IndexNow key file (<32-char-hex>.txt) at the repo root." >&2
  exit 1
fi

KEY=$(cat "$KEY_FILE")
SITEMAP_URL="https://${HOST}/sitemap.xml"

URLS=$(curl -fsSL "$SITEMAP_URL" | grep -oE '<loc>[^<]+</loc>' | sed -E 's#</?loc>##g')

if [ -z "$URLS" ]; then
  echo "No URLs found in $SITEMAP_URL" >&2
  exit 1
fi

URL_LIST_JSON=$(printf '%s\n' "$URLS" | python3 -c '
import json, sys
urls = [line.strip() for line in sys.stdin if line.strip()]
print(json.dumps(urls))
')

PAYLOAD=$(python3 -c "
import json
print(json.dumps({
    'host': '$HOST',
    'key': '$KEY',
    'keyLocation': 'https://${HOST}/${KEY}.txt',
    'urlList': $URL_LIST_JSON,
}))
")

echo "Submitting $(printf '%s\n' "$URLS" | wc -l | tr -d ' ') URLs to IndexNow..."

HTTP_STATUS=$(curl -s -o /tmp/indexnow-response.txt -w "%{http_code}" \
  -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$PAYLOAD")

echo "HTTP $HTTP_STATUS"
cat /tmp/indexnow-response.txt 2>/dev/null || true
echo ""

case "$HTTP_STATUS" in
  200|202) echo "Submitted successfully." ;;
  *) echo "Submission may have failed -- check the status code above." >&2; exit 1 ;;
esac
