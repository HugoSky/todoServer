var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todos');

var todoSchema = new mongoose.Schema({
  name:String,
  status:String
})
 
var todoModel = mongoose.model('todos',todoSchema);

function Todo(todo) {
  this.name = todo.name;
  this.status = todo.status;
};

Todo.getAll = function(callback){
   todoModel.find(function(err,todos){
    if(err){
      callback(err);
    }
    callback(null,todos);
   })
}

Todo.getActive = function(callback){
   todoModel.find({status:'false'}, function(err,actives){
    if(err){
      callback(err);
    }
    callback(null,actives);
   })
}

Todo.saveTodo = function(todoName, callback){
    var todo = {
      name: todoName,
      status: 'false'
    }
    var newTodo = new todoModel(todo);
    newTodo.save(function(err, newTodo){
      if(err){
        callback(err);
      }
      callback(null,newTodo);
    })
}

Todo.delCom = function(callback){
  todoModel.remove({status:"true"}, function(err, tag){
    if(err){
        callback(err);
    }
    callback(null, tag)
  })
}
Todo.delTodo = function(_id, callback){
  todoModel.remove({_id:_id}, function(err, tag){
    if(err){
        callback(err);
    }
    callback(null, tag)
  })
}

Todo.updateTodoStatus = function(todo, callback){
    todoModel.update({_id: todo._id},{$set:{status: todo.status}},function(err, todo){
      if(err){
        callback(err);
      }
       callback(null, todo)
    })
}

Todo.updateTodoName = function(todo, callback){
  console.log(todo);
    todoModel.update({_id: todo._id},{$set:{name: todo.name}},function(err, todo){
      if(err){
        callback(err);
      }
       callback(null, todo)
    })
}


module.exports = Todo;
