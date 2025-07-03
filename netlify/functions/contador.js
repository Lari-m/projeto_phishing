const fs = require('fs');
const path = require('path');

// Caminho para a pasta .data na mesma pasta da função
const DATA_DIR = path.join(__dirname, '.data');
const DB_PATH = path.join(DATA_DIR, 'contador.json');

// Cria o diretório .data se não existir
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

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
