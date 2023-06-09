<script setup>
import { dbOptions } from '../database'
import firebird from 'node-firebird'

const tryConnect = () => {
  firebird.attach(dbOptions, function (err, db) {

    if (err)
      throw err

    // db = DATABASE
    db.query('SELECT * FROM PERSON', function (err, result) {
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
}

tryConnect()

</script>

<template>
  <main>
    <h1>This is a Home Page</h1>
  </main>
</template>
