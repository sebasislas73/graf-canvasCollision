const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

class Circle {

constructor(x,y,radius,color,text,speed){

this.posX = x;
this.posY = y;
this.radius = radius;
this.color = color;
this.originalColor = color;
this.text = text;
this.speed = speed;

this.dx = (Math.random()>0.5?1:-1)*speed;
this.dy = (Math.random()>0.5?1:-1)*speed;

}

draw(context){

context.beginPath();

context.strokeStyle = this.color;
context.lineWidth = 2;

context.textAlign = "center";
context.textBaseline = "middle";
context.font = "16px Arial";

context.fillText(this.text,this.posX,this.posY);

context.arc(this.posX,this.posY,this.radius,0,Math.PI*2,false);
context.stroke();

context.closePath();

}

update(context){

this.draw(context);

this.posX += this.dx;
this.posY += this.dy;

if(this.posX + this.radius > canvas.width || this.posX - this.radius < 0){
this.dx = -this.dx;
}

if(this.posY + this.radius > canvas.height || this.posY - this.radius < 0){
this.dy = -this.dy;
}

}

}

let circles = [];

function generateCircles(n){

for(let i=0;i<n;i++){

let radius = Math.random()*30+20;

let x = Math.random()*(canvas.width-radius*2)+radius;
let y = Math.random()*(canvas.height-radius*2)+radius;

let color = `#${Math.floor(Math.random()*16777215).toString(16)}`;

let speed = Math.random()*4+1;

let text = "C"+(i+1);

circles.push(new Circle(x,y,radius,color,text,speed));

}

}

function detectCollisions(){

for(let i=0;i<circles.length;i++){

for(let j=i+1;j<circles.length;j++){

let c1 = circles[i];
let c2 = circles[j];

let dx = c2.posX - c1.posX;
let dy = c2.posY - c1.posY;

let distance = Math.sqrt(dx*dx + dy*dy);

let minDistance = c1.radius + c2.radius;

if(distance < minDistance){

c1.color = "#0000FF";
c2.color = "#0000FF";

/* calcular cuánto se están encimando */
let overlap = minDistance - distance;

/* normalizar dirección */
let nx = dx / distance;
let ny = dy / distance;

/* separarlos */
c1.posX -= nx * overlap/2;
c1.posY -= ny * overlap/2;

c2.posX += nx * overlap/2;
c2.posY += ny * overlap/2;

/* invertir velocidades */
let tempDx = c1.dx;
let tempDy = c1.dy;

c1.dx = c2.dx;
c1.dy = c2.dy;

c2.dx = tempDx;
c2.dy = tempDy;

}else{

c1.color = c1.originalColor;
c2.color = c2.originalColor;

}

}

}

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

circles.forEach(circle=>{
circle.update(ctx);
});

detectCollisions();

requestAnimationFrame(animate);

}

generateCircles(20);

animate();