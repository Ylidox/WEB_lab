class Layer{
	constructor(container){
		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext('2d');
		container.appendChild(this.canvas);

		this.update(this.canvas);
		addEventListener('resize', () => this.update(this.canvas));
	}
	update(cnv){
		cnv.width = cnv.offsetWidth;
		cnv.height = cnv.offsetHeight;
	}
}

class Slider{
	constructor(container, options){
		this.back = new Layer(container);
		this.front = new Layer(container);

		this.front.left = 0;
		this.front.right = 0;
		this.leftIncrease = 0;
		this.rightIncrease = 0;

		this.width 		= this.back.canvas.width;
		this.height 	= this.back.canvas.height;
		this.sizeArrows = options.sizeArrows;
		this.sizeSide	= options.sizeSide;
		this.heightText = options.heightText;
		this.paths 		= options.paths;
		this.pathsWings = options.pathsWings;
		this.wings 		= [];
		this.images 	= [];
		this.index 		= 0;
		this.colorArrow = options.colorArrow;

		this.init();
	}
	init(){
		for(let i = 0; i < this.pathsWings.length; i++){
			this.wings[i] = new Image();
			this.wings[i].src = this.pathsWings[i];
		}
		for(let i = 0; i < this.paths.length; i++){
			this.images[i] = new Image();
			this.images[i].src = this.paths[i];
		}
		this.images[0].onload = () => {
			this.drawImage(0);
		}
		this.switchImage();
		this.showArrows();
	}
	drawImage(index){
		let ctx = this.back.ctx;
		let timer = setInterval(() => {
			ctx.rect(0, 0, this.width, this.height);
			ctx.fillStyle = this.colorArrow;
			ctx.fill();
		}, 30);
		setTimeout(() => {
			clearInterval(timer);
			ctx.drawImage(this.images[ index ], 0, 0, this.width, this.height);
		}, 150);
		
	}
	indexChanges(n){
		this.index += n;
		if(this.index >= this.images.length) this.index = 0;
		if(this.index < 0) this.index = this.images.length - 1;
	}
	switchImage(){
		this.front.canvas.onclick = (event) => {
			if(this.rightSide(event.offsetX)) this.indexChanges(1);
			if(this.leftSide(event.offsetX)) this.indexChanges(-1);
			
			this.drawImage(this.index);
		}	
	}
	rightSide(x){
		if(x > this.width - this.sizeSide) return true;
		else return false;
	}
	leftSide(x){
		if(x < this.sizeSide) return true;
		else return false;
	}

	showArrows(){
		this.front.canvas.onmousemove = (event) => {
			if(this.leftSide(event.offsetX)) this.leftIncrease = 1;
			else this.leftIncrease = 0;

			if(this.rightSide(event.offsetX)) this.rightIncrease = 1;
			else this.rightIncrease = 0;
		}

		let run = false;
		let slider = this;
		let loop = () => {
			slider.clearfront();
			switch(slider.leftIncrease){
				case 1: slider.showLeftSide();
				case 0: slider.hideLeftSide();
			}
			switch(slider.rightIncrease){
				case 1: slider.showRightSide();
				case 0: slider.hideRightSide();
			}
		
			requestAnimationFrame(loop);	
		}

		this.front.canvas.onmouseout = (event) => {
			this.leftIncrease = 0;
			this.rightIncrease = 0;
		}

		this.front.canvas.onmouseover = (event) => {	
			if(!run){
				loop();
				run = true;
			}
		}

		
	}
	clearfront(){
		let ctx = this.front.ctx;
		ctx.clearRect(0, 0, this.width, this.height);
	}
	hideLeftSide(){
		let width = this.front.left;
		let ctx = this.front.ctx;
		ctx.beginPath();
			ctx.rect(0, 0, width, this.height);
			ctx.fillStyle = this.colorArrow;
			ctx.fill();
		ctx.closePath();
		width -= 3;
		if(width <= 0) width = 0;

		this.front.left = width;
	}
	showLeftSide(){
		let width = this.front.left;
		let ctx = this.front.ctx;
		
		ctx.beginPath();
			ctx.rect(0, 0, width, this.height);
			ctx.fillStyle = this.colorArrow;
			ctx.fill();
		ctx.closePath();

		if(width > this.sizeArrows){
			let x = (width - this.sizeArrows) / 2;
			let y = (this.height - this.sizeArrows) / 2;
			
			ctx.drawImage(this.wings[0], x, y, this.sizeArrows, this.sizeArrows);
		}

		width += 10;
		if(width >= this.sizeSide) width = this.sizeSide;

		this.front.left = width;
	}
	showRightSide(){
		let width = this.front.right;
		let ctx = this.front.ctx;
		ctx.beginPath();
			ctx.rect(this.width - width, 0, width, this.height);
			ctx.fillStyle = this.colorArrow;
			ctx.fill();
		ctx.closePath();

		if(width > this.sizeArrows){
			let x = this.width - width + (width - this.sizeArrows) / 2;
			let y = (this.height - this.sizeArrows) / 2;
			
			ctx.drawImage(this.wings[1], x, y, this.sizeArrows, this.sizeArrows);
		}

		width += 10;
		if(width >= this.sizeSide) width = this.sizeSide;

		this.front.right = width;
	}
	hideRightSide(){
		let width = this.front.right;
		let ctx = this.front.ctx;
		ctx.beginPath();
			ctx.rect(this.width - width, 0, width, this.height);
			ctx.fillStyle = this.colorArrow;
			ctx.fill();
		ctx.closePath();
		width -= 3;
		if(width <= 0) width = 0;

		this.front.right = width;
	}
}

window.onload = () => {
	new Slider(slider1, {
		sizeSide: 100,
		sizeArrows: 50,
		heightText: 100,
		paths: ['../img/berlin/brand_tor.jpg', '../img/berlin/unter_den_linder.jpg',
		'../img/berlin/alex_platz.jpg', '../img/berlin/reichstag.jpg'],
		pathsWings: ['../img/wings/left.png', '../img/wings/right.png'],
		colorArrow: 'rgba(250, 250, 250, 0.3)'
	});

	new Slider(slider2, {
		sizeSide: 100,
		sizeArrows: 50,
		heightText: 100,
		paths: ['../img/paris/luvr.jpg', '../img/paris/notr_dam.jpg',
		'../img/paris/vers_s.jpg', '../img/paris/e_tower.jpg'],
		pathsWings: ['../img/wings/left.png', '../img/wings/right.png'],
		colorArrow: 'rgba(250, 250, 250, 0.3)'
	});
}