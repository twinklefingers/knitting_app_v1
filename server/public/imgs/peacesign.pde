
void setup() {
  size(500,500);
  colorMode(HSB, 100, 1, 1);
  //noStroke(); // noStroke() had prevented the lines from showing up
}

void draw(){

  background(12.5 * sin(frameCount/100.0) + 12.5, 1, 1); // yellow orange red green
  //background(12.5 * cos(frameCount/100.0) + 37.5, 1, 1); // green and aqua
  fill(12.5 * cos(frameCount/100.0) + 62.5, 1, 1); // purple blue aqua
  //fill(12.5 * sin(frameCount/100.0) + 87.5, 1, 1); // pink red purple
    // only the last fill() runs when all uncommented

  strokeWeight(30); // sets boldness of lines
  stroke(12.5 * sin(frameCount/100.0) + 87.5, 1, 1);  // changes color of lines
  ellipse(250, 250, 300, 300);
  //ellipseMode(CENTER);  // not needed when ellipse positioned as is on 500x500 canvas

  line(250,100,250,400); // splits pie in half
  line(250,265,350, 360); // adds right side spoke
  line(250,265,150,360); // adds left side spoke

}
