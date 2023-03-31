const nacl = require("tweetnacl")
nacl.util = require("tweetnacl-util")

const digest =
    (text) => nacl.util.encodeBase64(nacl.hash(nacl.util.decodeUTF8(text)))

const randomBytes =
  (length) => nacl.util.encodeBase64(nacl.randomBytes(10))

const faunadb = require("faunadb")
var q = faunadb.query
var client = new faunadb.Client({
  secret: process.env.FAUNA_API_KEY,
  endpoint: 'https://db.fauna.com/',
})

const getUser =
  async ( req, res ) =>
    await client.query(
      q.Get(
        q.Match(q.Index('username'), username)
      )
    )
    .catch((err) => console.error(
      'Error: [%s] %s: %s',
      err.name,
      err.message,
      err.errors()[0].description,
    ))

const authenticateUser = 
  async (username, password) => 
    getUser(username)
    .then( (user) => digest(user.data.salt + password) === user.data.hashedPassword )

export default authenticateUser
/*
 
const generateImage =
  async (req,res) => {
 
    const configuration = new Configuration({
      organization: process.env.OPENAI_ORGANIZATION,
      apiKey: process.env.OPENAI_API_KEY,
    });
 
    const openai = new OpenAIApi(configuration);
 
    try {
      const q = 
        { prompt: req.query.prompt || "A delectable rainbow cake with elaborate decorations"
        , n: parseInt(req.query.n) || 1
        , size: req.query.size || "256x256"
        }
      const openaiResponse = await openai.createImage(q)
      return res.status(200).json(openaiResponse.data.data.map(x=>x.url))
    } catch(err) {
      return res.status(500).json({error: err})
    }
    
  }
 
export default generateImage
*/
