import { Connection, clusterApiUrl, Keypair } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import * as fs from 'fs';

// Leggi la chiave privata dal file
const secretKeyString = fs.readFileSync('wallet.json', 'utf8');
const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
const payer = Keypair.fromSecretKey(secretKey);

// Leggi l'indirizzo del mint dal file
const mintAddress = fs.readFileSync('mint.json', 'utf8');

// Crea una connessione alla rete devnet
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

(async () => {
    // Ottieni o crea un account associato per il mint
    const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, payer, mintAddress, payer.publicKey);

    // Mint di token nell'account associato
    const signature = await mintTo(connection, payer, mintAddress, tokenAccount.address, payer, 1000);

    console.log('Minted 1000 tokens. Transaction signature:', signature);
})();
