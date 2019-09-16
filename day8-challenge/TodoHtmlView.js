const fs = require("fs");

class HtmlView {
    constructor(model) {
        this.TodoModel = model;
        this.TodoModel.subscribe(this);
        this.update();
    }

    update() {
        this.data = this.TodoModel.state;
        const content = `<!DOCTYPE html>
        <html lang="en"><head>
            <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>TodoList Result</title>
                    </head>
                    <body>
                        <h1>todolist</h1>
                        <div class="log">
                            ${this.data}
                        </div>
                    </body>
        </html>`;
        fs.writeFile( "html/log.html", content, function(err) {
            if (err)
                throw err;
        });
    }
}

module.exports = HtmlView;