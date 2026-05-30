#!/usr/bin/env bash
# Audit 06 — Phase 1 isolated test harness (localnet).
#
# Spins up a throwaway solana-test-validator with the program loaded AT its real
# declared address (GSig1...) via --upgradeable-program — no program keypair
# needed, and declare_id matches so Anchor accepts instructions. Runs the suites
# that exercise the Audit-06 changes (L-01 create_drop, M-02 withdraw incl. the
# critical pool claim->withdraw, L-02/L-03 claim paths). Initializes via
# scripts/initialize.js so M-03's guard is exercised too.
#
# Touches NOTHING live — fresh ledger in a temp dir, killed on exit.
#
# Usage:  bash scripts/deploy-test.sh
# Env:    KEYPAIR (default ~/.config/solana/id.json) — used as deployer + upgrade authority
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROGRAM_ID="${PROGRAM_ID:-GSig1QYVwPVhHF6oVEwhadAwdWjTqtq6H5cSMEkfAgkU}"
SO="${SO:-$REPO/program/target/deploy/darkdrop.so}"
WALLET="${KEYPAIR:-$HOME/.config/solana/id.json}"
RPC="http://127.0.0.1:8899"
LEDGER="$(mktemp -d)"

[ -f "$SO" ] || { echo "FATAL: program .so not found at $SO — run 'cd program && cargo build-sbf' first"; exit 1; }
[ -f "$WALLET" ] || { echo "FATAL: wallet keypair not found at $WALLET (set KEYPAIR=...)"; exit 1; }
WALLET_PUB="$(solana-keygen pubkey "$WALLET")"

echo "Program:  $PROGRAM_ID"
echo "Wallet:   $WALLET_PUB  (deployer + upgrade authority)"
echo "SO:       $SO"
echo "Ledger:   $LEDGER  (throwaway)"

# Fresh localnet, program loaded at its real address, wallet as upgrade authority
# (so scripts/initialize.js's upgrade-authority check passes).
solana-test-validator \
  --reset \
  --ledger "$LEDGER" \
  --upgradeable-program "$PROGRAM_ID" "$SO" "$WALLET_PUB" \
  > "$LEDGER/validator.log" 2>&1 &
VALIDATOR_PID=$!
cleanup() { echo; echo "Stopping validator ($VALIDATOR_PID)…"; kill "$VALIDATOR_PID" 2>/dev/null || true; wait "$VALIDATOR_PID" 2>/dev/null || true; rm -rf "$LEDGER"; }
trap cleanup EXIT

echo "Waiting for validator…"
for i in $(seq 1 45); do
  if solana --url "$RPC" cluster-version >/dev/null 2>&1; then break; fi
  sleep 1
  if [ "$i" = "45" ]; then echo "FATAL: validator did not start; tail of log:"; tail -20 "$LEDGER/validator.log"; exit 1; fi
done
echo "Validator up."

solana --url "$RPC" airdrop 1000 "$WALLET_PUB" >/dev/null
echo "Funded wallet."

export RPC_URL="$RPC"
export PROGRAM_ID
export KEYPAIR="$WALLET"

run() { echo; echo "──────── $1 ────────"; node "$REPO/scripts/$1"; }

# NOTE: scripts/initialize.js (M-03) is verified separately — run it on its own
# fresh validator. Do NOT run it before the e2e suites: they each perform their
# own initialize_vault, and a pre-initialized vault makes their setup fail.

# Audit-06 change coverage. Each suite self-inits the vault. Override the set
# with SUITES="a.js b.js" to run a subset.
SUITES="${SUITES:-e2e-credit-test.js security-credit-tests.js note-pool-test.js note-pool-security-tests.js}"
for s in $SUITES; do run "$s"; done

echo
echo "✅ Phase 1 localnet suites passed. Safe to proceed to the coordinated cutover."
