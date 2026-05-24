use anchor_lang::prelude::*;
use anchor_spl::token::Mint;
use crate::state::*;

/// Register a new SPL mint with the program.
///
/// Creates a `MintConfig` PDA keyed by the mint. Tree, note-pool tree, and
/// mint-vault pubkeys are placeholders (`Pubkey::default()`) — they are set
/// by a later instruction so this one stays small and easy to audit.
///
/// Authority-gated via `has_one = authority` on the Vault PDA.
pub fn handle_initialize_mint_config(ctx: Context<InitializeMintConfig>) -> Result<()> {
    let mint_config = &mut ctx.accounts.mint_config;
    mint_config.bump = ctx.bumps.mint_config;
    mint_config.mint = ctx.accounts.mint.key();
    mint_config.registered_at = Clock::get()?.unix_timestamp;
    mint_config.merkle_tree = Pubkey::default();
    mint_config.note_pool_tree = Pubkey::default();
    mint_config.mint_vault = Pubkey::default();
    mint_config.total_deposited = 0;
    mint_config.total_withdrawn = 0;
    mint_config.paused = false;

    msg!("MintConfig registered for mint {}", mint_config.mint);
    Ok(())
}

#[derive(Accounts)]
pub struct InitializeMintConfig<'info> {
    #[account(
        seeds = [b"vault"],
        bump = vault.bump,
        has_one = authority,
    )]
    pub vault: Account<'info, Vault>,

    #[account(
        init,
        payer = authority,
        space = MintConfig::SIZE,
        seeds = [b"mint_config", mint.key().as_ref()],
        bump,
    )]
    pub mint_config: Account<'info, MintConfig>,

    pub mint: Account<'info, Mint>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
