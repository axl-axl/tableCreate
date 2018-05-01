require('../../../client/public/css/html.scss');
//ajax封装
const getParams=function(data) {
    return JSON.stringify(data)
}
const ajax = function(options) {
    options = options || {};
    options.type = (options.type || "post").toUpperCase();
    options.dataType = options.dataType || 'json';
    options.async = options.async || true;
    var params = getParams(options.data);
    var xhr;
    if (window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4){
            var status = xhr.status;
            if (status >= 200 && status < 300 ){
                options.success && options.success(xhr.responseText,xhr.responseXML);
            }else{
                options.fail && options.fail(status);
            }
        }
    };
    if (options.type == 'GET'){
        xhr.open("GET",options.url + '?' + params ,options.async);
        xhr.send(null)
    }else if (options.type == 'POST'){
        xhr.open('POST',options.url,options.async);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(params);
    }
}
//绑定多事件
const eventDelegate = function (parentSelector, targetSelector, events, foo) {
  // 触发执行的函数
  function triFunction (e) {
    // 兼容性处理
    var event = e || window.event;
    // 获取到目标阶段指向的元素
    var target = event.target || event.srcElement;
    // 获取到代理事件的函数
    var currentTarget = event.currentTarget;
    // 处理 matches 的兼容性
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1;
        };
    }
    // 遍历外层并且匹配
    while (target !== currentTarget) {
      // 判断是否匹配到我们所需要的元素上
      if (target.matches(targetSelector)) {
        var sTarget = target;
        // 执行绑定的函数，注意 this
        foo.call(sTarget, Array.prototype.slice.call(arguments))
      }
      target = target.parentNode;
    }
  }
  // 如果有多个事件的话需要全部一一绑定事件
  events.split('.').forEach(function (evt) {
    // 多个父层元素的话也需要一一绑定
    Array.prototype.slice.call(document.querySelectorAll(parentSelector)).forEach(function ($p) {
      $p.addEventListener(evt, triFunction);
    });
  });
}

//检测radio选项
const checkRadio=function(demo){
    const checked = demo.checked;
    const son=demo.getAttribute('data-son');
    if(son && checked){
        document.querySelector('.questionSon.son'+son).classList.add('active')
    }else if(son && !checked){
        document.querySelector('.questionSon.son'+son).classList.remove('active')
    }
}
//检测checkbox选项
const checkCheckbox=function(demo){
    const checked = demo.checked;
    const son=demo.getAttribute('data-son');
    if(son && checked){
        document.querySelector('.questionSon.son'+son).classList.add('active')
    }else if(son && !checked){
        document.querySelector('.questionSon.son'+son).classList.remove('active')
    }
}
//每个问题修改后检查该问题下的所有选项
eventDelegate('.main','.item input[type="radio"]','change',function(){
    const parent = this.parentNode.parentNode;
    const demos = Array.prototype.slice.call(parent.querySelectorAll('.item input[type="radio"]'));
    demos.forEach((val)=>{
        checkRadio(val)
    })
})
eventDelegate('.main','.item input[type="checkbox"]','click',function(){
    const parent = this.parentNode.parentNode;
    const demos = Array.prototype.slice.call(parent.querySelectorAll('.item input[type="checkbox"]'));
    demos.forEach((val)=>{
        checkCheckbox(val)
    })
})
//检查必填项是否有选
const checkVerify=function(){
    const verifys = Array.prototype.slice.call(document.querySelectorAll('.question.verify'));
    for(let i=0;i<verifys.length;i++){
        let radio = verifys[i].classList.contains('radioBox');
        let checkbox = verifys[i].classList.contains('checkboxBox');
        let select = verifys[i].classList.contains('selectBox');
        let text = verifys[i].classList.contains('textBox');
        let textarea = verifys[i].classList.contains('textareaBox');
        let scrollHeight = verifys[i].offsertHeight;
        if(radio){
            let status = verifys[i].querySelector('.item input[type="radio"]:checked');
            if(!status){
                return false;
            }
        }else if(checkbox){
            let status = verifys[i].querySelector('.item input[type="checkbox"]:checked');
            if(!status){
                return false;
            }
        }else if(select){
            let status = verifys[i].querySelector('.item select').value;
            if(!status){
                return false;
            }
        }else if(text){
            let status = verifys[i].querySelector('.item input[type="text"]').value;
            if(!status){
                return false;
            }
        }else if(textarea){
            let status = verifys[i].querySelector('.item textarea').value;
            if(!status){
                return false;
            }
        }else{
            return true;
        }
    }
}
//其他选项
eventDelegate('.question .item','.other','change',function(){
    let value = this.value;
    this.parentNode.querySelector('input').value='其他 '+value;
})
//获取所有问题答案
document.querySelector('.submit').addEventListener('click',function(){
    let data=[];
    let questions = Array.prototype.slice.call(document.querySelectorAll('.question'));
    const checkVerify=checkVerify();
    if(!checkVerify){
        alert('必填选项未填写')
        return false;
    }else{
        document.querySelector('form').submit();
    }
})