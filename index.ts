
import * as http from 'http';
import * as url from 'url';
import * as string_decoder from 'string_decoder';
import { handlers } from './lib/handlers';
import { helpers } from './lib/helpers';
import { env } from './ecosystem.config';

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const httpMethod = req.method;
    const queryStringParamsObject = parsedUrl.query;
    const headers = req.headers;
    const decoder = new string_decoder.StringDecoder('utf-8');
    let buffer = '';

    req.on('data', (data: any) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {

        buffer += decoder.end();

        const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : handlers.notFound;
        const data = {
            'trimmedPath': trimmedPath,
            'queryStringParamsObject': queryStringParamsObject,
            'method': httpMethod,
            'headers': headers,
            'payload': helpers.parseJsonToObject(buffer)
        };

        chosenHandler(data, (statusCode: number, payload: object, contentType: string) => {

            contentType = contentType ? contentType : 'json';
            statusCode = statusCode && typeof statusCode === 'number' ? statusCode : 406;
            let payloadString = '';

            if (contentType === 'json') {

                res.setHeader('Content-Type', 'application/json');
                payload = payload && typeof payload === 'object' ? payload : {};
                payloadString = JSON.stringify(payload);

            } else if (contentType === 'html') {

                res.setHeader('Content-Type', 'text/html');
                payloadString = payload && typeof (payload) === 'string' ? payload : '';

            }

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

            res.writeHead(statusCode);
            res.end(payloadString);

        });

    });

});

server.listen(env.port, () => {
    console.log('\x1b[32m%s\x1b[0m', `Binance Trader Bot Started at Port ${env.port} in ${env.envName} mode!`);
});

const routes = {
    '': handlers.index,
    'ping': handlers.ping
};
