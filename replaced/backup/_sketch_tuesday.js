let song;
let button;
let buttonSave;
let amp;
let circles = [];
let circlesFilled = [];
let cnv;



var randomnumber1;
var randomnumber2;
var randomnumber3;
var randomnumber4;
var randomnumber5;


function preload() {
  song = loadSound('music.mp3');
}


function onTry() {
  let elMediaBtn = document.querySelector('.save-btn');
  elMediaBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'nearest'
  })
}

function setup() {

  // todo: make canvas fit user screen
  cnv = createCanvas(794 * 1.5, 560 * 1.5);
  pixelDensity(3);

  // Create buttons:
  button = createButton('play song');
  button.addClass('media-btn');
  button.addClass('play-btn');

  buttonSave = createButton('Save');
  buttonSave.addClass('media-btn');
  buttonSave.addClass('save-btn');

  button.mousePressed(togglePlaying);
  background(0);


  line = new Linedraw();
  straightLine = new StraightLinedraw();
  amp = new p5.Amplitude();


  // Create circles array:
  for (let i = 0; i < random(5); i++) {
    circles[i] = new Circledraw();
  }

  // Create circles (filled) array:
  for (let i = 0; i < random(5); i++) {
    circlesFilled[i] = new CircleFilldraw();
  }

}


// async function loadAudio(ev) {
// var reader = new FileReader();
// reader.onload = function(ev) {

//   };
// reader.readAsDataURL(this.files[0]);

// console.log('ev', ev)

// let audio = new Audio(ev.target[0])
// // song = await loadSound(ev.target[0]);
// console.log('INPUT FILE', ev.files[0])
// song = await loadSound(audio);
// song.play();
// }

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    // song.setVolume(0.5);
    button.html('Pause');
    button.addClass('pause-btn');
    button.removeClass('play-btn');
  }
  else {
    song.pause();
    button.html('Resume');
    button.addClass('play-btn');
    button.removeClass('pause-btn');
  }

  randomnumber1 = random(50, 100);
  randomnumber2 = random(200);
  randomnumber3 = random(300);
  randomnumber4 = random(400);
  randomnumber5 = random(500);

}

function draw() {
  if (!song.isPlaying()) return
  let vol = amp.getLevel();
  // let len = song.duration();
  // let t = random(len);


  line.show();
  line.move();
  straightLine.show();
  straightLine.move();

  // function getRandomCirclePosition(min, max, idx) {
  //   ret
  // }


  // CIRCLES:
  for (let i = 0; i < circles.length; i++) {


    // console.log('vol', vol);

    let x = 1+random(0, width);
    let y = 1+random(0, height);



    // let x = randomnumber1 + randomnumber2 * i;
    // let y = randomnumber3 + randomnumber1 * i;
    circles[i].move(x, y);
    circles[i].show();
  }

  //for (let i = 0; i < circles.length; i++) {
  // let x = random(200) + random(200) * i;
  // let y = random(200) + 40 * i;
  //circles[i].move(x, y);
  // circles[i].show();
  //}

  for (let i = 0; i < circlesFilled.length; i++) {
    let x = 1 + i * 100;
    let y = 200 + i * 200;
    circlesFilled[i].move(x, y, 1);
  }

  if (vol >= 0.55) {
    if (random(0, 10) < 7) {

      for (let i = 0; i < circles.length; i++) {
        let x = random(100, width) + random(200) * i;
        let y = random(height) + random(100, height) * i;
        circles[i].move(x, y);
        circles[i].show();
      }
    }
    else {
      stroke(255);
      strokeWeight(random(0, 3));

      for (i = 0; i < 5; i++) {
        ellipse(random(0, width) * i, random(0, height), 20 * i);
      }
    }
  }


  buttonSave.mousePressed(imageSave);
}

function imageSave() {
  save('score.jpg');
}

class Circledraw {
  constructor(x, y) {
    this.r = random(50, 100);
    this.x = x;
    this.y = y;
  }

  show() {
    stroke(255);
    strokeWeight(2);
    point(this.x, this.y);
  }

  move(x, y) {
    let nFrames = 200;
    let timing = (frameCount) / nFrames;
    this.x = x - this.r * cos(TWO_PI * timing);
    this.y = y - this.r * sin(TWO_PI * timing);
  }


}

class Linedraw {
  constructor() {
    this.x = 0;
    this.y = random(0, height);
  }

  show() {
    stroke(255);
    strokeWeight(1);
    point(this.x, this.y);
  }

  move() {
    this.x++;
    if (this.x > random(0, width)) {
      this.y = this.y - tan(random(height / random(1, 3), height));
    }
    if (this.x > width) {
      this.x = 0;
      this.y = random(0, height);
    }
    if (this.y > height) {
      this.y = 0;
      this.y++;
    }
  }
}

class StraightLinedraw {
  constructor() {
    this.x = 0;
    this.y = random(0, height);
  }

  show() {
    stroke(255);
    strokeWeight(1);
    point(this.x, this.y);
  }

  move() {
    this.x++;
    if (this.x > width) {
      this.x = 0;
      this.y = random(0, height);
    }
  }
}

class CircleFilldraw {
  constructor() {
  }

  move(x, y) {
    stroke(255);
    noFill();
    beginShape();
    for (let i = 0; i < 360 * 2; i++) {
      this.r = random(0, 70);
      this.x = x + this.r * cos(i);
      this.y = y + this.r * sin(i);
      point(this.x, this.y);
      endShape();
    }
  }
}

class shapesdraw {
  constructor() {
  }

  move(x, y, z) {
    stroke(255);
    noFill();
    beginShape();
    for (let i = 0; i < 360 * 2; i++) {
      this.r = random(0, 70);
      this.x = x + this.r * cos(i);
      this.y = y + this.r * sin(i * z);
      point(this.x, this.y);
      endShape();
    }
  }
}