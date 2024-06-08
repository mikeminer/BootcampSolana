import { Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import * as fs from 'fs';

// Leggi la chiave privata dal file
const secretKeyString = fs.readFileSync('wallet.json', 'utf8');
const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
const keypair = Keypair.fromSecretKey(secretKey);

// Crea una connessione alla rete devnet
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Richiedi un airdrop di 1 SOL
connection.requestAirdrop(keypair.publicKey, 1 * LAMPORTS_PER_SOL).then((signature) => {
    console.log('Airdrop request sent. Transaction signature:', signature);
});
