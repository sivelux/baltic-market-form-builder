
import { supabase } from "@/integrations/supabase/client";
import { 
  databaseConfig, 
  getSupabaseConfig, 
  configureDevelopmentDatabase, 
  configureProductionDatabase 
} from "@/config/database";

/**
 * Database connection utility
 * This file provides functions to connect to the database and execute queries.
 */

// Function to check database connection
export const testDatabaseConnection = async (): Promise<boolean> => {
  try {
    // For Supabase connections
    // Note: We need to use tables that exist in the database schema
    // Instead of hardcoded table name, we'll check the connection status
    const { error } = await supabase.auth.getSession();
    
    if (error) {
      console.error("Database connection test failed:", error.message);
      return false;
    }
    
    console.log("Database connection successful!");
    return true;
  } catch (error) {
    console.error("Error testing database connection:", error);
    return false;
  }
};

// Example function to execute a query
export const executeQuery = async <T>(
  tableName: keyof Database['public']['Tables'],
  query: string
): Promise<{ data: T[] | null; error: Error | null }> => {
  try {
    const response = await supabase.from(tableName).select(query);
    return { data: response.data as T[], error: response.error };
  } catch (error) {
    console.error(`Error executing query on ${tableName}:`, error);
    return { data: null, error: error as Error };
  }
};

// Function to get database configuration for the current environment
export const getConnectionConfig = () => {
  // Here you could add logic to determine which config to use based on environment
  if (process.env.NODE_ENV === 'production') {
    return getSupabaseConfig();
  }
  return databaseConfig;
};

// Example of configuring the database for different environments
export const setupDatabaseForEnvironment = () => {
  if (process.env.NODE_ENV === 'production') {
    // In a real application, these would come from environment variables
    // or a secure configuration service
    configureProductionDatabase({
      host: process.env.DB_HOST || "production-db-host",
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || "prod_user",
      password: process.env.DB_PASSWORD || "prod_password",
      database: process.env.DB_NAME || "prod_database",
      ssl: true
    });
  } else {
    // Load development configuration
    configureDevelopmentDatabase();
  }
};

// Call this function early in your application initialization
// setupDatabaseForEnvironment();
