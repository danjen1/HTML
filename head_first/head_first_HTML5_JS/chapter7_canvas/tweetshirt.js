

window.onload = function() {
    var button = document.getElementById("preview");
    button.onclick = previewHandler;
    makeImage();
};

function previewHandler(){
    var canvas = document.getElementById("tshirtCanvas");
    var context = canvas.getContext("2d");
    fillBackground(canvas, context);
    var selectObj = document.getElementById("shape");
    var index = selectObj.selectedIndex;
    var shape = selectObj[index].value;
    if (shape == "squares"){
        for (var squares = 0; squares < 20; squares++)
        {
            drawSquare(canvas, context);
        }
    } else if (shape == "circles") {
        for (var circles = 0; circles < 20; circles++){
            drawCircle(canvas, context);
        }
    }
    drawBird(canvas, context);
    drawText(canvas, context);

}

function drawSquare(canvas, context){
    var w = Math.floor(Math.random() * 40);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);
    context.fillStyle = "lightblue";
    context.fillRect(x, y, w, w);
}

function drawCircle(canvas, context) {

    var radius = Math.floor(Math.random() * 40);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);
    context.beginPath();
    context.arc(x, y, radius, 0, degreesToRadians(360), false);
    context.fillStyle = "lightblue";
    context.fill();

}

function degreesToRadians(degrees) {
    return (degrees * Math.PI)/180;
}

function fillBackground(canvas, context){
    var selectObject = document.getElementById("background");
    var index = selectObject.selectedIndex;
    var bgColor = selectObject[index].value;
    context.fillStyle = bgColor;
    context.fillRect(0, 0, 600, 200);

}

function updateTweets(tweets){
    var tweetSelection = document.getElementById("tweets");
    for (var i = 0; i < tweets.length; i++){
        var tweet = tweets[i];
        var option = document.createElement("option");
        option.text = tweet.text;
        option.value = tweet.text.replace("\"", "'");
        tweetSelection.options.add(option);

    }
    tweetSelection.selectedIndex = 0;
}

function drawText(canvas, context){
    var selectObj = document.getElementById("fgColor");
    var index = selectObj.selectedIndex;
    var fgColor = selectObj[index].value;

    context.fillStyle = fgColor;
    context.font = "bold 1em sans-serif";
    context.textAlign = "left";
    context.fillText("I saw this tweet", 20, 40);

    selectObj = document.getElementById("tweets");
    index = selectObj.selectedIndex;
    var tweet = selectObj[index].value;
    context.font = "italic 1.2em serif";
    context.fillText(tweet, 30, 100);

    context.font = "bold 1em sans-serif";
    context.textAlign = "right";
    context.fillText("and all I got was this lousy t-shirt!", canvas.width -20, canvas.height - 40);
}

function drawBird(canvas, context) {
    var twitterBird = new Image();
    twitterBird.src = "twitterBird.png";
    twitterBird.onload = function () {
        context.drawImage(twitterBird, 20, 120, 70, 70);
    };
}

function makeImage(){
    var canvas = document.getElementById("tshirtCanvas");
    canvas.onclick = function(){
        var img = canvas.toDataURL("image/png");
        window.location = img;
    };
}