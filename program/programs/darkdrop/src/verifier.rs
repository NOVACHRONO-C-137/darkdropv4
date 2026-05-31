use anchor_lang::prelude::*;
use groth16_solana::groth16::Groth16Verifier;
use crate::state::ProofData;
use crate::vk;
use crate::errors::DarkDropError;

// The legacy V1 `verify_proof` (6 public inputs, V1 verification key) was
// removed in #18 along with the `claim` instruction it served — the V1
// circuit source was absent and could not be audited. V2/V3 verifiers below
// are unaffected; they reuse the shared alpha/beta/gamma ceremony params.

/// Verify a Groth16 proof against the V2 verification key (5 public inputs).
/// Used by `claim_credit` — amount is private, not a public input.
///
/// Public inputs order (V2):
///   [0] merkle_root
///   [1] nullifier_hash
///   [2] recipient
///   [3] amount_commitment
///   [4] password_hash
pub fn verify_proof_v2(
    proof: &ProofData,
    public_inputs: &[[u8; 32]; 5],
) -> Result<()> {
    let vk = vk::verifying_key_v2();

    let mut verifier = Groth16Verifier::new(
        &proof.proof_a,
        &proof.proof_b,
        &proof.proof_c,
        public_inputs,
        &vk,
    )
    .map_err(|_| DarkDropError::InvalidProof)?;

    verifier
        .verify()
        .map_err(|_| DarkDropError::InvalidProof)?;

    Ok(())
}

/// Verify a Groth16 proof against the V3 verification key (4 public inputs).
/// Used by `claim_from_note_pool` — note pool circuit.
///
/// Public inputs order (V3):
///   [0] pool_merkle_root
///   [1] pool_nullifier_hash
///   [2] new_stored_commitment
///   [3] recipient_hash
pub fn verify_proof_v3(
    proof: &ProofData,
    public_inputs: &[[u8; 32]; 4],
) -> Result<()> {
    let vk = vk::verifying_key_v3();

    let mut verifier = Groth16Verifier::new(
        &proof.proof_a,
        &proof.proof_b,
        &proof.proof_c,
        public_inputs,
        &vk,
    )
    .map_err(|_| DarkDropError::InvalidProof)?;

    verifier
        .verify()
        .map_err(|_| DarkDropError::InvalidProof)?;

    Ok(())
}
