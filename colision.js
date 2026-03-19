const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let estrellas = [];
let score = 0;

let img = new Image();
img.src = "estrella.png";

class Estrella{

constructor(x,y,size,speed){

this.x = x;
this.y = y;
this.size = size;
this.speed = speed;

this.rotation = Math.random()*360;
this.rotationSpeed = Math.random()*0.1;

}

draw(){

ctx.save();

ctx.translate(this.x+this.size/2,this.y+this.size/2);

ctx.rotate(this.rotation);

ctx.shadowColor="yellow";
ctx.shadowBlur=30;

ctx.drawImage(img,-this.size/2,-this.size/2,this.size,this.size);

ctx.restore();

}

update(){

this.y += this.speed;
this.rotation += this.rotationSpeed;

if(this.y > canvas.height){

this.reset();

}

this.draw();

}

reset(){

this.y = -100;
this.x = Math.random()*canvas.width;

}

}

function generarEstrellas(n){

for(let i=0;i<n;i++){

let size = Math.random()*90+70;

let x = Math.random()*canvas.width;
let y = Math.random()*-800;

let speed = Math.random()*2+2;

estrellas.push(new Estrella(x,y,size,speed));

}

}

canvas.addEventListener("click",(event)=>{

let mouseX = event.clientX;
let mouseY = event.clientY;

estrellas.forEach(e=>{

if(

mouseX > e.x &&
mouseX < e.x + e.size &&
mouseY > e.y &&
mouseY < e.y + e.size

){

score++;

document.getElementById("contador").innerText = score;

e.reset();

}

});

});

function dificultad(){

estrellas.forEach(e=>{

if(score>20){

e.speed=10;

}else if(score>10){

e.speed=6;

}else{

e.speed=3;

}

});

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

estrellas.forEach(e=>{
e.update();
});

dificultad();

requestAnimationFrame(animate);

}

generarEstrellas(15);

animate();