song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;

function preload()
{
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function modelLoaded()
{
    console.log("PNIO");
}

function draw()
{
    image(video,0,0,600,500);

    fill("red");
    stroke("green");
    strokeWeight(5);

    if (scoreLeftWrist>0.2)
    {
    circle(leftWristX,leftWristY,15);
    InNumberleftWristY=Number(leftWristY);
    remove_decimal=Math.floor(InNumberleftWristY);
    if (leftWristY>rightWristY&&leftWristY>0)
    {
        song1.play();
        document.getElementById("volume").innerHTML="Da sOnG Is sOnG 1, yea idk what this song accually is";
    }
    }
}

function gotPoses(results)
{
    if (results.length>0)
    {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("ScOrElEfTwRiSt is" + scoreLeftWrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("LWX=" + leftWristX + "LWY" + leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("RWX=" + rightWristX + "RWY" + rightWristY);
    }
}