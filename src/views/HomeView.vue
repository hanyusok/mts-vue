<script setup>
import { dbOptions } from '../database'
import firebird from 'node-firebird'

console.log('is starting')

/* const tryConnect = () => {
  firebird.attach(dbOptions, (err, db) => {
    if (err)
      throw err

    // db = DATABASE
    db.query('SELECT * FROM PERSON', (err, result) => {
      // IMPORTANT: close the connection
      // console.log(result)

      db.detach()

      if (err) {
        console.log(err)
      } else {
        console.log(result)
      }
    })

  })
} */


const firebirdPool = firebird.pool(5, dbOptions);
  
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
  
async function testa(){
  const {transaction, db } = await NewTransaction()    
    let psql='SELECT * FROM SALES'
    try{    
      await QueryExecTransaction(transaction, psql)
      // await CommitTransaction(transaction,db);
    }
    catch(e){
      console.log('Erro on SQL process')
      console.log(e)
      await RollbackTransaction(transaction, db)        
    }
    console.log('finished')
  }

testa()

</script>

<template>
  <main>
    <h1>This is a Home Page</h1>
  </main>
</template>
