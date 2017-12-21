class Palette {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.style='stroke';
        this.cw = this.canvas.width;
        this.ch = this.canvas.height;
        this.history = [];
        this.color='#000';
    }

    line() {
        let that = this;
        this.canvas.onmousedown = function (e) {
            let ox = e.offsetX, oy = e.offsetY;
            that.canvas.onmousemove = function (e) {
                let mx = e.offsetX, my = e.offsetY;
                that.ctx.clearRect(0, 0, that.cw, that.ch);
                if (that.history.length) {
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that.ctx.beginPath();
                that.ctx.moveTo(ox, oy);
                that.ctx.lineTo(mx, my);
                that.ctx.fillStyle=that.color;
                that.ctx.stroke();
            };
            that.canvas.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0, 0, that.cw, that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    }
    dash() {
        let that = this;
        this.canvas.onmousedown=function (e) {
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove=function (e) {
                let mx = e.offsetX,my = e.offsetY;
                that.ctx.clearRect(0,0,that.cw,that.ch

                );
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
                that.ctx.beginPath();
                that.ctx.setLineDash([3,10]);
                that.ctx.moveTo(ox,oy);
                that.ctx.lineTo(mx,my);
                that.ctx.strokeStyle=that.color;
                that.ctx.stroke();
                that.ctx.setLineDash([0,0]);
            };
            that.canvas.onmouseup=function () {
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch

                ));
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
            };
        };
    }
    pencil(){
        let that = this;
        this.canvas.onmousedown = function (e) {
            let ox = e.offsetX, oy = e.offsetY;
            that.ctx.beginPath();
            that.ctx.moveTo(ox, oy);
            that.canvas.onmousemove = function (e) {
                let mx = e.offsetX, my = e.offsetY;
                that.ctx.clearRect(0, 0, that.cw, that.ch);
                if (that.history.length) {
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that.ctx.lineTo(mx, my);
                that.ctx.stroke();
            };
            that.canvas.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0, 0, that.cw, that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    }

    circle() {
        let that = this;
        that.canvas.onmousedown = function (e) {
            let ox = e.offsetX, oy = e.offsetY;
            that.canvas.onmousemove = function (e) {
                let mx = e.offsetX, my = e.offsetY;
                that.ctx.clearRect(0, 0, that.cw, that.ch);
                // that.history=[];
                if (that.history.length) {
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                let r = Math.sqrt((mx - ox) ** 2 + (my - oy) ** 2);
                that.ctx.beginPath();
                that.ctx.arc(ox, oy, r, 0, Math.PI * 2);
                that.ctx[that.style+'Style']=that.color;
                that.ctx[that.style]();
            };
            that.canvas.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0, 0, that.cw, that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    }

    rect() {
        let that = this;
        that.canvas.onmousedown = function (e) {
            let ox = e.offsetX, oy = e.offsetY;
            that.canvas.onmousemove = function (e) {
                let mx = e.offsetX, my = e.offsetY;
                let w = mx - ox, h = my - oy;
                that.ctx.clearRect(0, 0, that.cw, that.ch);
                if (that.history.length) {
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that.ctx.beginPath();
                that.ctx[that.style+'Style']=that.color;
                that.ctx[that.style+'Rect'](ox, oy, w, h);
            };
            that.canvas.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0, 0, that.cw, that.ch));
                that.canvas.onmousemove = null;
                // that.canvas.onmouseup = null;
            }
        }
    }

    ploy(num) {
        let that = this;
        that.canvas.onmousedown = function (e) {
            let ox = e.offsetX, oy = e.offsetY;
            that.canvas.onmousemove = function (e) {
                let mx = e.offsetX, my = e.offsetY;
                let r = Math.sqrt((mx - ox) ** 2 + (my - oy) ** 2);
                that.ctx.clearRect(0, 0, that.cw, that.ch);
                if (that.history.length) {
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that.poly(ox, oy, r, num);

            };
            that.canvas.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0, 0, that.cw, that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    }

    poly(ox, oy, r, num = 6) {
        this.ctx.clearRect(0, 0, this.cw, this.ch);
        if (this.history.length) {
            this.ctx.putImageData(this.history[this.history.length - 1], 0, 0);
        }
        let angle = 2 * Math.PI / num;
        this.ctx.beginPath();
        this.ctx.moveTo(ox + r, oy);
        for (let i = 0; i < num; i++) {
            let x = r * Math.cos(angle * i) + ox;
            let y = r * Math.sin(angle * i) + oy;
            this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();
        this.ctx[this.style+'Style']=this.color;
        this.ctx[this.style]();
    }

    ployJ(num) {
        let that = this;
        that.canvas.onmousedown = function (e) {
            let ox = e.offsetX, oy = e.offsetY;
            that.canvas.onmousemove = function (e) {
                let mx = e.offsetX, my = e.offsetY;
                let r=Math.sqrt((mx-ox)**2+(my-oy)**2);
                that.ctx.clearRect(0, 0, that.cw, that.ch);
                if (that.history.length) {
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that.start(ox,oy,r,num);
            };
            that.canvas.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0, 0, that.cw, that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    }
    start(ox,oy,r,num) {
        let angle=Math.PI /num;
        this.ctx.beginPath();
        this.ctx.moveTo(ox+r,oy);
        for (let i=0;i<num*2+1;i++){
            let x,y;
            if (i%2==0){
                x=r*Math.cos(angle*i)+ox;
                y=r*Math.sin(angle*i)+oy;
            }else {
                x=r/3*Math.cos(angle*i)+ox;
                y=r/3*Math.sin(angle*i)+oy;
            }
            this.ctx.lineTo(x,y);
        }
        this.ctx[this.style+'Style']=this.color;
        this.ctx[this.style]();
    };
    // 撤销
    back(){
        if (this.history.length){
            this.history.pop();
            if (this.history.length>0){
                this.ctx.putImageData(this.history[this.history.length-1],0,0);
            }
        }
    }
    clear(){
        this.ctx.clearRect(0,0,this.cw,this.ch);
    }
    eraser() {
        let that = this;
        that.canvas.onmousedown = function (e) {
            that.canvas.onmousemove = function (e) {

            };
            that.canvas.onmouseup = function () {
                that.canvas.onmousemove = null;
                that.canvas.onmousedown = null;
            }
        }
    }
}