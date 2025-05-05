
/**
 * Database configuration
 * This file contains the configuration for connecting to the database.
 * In a production environment, these values should be set using environment variables.
 */

// Default development configuration
const defaultDevConfig = {
  host: "localhost",
  port: 5432,
  user: "admin",
  password: "secure_password",
  database: "market_app_db",
  
  // Connection pool configuration
  pool: {
    min: 2,
    max: 10,
    idleTimeoutMillis: 30000
  },
  
  // SSL configuration for secure connections
  ssl: false, // Set to false for development environments
};

// Base database configuration that will be populated with appropriate values
export let databaseConfig = {
  // Connection details
  host: "",
  port: 0,
  user: "",
  password: "",
  database: "",
  
  // Connection pool configuration
  pool: {
    min: 0,
    max: 0,
    idleTimeoutMillis: 0
  },
  
  // SSL configuration for secure connections
  ssl: false,
};

/**
 * Method to configure database with development settings
 * This loads default development configuration values
 */
export const configureDevelopmentDatabase = (): void => {
  databaseConfig = { ...defaultDevConfig };
  console.log("Development database configuration loaded");
};

/**
 * Method to configure database with production settings
 * @param config The production configuration parameters
 */
export const configureProductionDatabase = (config: {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  poolMin?: number;
  poolMax?: number;
  poolIdleTimeout?: number;
  ssl?: boolean;
}): void => {
  databaseConfig = {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    pool: {
      min: config.poolMin || 5,
      max: config.poolMax || 20,
      idleTimeoutMillis: config.poolIdleTimeout || 60000
    },
    ssl: config.ssl !== undefined ? config.ssl : true, // Default to true for production
  };
  console.log("Production database configuration loaded");
};

// Initialize with development configuration by default
configureDevelopmentDatabase();

// Function to get the database connection URL
export const getDatabaseUrl = (): string => {
  const { host, port, user, password, database } = databaseConfig;
  return `postgresql://${user}:${password}@${host}:${port}/${database}`;
};

// For environments using Supabase or similar services
export const getSupabaseConfig = () => {
  return {
    url: process.env.SUPABASE_URL || "https://nbrxpnahfyoamolvioak.supabase.co",
    key: process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5icnhwbmFoZnlvYW1vbHZpb2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyODQzNTMsImV4cCI6MjA2MTg2MDM1M30.hGl4fwhv_djVIrXpAdpK2Zja6Origx4oiCz5o1fgOsQ",
  };
};
