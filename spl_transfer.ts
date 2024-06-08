import { Connection, clusterApiUrl, Keypair } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token';
import * as fs from 'fs';

// Leggi la chiave privata del wallet mittente dal file
const senderSecretKeyString = fs.readFileSync('wallet.json', 'utf8');
const senderSecretKey = Uint8Array.from(JSON.parse(senderSecretKeyString));
const sender = Keypair.fromSecretKey(senderSecretKey);

// Genera un nuovo wallet ricevente
const receiver = Keypair.generate();

// Salva la chiave privata del ricevente in un file
const receiverSecretKey = JSON.stringify(Array.from(receiver.secretKey));
fs.writeFileSync('receiver_wallet.json', receiverSecretKey);

// Leggi l'indirizzo del mint dal file
const mintAddress = fs.readFileSync('mint.json', 'utf8');

// Crea una connessione alla rete devnet
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

(async () => {
    // Ottieni o crea un account associato per il mittente
    const senderTokenAccount = await getOrCreateAssociatedTokenAccount(connection, sender, mintAddress, sender.publicKey);

    // Ottieni o crea un account associato per il ricevente
    const receiverTokenAccount = await getOrCreateAssociatedTokenAccount(connection, sender, mintAddress, receiver.publicKey);

    // Trasferisci i token
    const signature = await transfer(connection, sender, senderTokenAccount.address, receiverTokenAccount.address, sender.publicKey, 500);

    console.log('Transferred 500 tokens. Transaction signature:', signature);
    console.log('Receiver Public Key:', receiver.publicKey.toBase58());
})();
