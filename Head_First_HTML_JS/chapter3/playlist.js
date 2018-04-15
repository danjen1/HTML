/* playlist.js */

window.onload = init;
var count = 1;

function init() {

    var addButton = document.getElementById("addButton");
	var delButton = document.getElementById("delButton");
    var clrButton = document.getElementById("clrButton");
    addButton.onclick = addHandleButtonClick;
    delButton.onclick = delHandleButtonClick;
    clrButton.onclick = clrHandleButtonClick;

}


function addHandleButtonClick(e) {
    var songTextInput = document.getElementById("songTextInput");
    var songName = songTextInput.value;
    var artistTextInput = document.getElementById("artistInput");
    var artistName = artistTextInput.value;
    var genreTextInput = document.getElementById("genreInput");
    var genre = genreTextInput.value;

    //loadPlaylist()

	if (songName == "" || genre == "" || artistName == "") {
		alert("Please enter a value for all 3 fields");
	}
	else {
		var li = document.createElement("li");
		li.innerHTML = "# " + count + "<br>Song: " + songName + "<br>Artist: " + artistName +
            "<br>Genre: " + genre;
		var ul = document.getElementById("playlist");
		ul.appendChild(li);
        alert("Added Song #" + count + "\n"  + songName);
        count++;
        songTextInput.value = "";
        artistTextInput.value = "";
        genreTextInput.value = "";

		//save(songName);
	}
}

function delHandleButtonClick(e) {
    var songNum = prompt("Enter the Song you'd like to delete:");
    var li = document.getElementById("playlist");
    var songTextInput = document.getElementById("songTextInput");
    var songName = songTextInput.value;

    if (songNum < 0 || li.innerHTML == "") {
        alert("There's nothing to do");
    } else {
        li.removeChild(li.childNodes[songNum]);
        alert("Deleted Song #" + songNum + "\n"  + songName);
        for (let i = 0; i < li.length; i++) {

        }
    }
}

function clrHandleButtonClick(e) {
    var ans = confirm("Are you sure?");
    var li = document.getElementById("playlist");


    if (ans == true) {
        li.innerHTML = "";
        count = 1;
    } else {
        alert("Phew you're safe!");
    }

}


