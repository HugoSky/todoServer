var express = require('express'),
    settings = require('./settings'),
    path = require('path'),
    routes = require('./routes/index'),
    app = express();

app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/', routes);
app.listen(3000,function(){
  console.log("listened on port 3000");
})


 