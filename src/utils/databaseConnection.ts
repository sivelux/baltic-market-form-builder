
import { supabase } from "@/integrations/supabase/client";
import { databaseConfig, getSupabaseConfig } from "@/config/database";

/**
 * Database connection utility
 * This file provides functions to connect to the database and execute queries.
 */

// Function to check database connection
export const testDatabaseConnection = async (): Promise<boolean> => {
  try {
    // For Supabase connections
    const { data, error } = await supabase.from('postgres_database_version').select('*').limit(1);
    
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
  tableName: string, 
  query: any
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
