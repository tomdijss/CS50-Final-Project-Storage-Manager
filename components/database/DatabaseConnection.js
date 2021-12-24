import * as SQLite from 'expo-sqlite';

// Connecting to Sqlite Database
export const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase("database.db"),
};