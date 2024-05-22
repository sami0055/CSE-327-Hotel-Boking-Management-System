/**
 * Description placeholder
 *
 * @type {*}
 */
const express = require('express')
/**
 * Description placeholder
 *
 * @type {*}
 */
const cors = require('cors')
/**
 * Description placeholder
 *
 * @type {*}
 */
const { graphqlHTTP } = require('express-graphql')
/**
 * Description placeholder
 *
 * @type {*}
 */
const mongoose = require('mongoose')
/**
 * Description placeholder
 *
 * @type {*}
 */
const schema = require("./schemas/Schema.js")
/**
 * Description placeholder
 *
 * @type {*}
 */
const isAuth = require('./middlewares/isAuth.js')
/**
 * Description placeholder
 *
 * @type {*}
 */
const dotenv = require('dotenv')

/**
 * Description placeholder
 *
 * @type {*}
 */
const app = express()
app.use(cors())
app.use(express.json())
app.use(isAuth)
dotenv.config()

/**
 * Description placeholder
 *
 * @type {*}
 */
const mongoURL = process.env.mongodb + srv//tumul:1234@cluster0.wpte9c5.mongodb.net/
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.once('open', () => console.log("DB Connected..."))

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))
/**
 * Description placeholder
 *
 * @type {*}
 */
const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Sever is running..."))
app.get('/', (req, res) => res.send("Auth system..."))