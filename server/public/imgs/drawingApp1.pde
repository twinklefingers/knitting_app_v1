int value; // this determines (for now) whether you draw black or white, colors to come

void setup() {
size(500,500);
background(#FFFFFF); // white canvas

}

void draw(){
  drawLine();

}

void drawLine(){
  noStroke();
    if (mousePressed == true) {
      stroke(0);
      strokeWeight(3);
    }
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
