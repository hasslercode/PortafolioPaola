/**
 * SERVIDOR TEMPORAL — ELIMINAR AL FINALIZAR REVISIÓN DE CONTENIDOS
 *
 * Sirve el sitio estático y expone POST /api/content para guardar public/content.json.
 * Necesario para que Paola pueda editar y guardar desde el navegador/iPad.
 *
 * Uso: npm start
 * Editor: http://localhost:3000/config
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const CONTENT_FILE = path.join(ROOT, 'public', 'content.json');

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.pdf': 'application/pdf',
    '.xml': 'application/xml',
    '.txt': 'text/plain; charset=utf-8',
    '.ico': 'image/x-icon'
};

function sendJson(res, statusCode, payload) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(payload));
}

function getFilePath(urlPath) {
    if (urlPath === '/' || urlPath === '') {
        return path.join(ROOT, 'index.html');
    }

    if (urlPath === '/config') {
        return 'REDIRECT:/config/';
    }

    if (urlPath === '/config/') {
        return path.join(ROOT, 'config', 'index.html');
    }

    const relative = decodeURIComponent(urlPath).replace(/^\/+/, '');
    const fullPath = path.normalize(path.join(ROOT, relative));

    if (!fullPath.startsWith(ROOT)) {
        return null;
    }

    return fullPath;
}

function serveStatic(req, res) {
    const filePath = getFilePath(req.url.split('?')[0]);

    if (filePath === 'REDIRECT:/config/') {
        res.writeHead(302, { Location: '/config/' });
        res.end();
        return;
    }

    if (!filePath) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Forbidden');
        return;
    }

    fs.readFile(filePath, (error, data) => {
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Not found');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(data);
    });
}

function saveContent(req, res) {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
        if (body.length > 2 * 1024 * 1024) {
            req.destroy();
        }
    });

    req.on('end', () => {
        try {
            const parsed = JSON.parse(body);
            const formatted = JSON.stringify(parsed, null, 2) + '\n';
            fs.writeFileSync(CONTENT_FILE, formatted, 'utf8');
            sendJson(res, 200, { ok: true });
        } catch (error) {
            sendJson(res, 400, { error: 'JSON inválido: ' + error.message });
        }
    });
}

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/api/content') {
        saveContent(req, res);
        return;
    }

    if (req.method === 'GET' || req.method === 'HEAD') {
        serveStatic(req, res);
        return;
    }

    sendJson(res, 405, { error: 'Método no permitido' });
});

server.listen(PORT, () => {
    console.log('Servidor temporal en http://localhost:' + PORT);
    console.log('Editor de contenidos: http://localhost:' + PORT + '/config');
});
