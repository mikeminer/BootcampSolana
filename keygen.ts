import { Keypair } from '@solana/web3.js';
import * as fs from 'fs';

// Genera una nuova coppia di chiavi
const keypair = Keypair.generate();

// Salva la chiave privata in un file
const secretKey = JSON.stringify(Array.from(keypair.secretKey));
fs.writeFileSync('wallet.json', secretKey);

console.log('New wallet created and saved as wallet.json');
console.log(`Public Key: ${keypair.publicKey.toBase58()}`);
