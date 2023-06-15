import firebird from 'node-firebird'

const dbOptions = {
    host: 'localhost',
    port: 3050,
    database: './SALESDB.FDB',
    user: 'sysdba',
    password: 'masterkey',
    lowercase_keys: false, // set to true to lowercase keys
    role: null,            // default
    pageSize: 4096,        // default when creating database
    pageSize: 4096,        // default when creating database
    retryConnectionInterval: 1000, // reconnect interval in case of connection drop
    blobAsText: false // set to true to get blob as text, only affects blob subtype 1
  }

const firebirdPool = firebird.pool(5, dbOptions)
  
const  NewTransaction = () => {
  return new Promise((resolve, reject) => {      
    firebirdPool.get((err, db) => {
      if (err) { 
        reject(err)
        return
      }      
      //DBGlobal=db;  
      db.transaction(firebird.ISOLATION_READ_COMMITED, 
          function(err, transaction) {          
            //TransactionGlobal=transaction  
            if (err) {
              reject(err)
            return
            }
            resolve( { transaction, db })
          })
      }) //firebirdpool
    })  //promisse
  } //function
  
const CommitTransaction = (transaction, db) => {
    return new Promise((resolve, reject) => {  
      transaction.commitRetaining(function(err) {
        if (err){
            transaction.rollback()
            reject(err)
            return
        }
        else {
          db.detach()
          resolve(true)
        }
      })//transaction  
    })//promisse
  }    
  
const RollbackTransaction = (transaction, db) => {
    return new Promise((resolve, reject) => {  
      try{
        transaction.rollback()
        db.detach()
        resolve(true)
      }
      catch(err){
        reject(err)
      }  
    })//promisse
  }
      
const QueryExecTransaction = (transaction, sql, arrayparams = []) => {
  return new Promise((resolve, reject) => {  
    transaction.query(sql,arrayparams,function(err, result) {    
      if (err) {
        console.log('erro in executing the query')
        transaction.rollback()
        reject(err)
        return
        }
      resolve(result)
      return
     })  //query            
    })//promisse
  }
  
export { dbOptions, 
    firebirdPool, 
    NewTransaction, 
    RollbackTransaction,
    QueryExecTransaction }
