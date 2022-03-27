let song;
let amp;

let circles = [];
let circlesFilled = [];

let cnv;

let button;
let buttonSave;
let buttonRestart;
let buttonChange;

let isModalOpen = false
let selectedSong = 1
let isMediaButtons = false

async function changeSong(num) {
  selectedSong = num
  // song = await loadSound('sound/' + selectedSong + '.mp3');
  await setup()
  toggleModal()
}



function toggleModal() {
  isModalOpen = !isModalOpen
  document.querySelector('.screen-modal').classList.toggle('open-modal')
}



function onBegin() {
  let elMediaBtn = document.querySelector('.save-btn');
  elMediaBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'nearest'
  })
  // toggleModal()
}

function onPick() {
  let elPick = document.querySelector('.upload-btn');
  elPick.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'nearest'
  })
  // toggleModal()
}



async function setup() {
  song = await loadSound('sound/' + selectedSong + '.mp3');

  // todo: make canvas fit user screen
  cnv = createCanvas(windowWidth, windowHeight - 100);

  // cnv = createCanvas(794 * 1.5, 560 * 1.5);
  pixelDensity(3);

  // Create buttons:

  if (!isMediaButtons) {
    button = createButton('play song');
    button.addClass('media-btn');
    button.addClass('play-btn');

    buttonSave = createButton('Save');
    buttonSave.addClass('media-btn');
    buttonSave.addClass('save-btn');
    button.mousePressed(togglePlaying);

    buttonRestart = createButton('restart');
    buttonRestart.addClass('media-btn');
    buttonRestart.addClass('restart-btn');
    buttonRestart.mousePressed(restartSong);

    // toggle this to show change button + modal
    // buttonChange = createButton('Change song');
    // buttonChange.addClass('media-btn');
    // buttonChange.addClass('change-btn');
    // buttonChange.mousePressed(toggleModal);
  }

  isMediaButtons = true

  background(0);


  line = new Linedraw();
  straightLine = new StraightLinedraw();
  amp = new p5.Amplitude();

  // Create circles array:
  for (let i = 0; i < random(1, 5); i++) {
    circles[i] = {
      circle: new Circledraw(),
      x: random(width),
      y: random(height),
    }
  }

  // Create circles (filled) array:
  for (let i = 0; i < random(1, 5); i++) {

    circlesFilled[i] = {
      circle: new CircleFilldraw(),
      x: random(width),
      y: random(height),
    }
  }

}

function init() {
  const elHero = document.querySelector('.hero')

  elHero.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  })
}

function restartSong() {
  location.reload();
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    button.html('Pause');
    button.addClass('pause-btn');
    button.removeClass('play-btn');
    buttonRestart.addClass('show')
  }
  else {
    song.pause();
    button.html('Resume');
    button.addClass('play-btn');
    button.removeClass('pause-btn');
    buttonRestart.addClass('show')
  }
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


  // CIRCLES:
  for (let i = 0; i < circles.length; i++) {
    // let x = 1 + random(0, width);
    // let y = 1 + random(0, height);

    circles[i].circle.move(circles[i].x, circles[i].y);
    circles[i].circle.show();
  }

  for (let i = 0; i < circlesFilled.length; i++) {
    // let x = 1 + i * 100;
    // let y = 200 + i * 200;
    circlesFilled[i].circle.move(circlesFilled[i].x, circlesFilled[i].y, 1);
  }

  if (vol >= 0.55) {
    if (random(0, 10) < 7) {

      for (let i = 0; i < circles.length; i++) {
        let x = random(100, width) + random(200) * i;
        let y = random(height) + random(100, height) * i;

        circles[i].circle.move(x, y);
        circles[i].circle.show();
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

  let isAddMore = random(1, 1000)

  if (isAddMore > 999) {
    circles.push(
      {
        circle: new Circledraw(),
        x: random(width),
        y: random(height)
      }
    )
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