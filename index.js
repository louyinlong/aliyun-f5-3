const express = require('express');
const app = express();
const router = require("./route/route");
const bodyParser = require("body-parser");
const logger = require("morgan");

app.use(logger("dev"));
app.use(express.static(__dirname + "c"));
app.use(router);

app.use(bodyParser.urlencoded({ extended: false })); //配置post的body模块


app.listen(8080, () => {
    console.log('Web 服务器启动!');
});
