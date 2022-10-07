const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


// app.listen(8080, function() {
//     console.log('listening on 8080')
// })
var db;

MongoClient.connect('mongodb+srv://admin:reenmongodb33@cluster0.ziqa2ey.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, function(에러, client){
	if (에러) return console.log(에러)
	db = client.db('todoapp');
    // db.collection('post').insertOne( {이름 : 'John', _id : 100} , function(에러, 결과){
	//     console.log('저장완료'); 
	// });

    app.listen(8080, function() {
      console.log('listening on 8080')
    })
  })



  
app.get('/', function(요청, 응답) { 
응답.sendFile(__dirname +'/index.html')
});

app.get('/write', function(요청, 응답) { 
응답.sendFile(__dirname +'/write.html')
});

app.post('/add', function(요청, 응답){
    console.log(요청.body.title);
    응답.send('전송완료')
    db.collection('post').insertOne( {할일 : 요청.body.title, 날짜 : 요청.body.date} , function(에러, 결과){
	    console.log('저장완료'); 
	});    
});

app.get('/list', function(요청, 응답) { 
    // 응답.render('list.ejs')
    db.collection('post').find().toArray(function(에러, 결과){
        console.log(결과)
        응답.render('list.ejs', { posts : 결과 })
      })    
});

