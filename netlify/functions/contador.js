const fs = require('fs');
const path = require('path');

// Arquivo para armazenar o contador
const DB_PATH = path.join(__dirname, '../../.data/contador.json');

// Cria arquivo se não existir
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ total: 0 }));
}

exports.handler = async (event) => {
    try {
        // Lê e atualiza o contador
        const data = JSON.parse(fs.readFileSync(DB_PATH));
        data.total += 1;
        fs.writeFileSync(DB_PATH, JSON.stringify(data));

        return {
            statusCode: 200,
            body: JSON.stringify({ total: data.total })
        };
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
};