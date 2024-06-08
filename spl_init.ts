import { Connection, clusterApiUrl, Keypair } from '@solana/web3.js';
import { createMint } from '@solana/spl-token';
import * as fs from 'fs';

// Leggi la chiave privata dal file
const secretKeyString = fs.readFileSync('wallet.json', 'utf8');
const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
const payer = Keypair.fromSecretKey(secretKey);

// Crea una connessione alla rete devnet
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

(async () => {
    // Crea un nuovo mint
    const mint = await createMint(connection, payer, payer.publicKey, null, 9);

    // Salva l'indirizzo del mint in un file
    fs.writeFileSync('mint.json', mint.toBase58());

    console.log('Mint created:', mint.toBase58());
})();
