window.addEventListener('load',function () {
    let canvas=document.querySelector('canvas');
    let shape=document.querySelectorAll('.shape>li');
    let option=document.querySelectorAll('.option>li');
    let style=document.querySelectorAll('.style>li');
    let FillcolorSelect=document.querySelector('#FillcolorSelect');
    let StrokecolorSelect=document.querySelector('#StrokecolorSelect');
    let palette=new Palette(canvas);
    option.forEach(element=>{
        element.onclick=function () {
            let type=this.id;
            option.forEach(obj=>{obj.classList.remove('active')});
            this.classList.add('active');
            if (type=='back'){
                palette.back();
            }
            if (type=='clear'){
                palette.clear();
            }
            if(type=='newCanvas'){
                // confirm('你确定要删除当前画板，新建画板么？');
                if (confirm('你确定要删除当前画板，新建画板么？')){
                    let w=parseInt(prompt('请输入画板宽度'));
                    let h=parseInt(prompt('请输入画板高度'));
                    document.querySelector('section').innerHTML='';
                    canvas=document.createElement('canvas');
                    canvas.width=w;
                    canvas.height=h;
                    canvas.className='canvasStyle';
                    document.querySelector('section').appendChild(canvas);
                    palette=new Palette(canvas);
                }else {
                    let w=parseInt(prompt('请输入画板宽度'));
                    let h=parseInt(prompt('请输入画板高度'));
                    canvas=document.createElement('canvas');
                    canvas.width=w;
                    canvas.height=h;
                    canvas.className='canvasStyle';
                    document.querySelector('section').appendChild(canvas);
                    palette=new Palette(canvas);
                }
            }
        }
    });
    shape.forEach(element=>{
        element.onclick=function () {
            let type=this.id;
            shape.forEach(obj=>{obj.classList.remove('active')});
            this.classList.add('active');
            if (type=='ploy'||type=='ployJ'){
                let num=parseInt(prompt('请输入边数或者角的数量'));
                palette[type](num);
            }else {
                palette[type]();
            }

        }
    });
    FillcolorSelect.onchange=function () {
        let color=this.value;
        palette.color=color;
    };
    StrokecolorSelect.onchange=function () {
        let color=this.value;
        palette.color=color;
    };
    style.forEach(element=>{
        element.onclick=function () {
            let type=this.id;
            style.forEach(obj=>{obj.classList.remove('active')});
            this.classList.add('active');
            if (type=='fill'){
                palette.style='fill';
            }else if(type=='stroke') {
                palette.style='stroke';
            }

        }
    });
    // 撤销
    window.onkeydown=function (e) {
        if (e.ctrlKey && e.key=='z'){
            if (palette.history.length){
                palette.history.pop();
                if (palette.history.length>0){
                    palette.ctx.putImageData(palette.history[palette.history.length-1],0,0);
                }
            }
        }
    };


});