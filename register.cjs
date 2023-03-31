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

const register =
  async ( username, password ) => {
    const salt = randomBytes(80)
    const user =
      { username: username
      , hashedPassword: digest(salt + password)
      , salt: salt
      }
    return client.query(q.Create(q.Collection("users"), { data: user } ))
    .then((ret) => console.log(ret))
    .catch((err) => console.error(
      'Error: [%s] %s: %s',
      err.name,
      err.message,
      err.errors()[0].description,
    ))
  }

export default register
