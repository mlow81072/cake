import faunadb from "faunadb"
import query from "faunadb"
const q = query

var client = new faunadb.Client({
  secret: process.env.FAUNA_CAKE_SERVER_KEY,
  endpoint: 'https://db.fauna.com/',
})

const register =
  async ( req, res ) => {
    try{

      const result = await(
        client.query(q.Create(
          q.Collection("users")
          , { credentials: { password: req.body.password }
          , data: { username: req.body.username }
        })
      ))

      return res.status(200).json({username: req.body.username, message: "succesfully registered", status: 200})

    } catch (err){
      const result = { username: req.body.username, message: err.message, status: 400 }
      return res.status(500).json(result)
    }

  }


export default register
