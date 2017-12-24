class Palette {
    constructor(mask, canvas) {
        this.mask = mask;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.fillStyle = '#ccc';
        this.strokeStyle = '#ccc';
        this.cw = this.canvas.width;
        this.ch = this.canvas.height;
        this.history = [];
        this.style = 'stroke';
        this.lineWidth = 1;
        this.lineCap = 'butt';
    }

    _init() {
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineCap = this.lineCap;
    }

    line(ox, oy, mx, my) {
        this.ctx.beginPath();
        this.ctx.moveTo(ox, oy);
        this.ctx.lineTo(mx, my);
        this.ctx[this.style]();
        console.log(1);
    }

    dash(ox, oy, mx, my) {
        this.ctx.beginPath();
        this.ctx.setLineDash([3, 10]);
        this.ctx.moveTo(ox, oy);
        this.ctx.lineTo(mx, my);
        this.ctx[this.style]();
        this.ctx.setLineDash([0, 0]);
    }

    pencil() {
        let that = this;
        this.mask.onmousedown = function (e) {
            let ox = e.offsetX, oy = e.offsetY;
            that._init();
            that.ctx.beginPath();
            that.ctx.moveTo(ox, oy);
            that.mask.onmousemove = function (e) {
                let mx = e.offsetX, my = e.offsetY;
                that.ctx.clearRect(0, 0, that.cw, that.ch);
                if (that.history.length) {
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                console.log(1);
                that.ctx.lineTo(mx, my);
                that.ctx.stroke();

            };
            that.mask.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0, 0, that.cw, that.ch));
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
            }
        }
    }

    circle(ox, oy, mx, my) {
        let r = Math.sqrt((mx - ox) ** 2 + (my - oy) ** 2);
        this.ctx.beginPath();
        this.ctx.arc(ox, oy, r, 0, Math.PI * 2);
        this.ctx[this.style]();
    }

    rect(ox, oy, mx, my) {
        let w = mx - ox, h = my - oy;
        this.ctx.beginPath();
        this.ctx[this.style + 'Rect'](ox, oy, w, h);
    }

    ploy(ox, oy, mx, my, num) {
        let r = Math.sqrt((mx - ox) ** 2 + (my - oy) ** 2);
        this.poly(ox, oy, r, num);
    }

    poly(ox, oy, r, num = 6) {
        this.ctx.clearRect(0, 0, this.cw, this.ch);
        if (this.history.length) {
            this.ctx.putImageData(this.history[this.history.length - 1], 0, 0);
        }
        let angle = 2 * Math.PI / num;
        this._init();
        this.ctx.beginPath();
        this.ctx.moveTo(ox + r, oy);
        for (let i = 0; i < num; i++) {
            let x = r * Math.cos(angle * i) + ox;
            let y = r * Math.sin(angle * i) + oy;
            this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();
        this.ctx[this.style]();
    }

    ployJ(ox, oy, mx, my, num) {
        let r = Math.sqrt((mx - ox) ** 2 + (my - oy) ** 2);
        this.start(ox, oy, r, num);
    }

    start(ox, oy, r, num) {
        let angle = Math.PI / num;
        this._init();
        this.ctx.beginPath();
        this.ctx.moveTo(ox + r, oy);
        for (let i = 0; i < num * 2 + 1; i++) {
            let x, y;
            if (i % 2 == 0) {
                x = r * Math.cos(angle * i) + ox;
                y = r * Math.sin(angle * i) + oy;
            } else {
                x = r / 3 * Math.cos(angle * i) + ox;
                y = r / 3 * Math.sin(angle * i) + oy;
            }
            this.ctx.lineTo(x, y);
        }
        this.ctx[this.style]();
    };

    draw(type, num) {
        let that = this;
        this.mask.onmousedown = function (e) {
            let ox = e.offsetX, oy = e.offsetY;
            that.mask.onmousemove = function (e) {
                let mx = e.offsetX, my = e.offsetY;
                that.ctx.clearRect(0, 0, that.cw, that.ch);
                if (that.history.length) {
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0);
                }
                that._init();
                that[type](ox, oy, mx, my, num);
            };
            that.mask.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0, 0, that.cw, that.ch));
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
            }
        }
    }

    // 撤销
    back() {
        if (this.history.length) {
            this.history.pop();
            if (this.history.length > 0) {
                this.ctx.putImageData(this.history[this.history.length - 1], 0, 0);
            }
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.cw, this.ch);
    }

    save(type){
        let image=new Image();
        image.src=this.canvas.toDataURL('image/'+type);
        document.body.appendChild(image);
    }

    eraser(eraser, w) {
        let that = this;
        that.mask.onmousedown = function (e) {
            let ox = e.offsetX, oy = e.offsetY;
            eraser.style.display = 'block';
            eraser.style.width = w + 'px';
            eraser.style.height = w + 'px';
            eraser.style.left = ox - w + 'px';
            eraser.style.top = oy - w + 'px';
            that.mask.onmousemove = function (e) {
                let ox = e.offsetX, oy = e.offsetY;
                let lefts = ox - w / 2, tops = oy - w / 2;
                that.ctx.clearRect(lefts, tops, w, w);
                eraser.style.left = lefts + 'px';
                eraser.style.top = tops + 'px';
            };
            that.mask.onmouseup = function () {
                that.history.push(that.ctx.getImageData(0, 0, that.cw, that.ch));
                eraser.style.display = 'none';
                that.mask.onmousemove = null;
                // that.mask.onmousedown = null;
            }
        }
    }
}