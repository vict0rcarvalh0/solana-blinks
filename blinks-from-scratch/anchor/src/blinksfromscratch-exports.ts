// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import BlinksfromscratchIDL from '../target/idl/blinksfromscratch.json'
import type { Blinksfromscratch } from '../target/types/blinksfromscratch'

// Re-export the generated IDL and type
export { Blinksfromscratch, BlinksfromscratchIDL }

// The programId is imported from the program IDL.
export const BLINKSFROMSCRATCH_PROGRAM_ID = new PublicKey(BlinksfromscratchIDL.address)

// This is a helper function to get the Blinksfromscratch Anchor program.
export function getBlinksfromscratchProgram(provider: AnchorProvider) {
  return new Program(BlinksfromscratchIDL as Blinksfromscratch, provider)
}

// This is a helper function to get the program ID for the Blinksfromscratch program depending on the cluster.
export function getBlinksfromscratchProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Blinksfromscratch program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return BLINKSFROMSCRATCH_PROGRAM_ID
  }
}
