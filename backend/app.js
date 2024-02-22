const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const Excel = require('exceljs');


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

// app.get('/data/:doc_id',(req, res) => {
//     let docId = req.params.doc_id;
//     let ques_data = [
//         {questionText: "Question here", 
//          questionType:"radio", 
//          option: [{optionText:"Option 1"}, 
//                  {optionText:"Option 2"}, 
//                  ],
//          answer:false,
//          answerKey:"",
//          points:0, 
//          open:true, 
//          required: false
//         }];
//     const exists = fs.existsSync(`files/${docId}.json`);
//     if(exists){
//         fs.readFile(`files/${docId}.json`,(err, data) => {
//             if(err){ 
//                 console.log(err);
//             }
//             ques_data = JSON.parse(data);
//             console.log(req.params.doc_id)
//             res.send(ques_data);
//         })
//     }else{
//         console.log(ques_data);
//         res.send(ques_data)
//     }
// })

app.get('/data/:doc_id', (req, res) => {
    const docId = req.params.doc_id;
    const filePath = `files/${docId}.json`;

    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(`Error reading file: ${err}`);
                res.status(500).send('Internal Server Error');
            } else {
                const ques_data = JSON.parse(data);
                console.log(`Data found for doc_id: ${docId}`);
                res.send(ques_data);
            }
        });
    } else {
        console.log(`File not found for doc_id: ${docId}`);
        const defaultData = {"document_name":"Untitled Document",
                            "doc_desc":"Add Description",
                            "questions":[{"questionText":"Question...",
                                        "questionType":"radio",
                                        "option":[{"optionText":"Options..."},
                                                    {"optionText":"Options..."}],
                                        "answer":false,
                                        "answerKey":"",
                                        "points":0,
                                        "open":true,
                                        "required":false
                                        }]
                            };
        res.send(defaultData);
    }
});

app.get('/get_all_filenames',(req,res) => {
    const directoryPath = path.join(__dirname,'/files');
    fs.readdir(directoryPath, function(err, files){
        if(err){
            return console.log('Unable to scan directory' + err);
        }
        res.send(files);    
    });
})


app.post(`/student_response/:doc_id`, (req, res) => {
    const { body, params: { doc_id } } = req;

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(doc_id);

    // Set up worksheet columns
    worksheet.columns = [{ header: "Time Stamp", key: "datatime" }, ...body.column];
    worksheet.columns.forEach(column => column.width = Math.max(12, column.header.length));
    worksheet.getRow(1).font = { bold: true };

    // Add student responses to worksheet
    body.answer_data.forEach((response, index) => {
        const rowIndex = index + 2;
        worksheet.addRow({ date: new Date(), ...response });
    });

    // Write workbook to file
    workbook.xlsx.writeFile(`${doc_id}.xlsx`)
        .then(() => res.send('Data saved successfully'))
        .catch(error => res.status(500).send(`Error saving data: ${error.message}`));
});


app.listen (9000, ()=>{console.log('expresss server is running at port nnumber 9000')})