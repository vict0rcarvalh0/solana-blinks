#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod blinksfromscratch {
    use super::*;

  pub fn close(_ctx: Context<CloseBlinksfromscratch>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.blinksfromscratch.count = ctx.accounts.blinksfromscratch.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.blinksfromscratch.count = ctx.accounts.blinksfromscratch.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeBlinksfromscratch>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.blinksfromscratch.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeBlinksfromscratch<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Blinksfromscratch::INIT_SPACE,
  payer = payer
  )]
  pub blinksfromscratch: Account<'info, Blinksfromscratch>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseBlinksfromscratch<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub blinksfromscratch: Account<'info, Blinksfromscratch>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub blinksfromscratch: Account<'info, Blinksfromscratch>,
}

#[account]
#[derive(InitSpace)]
pub struct Blinksfromscratch {
  count: u8,
}
