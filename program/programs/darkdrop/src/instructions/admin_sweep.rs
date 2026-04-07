use anchor_lang::prelude::*;
use crate::state::*;
use crate::errors::DarkDropError;

/// Admin sweep: transfer SOL from treasury to the vault authority wallet,
/// minus the rent-exempt minimum. Only callable by the vault authority.
/// Used for recovering stuck funds and maintenance.
pub fn handle_admin_sweep(ctx: Context<AdminSweep>) -> Result<()> {
    let treasury = &ctx.accounts.treasury;
    let authority = &ctx.accounts.authority;

    let treasury_lamports = treasury.to_account_info().lamports();
    let rent = Rent::get()?;
    let rent_exempt_min = rent.minimum_balance(Treasury::SIZE);

    let sweep_amount = treasury_lamports
        .checked_sub(rent_exempt_min)
        .ok_or(DarkDropError::InsufficientBalance)?;

    require!(sweep_amount > 0, DarkDropError::ZeroAmount);

    // Direct lamport manipulation — treasury is program-owned
    **treasury.to_account_info().try_borrow_mut_lamports()? -= sweep_amount;
    **authority.to_account_info().try_borrow_mut_lamports()? += sweep_amount;

    msg!("Swept {} lamports to authority", sweep_amount);
    Ok(())
}

#[derive(Accounts)]
pub struct AdminSweep<'info> {
    #[account(
        seeds = [b"vault"],
        bump = vault.bump,
        has_one = authority,
    )]
    pub vault: Account<'info, Vault>,

    #[account(
        mut,
        seeds = [b"treasury"],
        bump = treasury.bump,
    )]
    pub treasury: Account<'info, Treasury>,

    #[account(mut)]
    pub authority: Signer<'info>,
}
