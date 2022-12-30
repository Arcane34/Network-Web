
let particles = [];
let canvasX = 600;
let canvasY = 400;

function setup() {
  createCanvas(canvasX, canvasY);
  for (let j = 0; j < 70; j++){
    let p = new Particle(1,1);
    particles.push(p);
  }
  for (let b = 0; b <6; b++){
    let x = new InvisParticle();
    particles.push(x);
  }
  

}

function mouseClicked(){
  
    for (let d = 0; d < 4; d++){
      p = new Particle(mouseX,mouseY);
      particles.push(p);
    } 
}


function draw() {
  background(0);
  
  if (particles.length < 20){
    let p = new Particle(1,1);
    particles.push(p);
  }
  
  let done = [];
  for (let z = 0; z < particles.length; z++){
    for (let a = 0; a < particles.length; a++){
      if(!done.includes(particles[a])){
         done.push(particles[a]);
         connect(particles[z],particles[a])
      }
    }
    done = [];
  }
  
  for (let i = particles.length-1; i >= 0; i--){
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()){
      particles.splice(i,1);
    }
  }
  
}


function connect(a, b){
  if (255 - Math.hypot(a.get_x()-b.get_x(),a.get_y() - b.get_y())*2 >0.5){
    strokeWeight(1);
    stroke(255, 200 - Math.hypot(a.get_x()-b.get_x(),a.get_y() - b.get_y())*2  );
    line(a.get_x(), a.get_y(), b.get_x(), b.get_y());
  }
}


class Particle {
  constructor(x,y){
    if (x == 1 && y == 1){
      this.x = random(50,canvasX-50);
      this.y = random(50,canvasY-50);
    } else{
      this.x = x;
      this.y = y;
    }
    
    this.vx = random(-1,1)/2;
    this.vy = random(-1,1)/2;
    this.alpha = 255;
  }
  
  get_x(){
    return this.x
  }
  
  get_y(){
    return this.y
  }
  
  update(){
    this.x += this.vx;
    this.y += this.vy;
    }
  
  finished(){
    return !(0<this.x && this.x<canvasX && 0<this.y && this.y<canvasY);
  }
  
  show(){
    noStroke();
    fill(255,this.alpha);
    ellipse(this.x,this.y,3);
  }
}


class InvisParticle {
  constructor(){
    this.x = mouseX;
    this.y = mouseY;
    this.vx = random(-1,1);
    this.vy = random(-1,1);
    this.alpha = 255;
  }
  
  get_x(){
    return this.x
  }
  
  get_y(){
    return this.y
  }
  
  update(){
    this.x = mouseX;
    this.y = mouseY;
    }
  
  finished(){
    return false;
  }
  
  show(){
    noStroke();
    fill(255,this.alpha);
    //ellipse(this.x,this.y,3);
  }
}
