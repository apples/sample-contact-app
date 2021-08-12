import { hash, makeSalt } from "../lib/password";

const pass = process.argv[2];
const salt = makeSalt();
const hashed = hash(pass, salt).toString('hex');

console.log({ pass, salt, hashed });
