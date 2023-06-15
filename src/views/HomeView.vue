<script setup>
import { setMapStoreSuffix } from 'pinia';
import { dbOptions, firebirdPool, NewTransaction, RollbackTransaction,
    QueryExecTransaction } from '../database'

console.log('is starting')

const testa = async() => {
  const {transaction, db } = await NewTransaction()    
    let psql='SELECT * FROM SALES'
    try{    
      await QueryExecTransaction(transaction, psql)      
    }
    catch(e){
      console.log('Error on SQL process')
      console.log(e)
      await RollbackTransaction(transaction, db)        
    }
    console.log('finished')
  }



</script>

<template>
  <main>
    <h1>This is a Home Page</h1>
  </main>
</template>
