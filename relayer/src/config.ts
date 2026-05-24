/**
 * DarkDrop V4 — Relayer Configuration
 */

const feeRateBps = parseInt(process.env.FEE_RATE_BPS || "50");
if (feeRateBps < 0 || feeRateBps > 500) {
  throw new Error(`FEE_RATE_BPS=${feeRateBps} out of bounds (0-500). Refusing to start.`);
}

export const config = {
  // Solana RPC
  rpcUrl: process.env.RPC_URL || "https://api.devnet.solana.com",

  // Relayer keypair path (fee payer)
  keypairPath:
    process.env.RELAYER_KEYPAIR || "~/.config/solana/relayer.json",

  // SOL program ID. Defaults to the live program. For testing the new binary's
  // SOL behavior against the test program, set SOL_PROGRAM_ID=8b8JX1nh...
  // before starting the relayer. DO NOT commit a non-default override.
  programId:
    process.env.SOL_PROGRAM_ID || "GSig1QYVwPVhHF6oVEwhadAwdWjTqtq6H5cSMEkfAgkU",

  // SPL routes target the test program until the live program is upgraded
  // with USDC support. SOL routes continue to use `programId` above.
  splProgramId:
    process.env.TEST_PROGRAM_ID || "8b8JX1nhcG5UryRUE6Zm85LLcTA6PjquEkUVwWRV6Rrn",

  // Relay fee: percentage of claim amount (basis points, 100 = 1%, max 500 = 5%)
  feeRateBps,

  // Allowed frontend origin for CORS (CORS_ORIGIN must be set in production)
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",

  // Server port
  port: parseInt(process.env.PORT || "3001"),

  // Rate limiting
  rateLimit: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10, // per IP per window
  },

  // Max claim amount the relayer will process (in lamports)
  maxClaimAmount: BigInt(process.env.MAX_CLAIM || "100000000000"), // 100 SOL
};
