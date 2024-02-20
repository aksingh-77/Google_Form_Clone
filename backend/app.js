const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();


var cors = require('cors') // CORS --> Cross Origin Resource Sharing
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
    next();
});

app.post(`/add_questions/:doc_id`,(req, res)=>{
    var docs_data = req.body;
    var name = req.params.doc_id;
    console.log(docs_data);
    let data = JSON.stringify(docs_data);
    fs.writeFileSync(`files/${name}.json`,data);
    res.send("Saved Data Successfully");
})

app.get('/data/:doc_id',(req, res) => {
    let docId = req.params.doc_id;
    fs.readFile(`files/${docId}.json`,(err, data) => {
        if(err) throw err;
        let ques_data = JSON.parse(data);
        console.log(req.params.doc_id)
        res.send(ques_data);
    })
})

app.get('/get_all_filenames',(req,res) => {
    const directoryPath = path.join(__dirname,'/files');
    fs.readdir(directoryPath, function(err, files){
        if(err){
            return console.log('Unable to scan directory' + err);
        }
        res.send(files);    
    });
})

app.listen (9000, ()=>{console.log('expresss server is running at port nnumber 9000')})