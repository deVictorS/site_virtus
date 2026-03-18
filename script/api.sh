#!/bin/bash

# ===== CONFIG =====
TOKEN="d88f96b43feaceef42e9848a1e3993ffc739a801"
PROJECT_KEY="deVictorS_site_virtus"
OUTPUT="sonar-full.json"

SEVERITIES="BLOCKER,CRITICAL,MAJOR"
TYPES="BUG,VULNERABILITY,CODE_SMELL"

PAGE_SIZE=500

echo "Exportando dados do SonarCloud..."

# ===== ISSUES =====
ISSUES="[]"
PAGE=1
TOTAL=1

while [[ $(( (PAGE - 1) * PAGE_SIZE )) -lt $TOTAL ]]; do
  echo "Issues - página $PAGE..."

  RESPONSE=$(curl -s -u "$TOKEN:" \
    "https://sonarcloud.io/api/issues/search?componentKeys=$PROJECT_KEY&resolved=false&ps=$PAGE_SIZE&p=$PAGE&severities=$SEVERITIES&types=$TYPES")

  TOTAL=$(echo "$RESPONSE" | jq '.total')

  PAGE_DATA=$(echo "$RESPONSE" | jq '[.issues[] | {
    key,
    rule,
    severity,
    type,
    message,
    component,
    line
  }]')

  ISSUES=$(jq -s 'add' <(echo "$ISSUES") <(echo "$PAGE_DATA"))

  PAGE=$((PAGE + 1))
done

# ===== HOTSPOTS =====
HOTSPOTS="[]"
PAGE=1
TOTAL=1

while [[ $(( (PAGE - 1) * PAGE_SIZE )) -lt $TOTAL ]]; do
  echo "Hotspots - página $PAGE..."

  RESPONSE=$(curl -s -u "$TOKEN:" \
    "https://sonarcloud.io/api/hotspots/search?projectKey=$PROJECT_KEY&ps=$PAGE_SIZE&p=$PAGE")

  TOTAL=$(echo "$RESPONSE" | jq '.paging.total')

  PAGE_DATA=$(echo "$RESPONSE" | jq '[.hotspots[] | {
    key,
    component,
    securityCategory,
    vulnerabilityProbability,
    status,
    line,
    message
  }]')

  HOTSPOTS=$(jq -s 'add' <(echo "$HOTSPOTS") <(echo "$PAGE_DATA"))

  PAGE=$((PAGE + 1))
done

# ===== OUTPUT FINAL =====
jq -n \
  --argjson issues "$ISSUES" \
  --argjson hotspots "$HOTSPOTS" \
  '{
    issues: $issues,
    hotspots: $hotspots
  }' > "$OUTPUT"

echo "Arquivo único gerado: $OUTPUT"