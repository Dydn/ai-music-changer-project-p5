song1 = "";
song2 = "";

leftwristX = 0;
leftWristY = 0;

rightwristX = 0;
rightWristY = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

song1_status = "";
song2_status = "";


function preload()
{
    song1 = loadSound("music.mp3")
    song1 = loadSound("music2.mp3")
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    song1_staus = song1.isPlaying();
    song2_staus = song2.isPlaying();

    fill("#ff0000");
    stroke("ff0000");

    if(scoreLeftWrist > 0.002)
    {
    circle(leftWristX, leftWristY, 20);
    song1.stop();
    if(song2_status == false){
        song2.play();
        document.getElementById("song").innerHTML = "playing-peter pan"
    }
}

    if(scoreRightWrist > 0.002)
    {
    circle(righttWristX, rightWristY, 20);
    song2.stop();
    if(song1_status == false){
        song2.play();
        document.getElementById("song2").innerHTML = "playing-harry potter"
    }
    }
}

function play()
{
    song.play();

    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist =  results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX=" + leftWristX +" leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX=" + rightWristX +" rightWristY = "+ rightWristY);
    }
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}