// Request handlers object
const reqHandlers: any = {};

// Index Handler
reqHandlers.index = (data: any, callback: any) => {

    if ((data.method).toLowerCase() === 'get') {
        callback(200, 'Welcome to the Node.js TypeScript Seed API!', 'html');
    } else {
        callback(405, undefined, 'html');
    }

};

// Ping Handler
reqHandlers.ping = (data: any, callback: any) => {
    console.log('PING!');
    callback(200, 'Pong!', 'html');
};

// Not Found Handler
reqHandlers.notFound = (data: any, callback: any) => {
    callback(404, 'Requested API endpoint does not exist!', 'html');
};

export const handlers = reqHandlers;
