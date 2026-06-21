#!/usr/bin/env bash
set -euo pipefail

root="$(git -C "$(dirname "${BASH_SOURCE[0]}")" rev-parse --show-toplevel)"
set -a; . "$root/config/.env.local"; set +a

user=$DEMO_USER_CLIENT_USERNAME
pass=$DEMO_USER_CLIENT_PASSWORD
if [ "${1:-}" = admin ]; then
  user=$DEMO_USER_ADMIN_USERNAME
  pass=$DEMO_USER_ADMIN_PASSWORD
fi

curl -fsS -X POST "$BASE_URL/api/v1/users/signin" \
  -H 'content-type: application/json' \
  -d "{\"username\":\"$user\",\"password\":\"$pass\"}"
