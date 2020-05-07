var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var dbUrl = 'mongodb+srv://root:myrootpass@cluster0-dovuy.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbUrl, (err) => {
	console.log('mongodb connected', err);
});

app.get('/messages', (req, res) => {
	Message.find({}, (err, messages)=> {
		res.send(messages);
	})
});

app.post('/messages', (req, res) => {
	var message = new Message(req.body);
	var reply = new Message(req.body);
	var date = new Date();
	var hour = date.getHours();
	
	message.save((err) => {
		if (err)
			sendStatus(500);
		io.emit('message', req.body);
		if ( 20 < hour < 8 ){
			reply.name = 'AutoReply';
			reply.message = 'No momento não estamos em atendimento, mas pode deixar sua dúvida que logo responderemos.';
			reply.type = false;
			reply.save((err) => {
				if (err)
					sendStatus(500);
			});
			io.emit('message', reply);
		}else{
			reply.name = 'AutoReply';
			reply.message = 'Aguarde um momento por favor que um de nossos técnicos logo responderá.';
			reply.type = false;
			reply.save((err) => {
				if (err)
					sendStatus(500);
			});
			io.emit('message', reply);
		}
		
		res.sendStatus(200);
	});
});

io.on('connection', () => {
	console.log('a user is connected');
});

var Message = mongoose.model('Message',{ name: String, message: String, type: Boolean});

module.exports = app;