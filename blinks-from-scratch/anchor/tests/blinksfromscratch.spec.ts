import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Blinksfromscratch} from '../target/types/blinksfromscratch'

describe('blinksfromscratch', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Blinksfromscratch as Program<Blinksfromscratch>

  const blinksfromscratchKeypair = Keypair.generate()

  it('Initialize Blinksfromscratch', async () => {
    await program.methods
      .initialize()
      .accounts({
        blinksfromscratch: blinksfromscratchKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([blinksfromscratchKeypair])
      .rpc()

    const currentCount = await program.account.blinksfromscratch.fetch(blinksfromscratchKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Blinksfromscratch', async () => {
    await program.methods.increment().accounts({ blinksfromscratch: blinksfromscratchKeypair.publicKey }).rpc()

    const currentCount = await program.account.blinksfromscratch.fetch(blinksfromscratchKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Blinksfromscratch Again', async () => {
    await program.methods.increment().accounts({ blinksfromscratch: blinksfromscratchKeypair.publicKey }).rpc()

    const currentCount = await program.account.blinksfromscratch.fetch(blinksfromscratchKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Blinksfromscratch', async () => {
    await program.methods.decrement().accounts({ blinksfromscratch: blinksfromscratchKeypair.publicKey }).rpc()

    const currentCount = await program.account.blinksfromscratch.fetch(blinksfromscratchKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set blinksfromscratch value', async () => {
    await program.methods.set(42).accounts({ blinksfromscratch: blinksfromscratchKeypair.publicKey }).rpc()

    const currentCount = await program.account.blinksfromscratch.fetch(blinksfromscratchKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the blinksfromscratch account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        blinksfromscratch: blinksfromscratchKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.blinksfromscratch.fetchNullable(blinksfromscratchKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
