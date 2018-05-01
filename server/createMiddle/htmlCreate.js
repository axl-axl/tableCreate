const fs = require('fs');
const path = require('path');

const year = (new Date()).getFullYear();
const month = (new Date()).getMonth() + 1;
const day = (new Date()).getDate();

/**
 * 
 * @param {文件路径} dirname 
 */
const mkdirsSync=function (dirname) {
    if (fs.existsSync(dirname)) {  
        return true;  
    } else {  
        if (mkdirsSync(path.dirname(dirname))) {  
            fs.mkdirSync(dirname);  
            return true;  
        }  
    }  
}
/**
 * 
 * @param {选项列表} items 
 * @param {标题} title 
 * @param {校验数组} verify 
 * @param {确认是否是关联问题，关联问题需要隐藏}questionSon
 */
const createRadio = function(param){
    let radio='';
    param.items.forEach((item)=>{
        radio += `<div class="item">
            <input type="radio" value='${item.other?'':item.value}' name='${param.title}' ${item.relationQuestion?'data-son='+item.relationQuestion:''}>
            ${item.value}
            ${item.other?`<input type='text' class='other'>`:''}
        </div>`
    });
    return `<div class="question radioBox ${param.verify.length>0?'verify':''} ${param.questionSon?'questionSon son'+param.id:''}">
        <label class='title'>${param.title} ${param.verify.length>0?`<i class='fa fa-asterisk'></i>`:''}</label>
        ${radio}
    </div>`
}
/**
 * 
 * @param {选项列表} items 
 * @param {标题} title 
 * @param {校验数组} verify 
 * @param {确认是否是关联问题，关联问题需要隐藏}questionSon
 */
const createCheckbox = function(param){
    let checkbox='';
    param.items.forEach((item)=>{
        checkbox += `<div class="item">
        <input type="checkbox" value='${item.other?'':item.value}' name='${param.title}' ${item.relationQuestion?'data-son='+item.relationQuestion:''}>
        ${item.value}
        ${item.other?`<input type='text' class='other' >`:''}
    </div>`
    })
    return `<div class="question checkboxBox ${param.verify.length>0?'verify':''} ${param.questionSon?'questionSon son'+param.id:''}">
        <label class='title'>${param.title} ${param.verify.length>0?`<i class='fa fa-asterisk'></i>`:''}</label>
        ${checkbox}
    </div>`
}
/**
 * 
 * @param {选项列表} items 
 * @param {标题} title 
 * @param {校验数组} verify 
 */
const createSelect=function(param){
    let select='';
    param.items.forEach((item)=>{
        select += `<option value='${item.value}'>${item.value}</option>`
    })
    return `<div class="question selectBox ${param.verify.length>0?'verify':''} ${param.questionSon?'questionSon son'+param.id:''}">
        <label class='title'>${param.title} ${param.verify.length>0?`<i class='fa fa-asterisk'></i>`:''}</label>
        <div class='item'>
            <select name='${param.title}'>${select}</select>
        </div>
    </div>`
}
/**
 * 
 * @param {标题} title 
 * @param {默认文案} value 
 * @param {校验数组} verify 
 */
const createText =function(param){
    return `<div class="question textBox ${param.verify.length>0?'verify':''} ${param.questionSon?'questionSon son'+param.id:''}">
    <label class='title'>${param.title} ${param.verify.length>0?`<i class='fa fa-asterisk'></i>`:''}</label>
    <div class='item'>
        <input type="text" value="${param.value}"  name="${param.title}" />
    </div>
    </div>`
}
/**
 * 
 * @param {标题} title 
 * @param {默认文案} value 
 * @param {校验数组} verify 
 */
const createTextarea = function(param){
    return `<div class="question textareaBox ${param.verify.length>0?'verify':''} ${param.questionSon?'questionSon son'+param.id:''}">
    <label class='title'>${param.title} ${param.verify.length>0?`<i class='fa fa-asterisk'></i>`:''}</label>
    <div class='item'>
        <textarea cols="30" rows="10" value="${param.value}" name="${param.title}"></textarea>
    </div>
</div>`
}
/**
 * 
 * @param {文件名} name 
 * @param {生成html页面数据} params 
 */
const create = function(name,params){
    let demo='';
    for(let param of params){
        if(param.type === 'radio'){//创建radio选项
            demo += createRadio(param);
        }else if(param.type==='checkbox'){//创建checkbox选项
            demo += createCheckbox(param)
        }else if(param.type==='select'){//创建下拉选择框
            demo += createSelect(param);
        }else if(param.type==='text'){//创建单行文本
            demo += createText(param);
        }else if(param.type==='textarea'){
            demo +=createTextarea(param)
        }
    }
    const html=`<html !Document>
    <head>
    <meta charset='utf-8'>
    <title>html创建测试</title>
    <meta name='viewport' content='width=device-width, initial-scale=1.0,minimum-scale=1.0,maximun-scale=1.0,user-scalable=no'>
    <link rel='stylesheet' href='/css/dist/font-awesome.min.css' />
    </head>
    <body>
        <section class='main'>
            <form action="/data" method="post">
                ${demo}
                <button class="submit">提交</button>
            </form>
        </section>
    </body>
    <script src='/css/dist/index.min.js'></script>
    </html>
    `
    mkdirsSync('./htmls/'+year+'/'+month+'/'+day);
    fs.writeFile('./htmls/'+year+'/'+month+'/'+day+'/'+name,html,(error)=>{
       if(error) throw error;
    }) 
}

module.exports = create;