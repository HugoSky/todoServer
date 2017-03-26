var express = require('express'),
	router = express.Router(),
	Todos = require('../models/todos');


router.get('/', function(req, res) {
	res.render('index');
});

router.get('/getTodos', function(req, res) {
	getTodosAndActiveNum(req,res)
});

function getTodosAndActiveNum(req, res){
	var todosObject;
	Todos.getAll(function(err, todos){
		if(err){
			res.send(err)
		}
		Todos.getActive(function(err, activeTodos){
			if(err){
				res.send(err)
			}
			activeNum = activeTodos.length;
			todosObject = {todos: todos, activeNum: activeNum};
			res.setHeader("Access-Control-Allow-origin","*");
			res.json(todosObject);
			res.end();
		})
	})
}

router.post('/addTodo', function(req, res) {
	var todoName = req.query.name;
	Todos.saveTodo(todoName, function(err, newTodo){
		if(err){
			res.send(err)
		}
		getTodosAndActiveNum(req,res)
	})
});

router.post('/delCompleteTodos', function(req, res) {
	Todos.delCom(function(err, newTodo){
		if(err){
			res.send(err)
		}
		getTodosAndActiveNum(req,res)
	})
});

router.post('/delTodo', function(req, res) {
	Todos.delTodo(req.query._id,function(err, newTodo){
		if(err){
			res.send(err)
		}
		getTodosAndActiveNum(req,res)
	})
});


router.post('/updateTodoStatus', function(req, res) {
	Todos.updateTodoStatus(req.query, function(err, todos){
		if(err){
			res.send(err)
		}
		getTodosAndActiveNum(req, res)
	})
});

router.post('/updateTodoName', function(req, res) {
	Todos.updateTodoName(req.query, function(err, todos){
		if(err){
			res.send(err)
		}
		getTodosAndActiveNum(req, res)
	})
});
module.exports = router;