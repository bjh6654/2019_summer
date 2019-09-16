var request = require('request');

const url = 'http://localhost:8090/data.json';
request(url, function(error, response, html){
    if (error) {
        throw error
    } else {
        const TodoModel = require("./TodoModel.js")
        const TodoController = require("./TodoController.js")
        const TodoHtmlView = require('./TodoHtmlView.js') //뒤에 설명
        const todolist = JSON.parse(html);
        const todoModel = new TodoModel(todolist);
        const controller = new TodoController(todoModel);
        controller.runTodo();
        new TodoHtmlView(todoModel);
    }
});;

