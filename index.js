const express = require('express')
const app = express()
const routes = require('./routes.js')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

const log = console.log
const PORT = process.env.PORT || 3000

;(async function(){
    try {
        const sequelize = require('./db.js')
        const addRelations = require('./relations.js')
        await sequelize.authenticate()
        addRelations()
        await sequelize.sync()
    } catch(e) {
        console.log('Sequelize error: ', e)
    }
})()

app.use('/', routes)

app.listen(PORT, () => log('App is running on port:', PORT))