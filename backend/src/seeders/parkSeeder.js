import fs from 'fs';
import path from 'path';
import { pool } from '../config/database.js';

export const parkSeeder = async() => {
    try {
        // Ambil path file JSON
        const filePath = path.resolve('src/data/parks.json');

        // Baca file JSON
        const rawData = fs.readFileSync(filePath, 'utf8');
        const parksData = JSON.parse(rawData);

        // Hapus data parks sebelumnya (opsional)
        await pool.query('DELETE FROM parks');

        // Reset auto increment
        await pool.query('ALTER TABLE parks AUTO_INCREMENT = 1');

        // Hitung total park yang akan diinsert
        const totalParks = parksData.parks.length;
        console.log(`Sedang mengimpor ${totalParks} taman...`);

        // Loop dan insert ke database
        for (const park of parksData.parks) {
            await pool.query(
                `INSERT INTO parks 
        (name, location, openhours, facilities, description, coordinates, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`, [
                    park.name,
                    park.location,
                    park.openhours,
                    JSON.stringify(park.facilities),
                    park.description,
                    park.coordinates,
                    'active' // Set default status
                ]
            );
        }

        console.log(`✅ Berhasil mengimpor ${totalParks} taman ke database`);
    } catch (error) {
        console.error('❌ Gagal mengimpor taman:', error);
        throw error;
    }
};