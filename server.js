import { Application } from './app'
import DBConnection from './config/dbConnection'

const dbConnection = new DBConnection()
const app = new Application(dbConnection)

app.initialize()
app.startListening()
