let canvas = document.getElementById("paint-area");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let context = canvas.getContext("2d");
context.strokeStyle = "black";
context.lineWidth = 1;


let offsetX = canvas.offsetLeft;
let offsetY = canvas.offsetTop;

let btnState={
  line:false,
  clear:false,
  circle:false,
  rectangle:true,
  pen:false,
  text:false,
  eraser:false
};

let line=document.getElementById("line");
let clear = document.getElementById("clear");
let circle=document.getElementById("circle");
let rectangle=document.getElementById("rectangle");
let pen = document.getElementById("pen");
let text=document.getElementById("text");
let eraser=document.getElementById("eraser");

circle.onclick=()=>{
  for(let btn of Object.keys(btnState)){
    if(btn==='circle')
        btnState['circle']=true;
    else
        btnState[btn]=false;
  }
}

pen.onclick=()=>{
  for(let btn of Object.keys(btnState)){
    if(btn==='pen')
        btnState['pen']=true;
    else
        btnState[btn]=false;
  }
}

text.onclick=()=>{
  for(let btn of Object.keys(btnState)){
    if(btn==='text')
        btnState['text']=true;
    else
        btnState[btn]=false;
  }
}

const clearCanvas=()=>{
  context.clearRect(0, 0, canvas.width, canvas.height);
}

clear.onclick = () => {
  clearCanvas();
  shapes.length=0;
};

rectangle.onclick=()=>{
  for(let btn of Object.keys(btnState)){
    if(btn==='rectangle')
        btnState['rectangle']=true;
    else
        btnState[btn]=false;
  }
}

line.onclick=()=>{
  for(let btn of Object.keys(btnState)){
    if(btn==='line')
        btnState['line']=true;
    else
        btnState[btn]=false;
  }
}

eraser.onclick=()=>{
  for(let btn of Object.keys(btnState)){
    if(btn==='eraser')
        btnState['eraser']=true;
    else
        btnState[btn]=false;
  }
}

let shapes = [];



const getRandomColor = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

class Eraser{

  constructor(x,y){
    this.x=x;
    this.y=y;
  }
  draw(){
    console.log(this.x,this.y);
    context.clearRect(this.x, this.y,30, 30);
  }

  fill(){

  }
}

class Pen{
  constructor(startx,starty,endx,endy){
    this.startx=startx;
    this.starty=starty;
    this.endx=endx;
    this.endy=endy;
  }

  draw() {
    context.beginPath();
    context.moveTo(this.startx,this.starty);
    context.lineTo(this.endx,this.endy);
    context.stroke();
  }

  fill(){

  }
}

class Line{

  constructor(startx,starty,endx,endy){
    this.startx=startx;
    this.starty=starty;
    this.endx=endx;
    this.endy=endy;
  }

  draw() {
    context.beginPath();
    context.moveTo(this.startx,this.starty);
    context.lineTo(this.endx,this.endy);
    context.stroke();
  }

  fill(){

  }
}

class Circle{
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.stroke();
  }

  fill(){

  }

  move(x, y) {
    this.x = x;
    this.y = y;
    this.draw();
  }

}

class Text{
  constructor(x, y,text) {
    this.x = x;
    this.y = y;
    this.text=text;
  }


}

class Rectangle {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
  draw() {
    context.strokeRect(this.x, this.y, this.width, this.height);
  }

  fill() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  move(x, y) {
    this.x = x;
    this.y = y;
    this.draw();
  }

}

let inexistingShape = (x, y) => {
  for (let shape of shapes) {
    if (
      x >= shape.x &&
      x <= shape.x + shape.width &&
      y >= shape.y &&
      y <= shape.y + shape.height
    ) {
      return shapes.indexOf(shape);
    }
  }
  return -1;
};


const drawShapes = () => {
  let isBeingDragged = false;
  let shapeExists = false;
  let startx;
  let starty;
  let shape;
  let toMoveIndex;

  const handleMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    startx = parseInt(event.clientX - offsetX);
    starty = parseInt(event.clientY - offsetY);
    toMoveIndex = inexistingShape(startx, starty);
    if (toMoveIndex !== -1) shapeExists = true;
    else shapeExists=false;
    isBeingDragged = true;
  };

  const handleMouseUp = (event) => {
    event.preventDefault();
    event.stopPropagation();
    isBeingDragged = false;
    if (!shapeExists) shapes.push(shape);
    clearCanvas();
    for(shape of shapes){
      shape.draw();
      shape.fill();
    }
    
  };

  const handleMouseOut = (event) => {
    event.preventDefault();
    event.stopPropagation();
    isBeingDragged = false;
  };

  const handleMouseMove = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isBeingDragged) return;
    mouseX = parseInt(event.clientX - offsetX);
    mouseY = parseInt(event.clientY - offsetY);
    width = mouseX - startx;
    height = mouseY - starty;
    if (shapeExists){ 
        clearCanvas();
        shapes[toMoveIndex].move(mouseX, mouseY);}
    else{
      Object.filter=(btnState)=>{
        for(let btn of Object.keys(btnState)){
            if(btnState[btn]===true) return btn;
        }
    }
    if(Object.filter(btnState)==='rectangle')
        shape = new Rectangle(startx,starty,width,height,getRandomColor());
    else if(Object.filter(btnState)==='line')
        shape = new Line(startx,starty,startx+width,starty+height);
    else if(Object.filter(btnState)==='pen')
        shape = new Pen(startx,starty,startx+width,starty+height);
    else if(Object.filter(btnState)==='circle')
        shape = new Circle(startx,starty,(width+height)/2);
    else if(Object.filter(btnState)==='eraser')
        shape = new Eraser(startx,starty);
    clearCanvas();
    shape.draw();
    }
  };

  const handleDblClick=(event)=>{
    event.preventDefault();
    event.stopPropagation();
    startx = parseInt(event.clientX - offsetX);
    starty = parseInt(event.clientY - offsetY);
    toMoveIndex = inexistingRect(startx, starty);
    shapes.splice(toMoveIndex,1);
    clearCanvas();
    for(rec of shapes){
      rec.draw();
      rec.fill();
    }
  }

  
canvas.addEventListener("mousedown", function (event) {
  handleMouseDown(event);
});
canvas.addEventListener("mouseout", function (event) {
  handleMouseOut(event);
});
canvas.addEventListener("mouseup", function (event) {
  handleMouseUp(event);
});

canvas.addEventListener("mousemove", function (event) {
  handleMouseMove(event);
});

canvas.addEventListener("dblclick", function (event) {
  handleDblClick(event);
});

};

drawShapes();
