
/**
 * Database configuration
 * This file contains the configuration for connecting to the database.
 * In a production environment, these values should be set using environment variables.
 */

export const databaseConfig = {
  // Connection details
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
  ssl: false, // Set to true for production environments
};

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
