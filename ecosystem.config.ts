import { Environments } from "./models/environments";

// Container for all environments
const environments = new Environments;

// Development Environment
environments.development = {
    port: 3000,
    envName: 'development',
    hashingSecret: 'developmentSecret',
    client_base_url: 'http://localhost:4200'
};

// Staging environment (default)
environments.staging = {
    port: 4000,
    envName: 'staging',
    hashingSecret: 'stagingSecret',
    client_base_url: 'https://staging.example.com'
};

// Production environment
environments.production = {
    port: 5000,
    envName: 'production',
    hashingSecret: 'productionSecret',
    client_base_url: 'https://www.example.com'
};

// Determine which environment was requested from the command line
const currentEnvironment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check if the requested environment exists, if not, default to the Staging Environment
export const env = environments[currentEnvironment] ? environments[currentEnvironment] : environments.staging;

// Envitonment Variables for Process Manager (PM2)
export const apps = [
    {
        name: 'BINANCE_TRADER_BOT',
        script: './index.js',
        watch: false,
        env_development: {
            PORT: environments.development.port,
            NODE_ENV: environments.development.envName
        },
        env_staging: {
            PORT: environments.staging.port,
            NODE_ENV: environments.staging.envName
        },
        env_production: {
            PORT: environments.production.port,
            NODE_ENV: environments.production.envName
        }
    }
];