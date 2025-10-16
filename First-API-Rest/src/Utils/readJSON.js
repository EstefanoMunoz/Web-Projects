import { readFile } from 'node:fs/promises';

// Refactorizo la función readFile(), porque necesito que retorne Objetos JS sí o sí, y no JSONs (strings).
export async function readJSON(DATA_SOURCE) {
    return JSON.parse(await readFile(DATA_SOURCE, "utf8"));
}