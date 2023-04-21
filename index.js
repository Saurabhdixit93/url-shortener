const expressServer = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const PORT = 5000 || process.env.PORT;
const app = expressServer();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


const ConnectDB = async () =>{
   try{
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected  successfull : ${connect.connection.host}`);
   }catch(error){
        console.log(`Error In Connecting MongoDB: ${error}`);
        process.exit(1);
   }
}

// router of api end point

const Url = require('./model/Url');
const url = require('url');

// Create short Url

app.post('/api/shorten' , async (req, res) => {
    const longUrl = req.body.longUrl;

    if(!url.parse(longUrl).protocol || !url.parse(longUrl).protocol.startsWith('https')){
        return res.status(400).json({
            message: 'Invalid Url, Please Enter Valid Url',
            longUrl
        });
    }

    try{
        const url = await Url.findOne({ longUrl });
        if(url){
            return res.status(201).json({
                message: 'Url Already exists',
                url
            });
        }
        else{
            const shortUrl = generateShortUrl();

            const newUrl = new Url({
                longUrl,
                shortUrl,
                clicks: 0,
                createdAt: new Date(),
            });
            const url = await newUrl.save();
            return res.status(200).json({
                message: `Here is Your Generated Short Url:`,
                url
            });
        }
    }catch(error){
        return res.status(500).json({
            message: `INTERNAL SERVER ERROR: ${error}`
        });
    }
});


// retrieve all long URL from short URL

app.get('/api/:shortUrl', async (req , res) => {
    const shortUrl = req.params.shortUrl;

    try{
        const url = await Url.findOne({ shortUrl });
        if(url) {
            url.clicks++;
            url.save();
            return res.redirect(url.longUrl);
        }
        else{
            return res.status(404).json({
                message: 'Url Not Found '
            });
        }
    }catch(error){
        return res.status(500).json({
            message: `INTERNAL SERVER ERROR: ${error}`
        });
    }
});

// generate random short url 
function generateShortUrl(){
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return  result;
}


ConnectDB().then(() => {
    app.listen(PORT,() =>{
        console.log(`Successfull Connected With the Port:${PORT}`);
    });
});
