var song="";
var leftwristX=0;
var leftwristY=0;
var rightwristX=0;
var rightwristY=0;
var scoreLeftwrist=0;
var scoreRightwrist=0;

function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,600);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotposes);
}
function draw(){
    image(video,0,0,600,600);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightwrist>0.2){
        circle(rightwristX,rightwristY,20);
    if(rightwristY>0&&rightwristY<=100){
        document.getElementById("speed").innerHTML="speed=  0.5x";
        song.rate(0.5);
    }
    else if(rightwristY>100&&rightwristY<=200){
        document.getElementById("speed").innerHTML="speed=  1x";
        song.rate(1);
    }
    else if(rightwristY>200&&rightwristY<=300){
        document.getElementById("speed").innerHTML="speed=  1.5x";
        song.rate(1.5);
    }
    else if(rightwristY>300&&rightwristY<=400){
        document.getElementById("speed").innerHTML="speed=  2x";
        song.rate(2);
    }
    else if(rightwristY>400&&rightwristY<=500){
        document.getElementById("speed").innerHTML="speed=  2.5x";
        song.rate(2.5);
    }
    }
    
    
    if(scoreLeftwrist>0.2){
        
    circle(leftwristX,leftwristY,20);
    inNumberLeftwristY=Number(leftwristY);
    removeDecimals=floor(inNumberLeftwristY);
    volume=removeDecimals/500;
    song.setVolume(volume);
    document.getElementById("volume").innerHTML="volume= "+volume;
    }

}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("poseNet is initialized");
}
function gotposes(results){
    if(results.length>0){
        console.log(results);
        scoreRightwrist=results[0].pose.keypoints[10].score;
    console.log("scoreRightwrist= "+scoreRightwrist);
        scoreLeftwrist=results[0].pose.keypoints[9].score;
    console.log("scoreLeftwrist= "+scoreLeftwrist);
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;
        console.log("leftwristX=  "+leftwristX+" leftwristY=  "+leftwristY+" rightwristtX=  "+rightwristX+" rightwristY=  "+rightwristY);
        
    }
}
