let answer = random(1, 20);
let done = false;

while (!done) {
    let guess = prompt("Enter a number between 1 and 20");

    if (guess < answer) {
        alert("Too low!");
    }
    else if (guess > answer) {
        alert("Too high!");
    }
    else {
        alert("You got it!");
        done = true
    }
}