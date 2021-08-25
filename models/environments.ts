export class Environments {
    [key: string]: Environment;
}

export class Environment {
    port: number;
    envName: string;
    hashingSecret: string;
    client_base_url: string;
}
