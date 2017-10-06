var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');	//puts all methods of canvas in variable c, this is like a magic brush used to create different 2d shapes

/*
c.fillStyle = 'rgba(0, 0, 255, 0.5)';	// command for coloring rectangle
c.fillRect(100,100,100,100);
console.log(canvas);

//Line
c.beginPath();	//command to start a line
c.moveTo(50, 300);	//starting point of line
c.lineTo(300, 100);	//end point of line
c.strokeStyle = "pink"; // command for coloring line
c.stroke();	//command to make line appear

//Arc or Circle, c.arc(xint,yint,radius, startAngle, endAngle, drawCounterClockwise);
c.beginPath();
c.arc(300, 300, 30, 0, Math.PI * 2, false);
c.strokeStyle = 'blue';
c.stroke();
*/

//Animate circle

var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 40;
//var minRadius = 2;
var colorArray = [
'#2C3E50',
'#E74C3C',
'#F1F0C0',
'#3498DB',
'#70B95D',
];

window.addEventListener('mousemove', 
	function(event){
		mouse.x = event.x;
		mouse.y = event.y;
})

window.addEventListener('resize', 
	function(){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		init();
})

function Circle(x, y, dx, dy, radius){

	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw = function(){
		
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}

	this.update = function(){
		this.x += this.dx;
		this.y += this.dy;
		if(this.x + this.radius > innerWidth || this.x - this.radius < 0)
		{
			this.dx = -this.dx;
		}
		if(this.y + this.radius > innerHeight || this.y - this.radius < 0)
		{
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;

		//interactivity
		if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50)
		{
			if(this.radius < maxRadius)
			{
				this.radius += 1;
			}
		}
		else if(this.radius > this.minRadius)
		{
			this.radius -= 1;
		}
		this.draw();
	}
}

var circleArray = [];

function init(){
	circleArray = [];
	for (var i = 0; i < 850; i++) {

	var radius = (Math.random()*3) + 1;
	var x = (Math.random()*(innerWidth - radius*2)) + radius;
	var y = (Math.random()*(innerHeight - radius*2)) + radius;
	var dx = (Math.random() - 0.5) * 2;
	var dy = (Math.random() - 0.5) * 2;
	
	circleArray.push(new Circle(x,y,dx,dy,radius));
	}
}

init();

function animate()
{
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}
animate();