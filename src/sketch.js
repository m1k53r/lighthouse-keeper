let radius = 400;
let xc = 400;
let yc = 400;

let gp = {
  fst: [{ x: xc, y: yc }],
  snd: [{ x: xc, y: yc }],
  trd: [{ x: xc, y: yc }],
  frt: [{ x: xc, y: yc }],
};

function setup() {
  createCanvas(800, 800);
  frameRate(30);
}

function draw() {
  background(220);
  noFill();
  stroke(0, 0, 0);
  circle(xc, yc, radius * 2);
  
  // Game loop
  game();
}

function generatePoints(x, y) {
  let distance = Math.floor(Math.random() * 20);
  let newx = x;
  let newy = y;

  // Move either left or right
  if (Math.random() > 0.5) newx -= distance;
  else newx += distance;
  
  // Move either up or down
  if (Math.random() > 0.5) newy -= distance;
  else newy += distance;

  return { x: newx, y: newy };
}

function checkWin() {
  let wins = [];
  for (const [key, value] of Object.entries(gp)) {
    let x = value.at(-1).x;
    let y = value.at(-1).y;
    let d = Math.sqrt(Math.pow(x - xc, 2) + Math.pow(y - yc, 2));
    wins.push(Math.pow(d, 2) < Math.pow(radius, 2));
  }
  return wins.every((x) => x);
}

function game() {
  if (checkWin()) {
    // Generate new pair of moves for every player
    for (const [key, value] of Object.entries(gp)) {
      let points = generatePoints(value.at(-1).x, value.at(-1).y);
      gp[key].push(points);
    }
  }

  for (let j = 0; j < Object.entries(gp).length; j++) {
    // Helper variable
    let value = Object.entries(gp)[j][1];
    for (let i = 0; i < value.length - 1; i++) {
      // Pick a color
      if (j === 0) stroke(0, 0, 0);
      else if (j === 1) stroke(255, 23, 12);
      else if (j === 2) stroke(50, 128, 50);
      else stroke(33, 57, 255);
      // Draw movement
      line(value[i].x, value[i].y, value[i + 1].x, value[i + 1].y);
    }
  }
}