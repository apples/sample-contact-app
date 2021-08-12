import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

export function makeSalt() {
    return randomBytes(16).toString('hex'); 
}

export function hash(password: string, salt: string) {
    return pbkdf2Sync(password, salt, 1000, 64, 'sha512');
}

export function validatePassword(password: string, password_hash: string, password_salt: string) {
    const newHash = hash(password, password_salt);
    const existingHash = Buffer.from(password_hash, 'hex');

    return timingSafeEqual(newHash, existingHash);
}
