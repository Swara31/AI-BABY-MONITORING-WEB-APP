video = "";
status = "";
objects = [];


function preload()
{
    video = createVideo('baby.webm');
    video.center();
    video.hide();
}

function setup()
{
    canvas = createCanvas(300, 400);
    canvas.center();
}


function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelloaded);

    document.getElementById('status').innerHTML="Status : Detecting Baby";
}

function draw()
{
    image(video, 0, 0, 380, 380);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);

      objectDetector.detect(video, gotresults);
      for(i = 0; i < objects.length; i++)
      {
        document.getElementById("status").innerHTML="Status : BABY Detected";

        fill("r,g,b");

        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].x , objects[i].y);

        noFill();
        stroke("r,g,b");

        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }
    }
}

function modelloaded()
    {
        console.log('modelloaded');
        status = true;
        video.volume(0);
        video.speed(1);
        video.loop();
    }

function gotresults(error,results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);

    objects = results;
}


