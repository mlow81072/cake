import faunadb from "faunadb"
import query from "faunadb"
const q = query

var client = new faunadb.Client({
  secret: process.env.FAUNA_CAKE_SERVER_KEY,
  endpoint: 'https://db.fauna.com/',
})

const authenticate =
  async ( req, res ) => {
    try{

      console.log("auth called")
      console.log(req)

      const result = await(
        client.query(q.Login
          ( q.Match(q.Index("by_username"),req.body.username), { password: req.body.password })
        )
      )

      return res.status(200).json({username: req.body.username, message: "succesfully authenticated", status: 200})

    } catch (err){
      const result = { username: req.body.username, message: err.message, status: 400 }
      return res.status(400).json(result)
    }

  }


export default authenticate
