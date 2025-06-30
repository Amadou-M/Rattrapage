const mysql = require('mysql2/promise');

let connection;

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'jurassic_user',
  password: process.env.DB_PASSWORD || 'secure_password',
  database: process.env.DB_NAME || 'jurassic_incidents',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

const connectDatabase = async () => {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('🗄️ Connexion MySQL établie');
    
    // Test de la connexion
    await connection.execute('SELECT 1');
    console.log('✅ Test de connexion MySQL réussi');
    
    return connection;
  } catch (error) {
    console.error('❌ Erreur de connexion MySQL:', error);
    throw error;
  }
};

const getConnection = () => {
  if (!connection) {
    throw new Error('Base de données non connectée');
  }
  return connection;
};

const closeConnection = async () => {
  if (connection) {
    await connection.end();
    console.log('🔌 Connexion MySQL fermée');
  }
};

module.exports = {
  connectDatabase,
  getConnection,
  closeConnection
};