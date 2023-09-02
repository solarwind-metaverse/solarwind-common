#!/bin/bash

npm run build

# Read the current version from package.json
current_version=$(jq -r '.version' package.json)
echo $current_version

# Increment the last digit of the version
next_version=$(echo $current_version | awk -F. '{$NF = $NF + 1;} 1' OFS=. )
echo $next_version

# Update the version in package.json
jq --arg next_version "$next_version" '.version = $next_version' package.json > tmp.json && mv tmp.json package.json
echo "Updated to $next_version"

# Update the version in dependencies of another package
jq --arg next_version "$next_version" '.dependencies."solarwind-common" = $next_version' ../solarwind-backend/package.json > tmp.json && mv tmp.json ../solarwind-backend/package.json

# Update the version in dependencies of another package
jq --arg next_version "$next_version" '.dependencies."solarwind-common" = $next_version' ../solarwind-web/package.json > tmp.json && mv tmp.json ../solarwind-web/package.json

# Update the version in dependencies of another package
jq --arg next_version "$next_version" '.dependencies."solarwind-common" = $next_version' ../auth-server/package.json > tmp.json && mv tmp.json ../auth-server/package.json
