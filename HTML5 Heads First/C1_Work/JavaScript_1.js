
var drink = "Energy Drinks";
var lyrics = "";
var cans = 99;

while (cans > 0 ) {
    lyrics = lyrics + cans + " cans of " + drink + " on the wall <br>";
    lyrics = lyrics + cans + " can of " + drink + "<br>";
    lyrics = lyrics + "Take one down, pass it around, <br>";

    if (cans > 1 ) {
        lyrics = lyrics + (cans -1) + " cans of " + drink + " on the wall <br>";
    }
    else {
        lyrics = lyrics + "No more cans of " + drink + " on th wall <br>";
    }
    cans = cans -1;

}
docment.write(lyrics);