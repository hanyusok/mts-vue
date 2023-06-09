//import firebird from 'node-firebird'

const dbOptions = {
    host: 'localhost',
    port: 3050,
    database: 'C:\\Mts3\\Db\\MTSDB.FDB',
    user: 'SYSDBA',
    password: 'masterkey',
    lowercase_keys: false, // set to true to lowercase keys
    role: null,            // default
    pageSize: 4096,        // default when creating database
    pageSize: 4096,        // default when creating database
    retryConnectionInterval: 1000, // reconnect interval in case of connection drop
    blobAsText: false // set to true to get blob as text, only affects blob subtype 1
  }

  export { dbOptions }
