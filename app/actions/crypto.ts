'use server'
import * as crypto from 'crypto';

const algorithm = 'aes-256-cbc';
//TODO: Add secret key to .env file

const key = crypto.scryptSync('your-secret-password', 'salt', 32);
const iv = crypto.randomBytes(16);

// Function to encrypt data
export async function encrypt(text: string): Promise<string> {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}

// Function to decrypt data
export async function decrypt(encryptedText: string): Promise<string> {
    const [ivHex, encrypted] = encryptedText.split(':');
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
