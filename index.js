import express from "express";
const app = express();
const port = 3000;
import pkg from 'youtube-transcript';
const {YoutubeTranscript} = pkg;
 app.use(express.static("public"))
 app.use(express.urlencoded({extended: true}))

function getYoutubeTranscript(url) {
  return YoutubeTranscript.fetchTranscript(url).then((tObj) => {
    let concatenatedText = tObj.map(caption => caption.text).join('\n');
    return concatenatedText;
  })

}

app.post("/generate", (req,res)=>{
  let url=req.body['link']

  getYoutubeTranscript(url).then((transcript)=>{
    res.render("index.ejs", {url: url, transcript: transcript})
    
  })
  .catch(error => {
    res.render("index.ejs", {url: url, transcript: "Invalid URL or no captions available."})
  })

})

app.get("/", (req, res)=>{
  res.render("index.ejs", {url: "", transcript: ""})
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
