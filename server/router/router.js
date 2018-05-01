const Router = require('koa-router');
const router = new Router();
const htmlCreate = require('../createMiddle/htmlCreate');
const fs=require('fs');

const create =async (ctx)=>{
    const params = ctx.request.body;
    ctx.type='json';
    ctx.body=params;
    htmlCreate(params.title+'.html',params.contents);
}

const check = async (ctx)=>{
    const name = ctx.request.body.name;
    const year = (new Date()).getFullYear();
    const month = (new Date()).getMonth()+1;
    const day = (new Date()).getDate();
    const result = fs.accessSync('./htmls/'+year+'/'+month+'/'+day+'/'+name+'.html');
    if(result===undefined){
        ctx.type='json';
        ctx.body={code:1};
        console.log('存在')
    }
}
//处理数据
const data = async (ctx)=>{
    const body = ctx.request.body;
    ctx.type="json";
    if(body){
        ctx.body=body;
    }else{
        ctx.body='数据未收到'
    }
    
}
router.post('/create',create)
      .post('/check',check)
      .post('/data',data)

module.exports = router;