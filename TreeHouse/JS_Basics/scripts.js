var message = "Hello!";


function getRandomNumber( upper ) {
    var randomNumber = Math.floor(Math.random() * upper) + 1;
    return randomNumber;
}

console.log(getRandomNumber(15));

function calculateArea( width, length ) {
    return width * length;
}

calculateArea( 5, 4 ); // 20
calculateArea( 30, 4 ); // 120

function getRandomNumber(lower, upper) {
    if ( isNaN(lower) || isNaN(upper)) {
        throw new Error('Must be a number for each argument');
    } else {

        console.log("Randome number between " + lower + " " + upper);
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    }
}

console.log(getRandomNumber(15, 26));
