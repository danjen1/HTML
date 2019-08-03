/*
XMLHttpRequest
window.onload = init;

function init(){

    var url = "http://gumball.wickedlysmart.com";



    var request = new XMLHttpRequest();

    request.open("GET", url);
    request.onload = function() {
        if (request.status == 200) {
            updateSales(request.responseText);
        }
    };
    request.send(null);

}
 */
var lastReportTime = 0;
window.onload = function(){
    setInterval(handleRefresh, 3000);
};

function handleRefresh() {

    var url = "http://gumball.wickedlysmart.com" +
        "?callback=updateSales" +
        "&lastreporttime" + lastReportTime +
        "&random=" + (new Date()).getTime();
    var newScriptElement = document.createElement("script");
    newScriptElement.setAttribute("src", url);
    newScriptElement.setAttribute("id", "jsonp");
    var oldScriptElement = document.getElementById("jsonp");
    var head = document.getElementsByTagName("head")[0];
    if (oldScriptElement == null) {
        head.appendChild(newScriptElement);
    }
    else {
        head.replaceChild(newScriptElement, oldScriptElement);
    }
}


function updateSales(sales) {
    var salesDiv = document.getElementById("sales");
    //var sales = JSON.parse(responseText);
    for (var i = 0; i < sales.length; i++){
        var sale = sales[i];
        var div = document.createElement("div");
        div.setAttribute("class", "saleItem");
        div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
        salesDiv.appendChild(div);
    }
    if (sales.length > 0){
        lastReportTime = sales[sales.length-1].time;
    }
}

/*
window.onload = init;

var movie = new Movie("Plan 9 from Outer Space",
    "Cult Classic",
    2,
    ["3:00pm", "7:00pm", "11:00pm"]);
var json = JSON.stringify(movie);

function init(){

    var aButton = document.getElementById("stringify");
    var bButton = document.getElementById("parse");

    aButton.onclick = aRun;
    bButton.onclick = bRun;
}

function aRun(){
    alert(json);
}

function bRun(){
    var jsonObject = JSON.parse(json);
    alert("Title: " + jsonObject.title);
}

function Movie(title, genre, rating, showtimes) {
    this.title = title;
    this.genre = genre;
    this.rating = rating;
    this.showtimes = showtimes;

}
 */
