import { Configuration, OpenAIApi } from "openai";
 
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
