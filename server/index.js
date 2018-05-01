const Koa = require('koa');
const app = new Koa();
const router = require('./router/router.js');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const static = require('koa-static');
const path = require('path');
const staticPath = './htmls';


app.use(koaBody());
app.use(cors());
app.use(router.routes(),router.allowedMethods());
app.use(static(path.join(__dirname,staticPath)))
app.listen(880)