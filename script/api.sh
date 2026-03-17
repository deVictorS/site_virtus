#!/bin/bash

# ===== CONFIG =====
TOKEN="3c8c0a056612bdf409d2c634b844a2c1a22ab459"
PROJECT_KEY="deVictorS_site_virtus"
OUTPUT="sonar-issues.json"

SEVERITIES="BLOCKER,CRITICAL,MAJOR"
TYPES="BUG,VULNERABILITY,CODE_SMELL"

PAGE=1
PAGE_SIZE=500
TOTAL=1

echo "Exportando issues do SonarCloud..."

# cria arquivo vazio
echo "[]" > "$OUTPUT"

while [ $(( (PAGE - 1) * PAGE_SIZE )) -lt $TOTAL ]; do
  echo "Página $PAGE..."

  RESPONSE=$(curl -s -u "$TOKEN:" \
    "https://sonarcloud.io/api/issues/search?componentKeys=$PROJECT_KEY&resolved=false&ps=$PAGE_SIZE&p=$PAGE&severities=$SEVERITIES&types=$TYPES")

  TOTAL=$(echo "$RESPONSE" | jq '.total')

  # extrai e simplifica os campos importantes
  PAGE_ISSUES=$(echo "$RESPONSE" | jq '[.issues[] | {
    key,
    rule,
    severity,
    type,
    message,
    component,
    line
  }]')

  # junta com o arquivo final
  jq -s 'add' "$OUTPUT" <(echo "$PAGE_ISSUES") > tmp.json && mv tmp.json "$OUTPUT"

  PAGE=$((PAGE + 1))
done

echo "Export finalizado: $OUTPUT"