const selectedSeatsCount = document.getElementById('count');
const price = document.getElementById('price');
const seats = Array.from(document.querySelectorAll('.seat'));
const bookButton = document.getElementById("bookBtn");
const resetButton = document.getElementById("resetBtn");

let count = 0
let bookedSeatIndex = []

seats.forEach((seat, index) => {
    seat.addEventListener('click', () => selectSeat(seat, index));
})

function checkOccupied(index) {
    if (bookedSeatIndex.length == 0) {
        return true;
    }
    let result = bookedSeatIndex.indexOf(index);
    if (result == -1) {
        return true;
    }
    return false;
}


function selectSeat(seat, index) {
    if (checkOccupied(index)) {
        bookedSeatIndex.push(index)
        let seatId = "#seat" + index
        count++
        document.querySelector(seatId).style.backgroundColor = "#0ff30f"
        displayText()
    }

}

function displayText() {
    bookButton.classList.remove('d-none');
    const selectedMovie = document.getElementById('movie');
    let amount = selectedMovie.value
    selectedSeatsCount.innerText = count;
    price.innerText = amount;
}

function bookSeats() {
    changeSeatColor("rgb(245, 87, 87)")
    bookButton.classList.add('d-none');
    resetButton.classList.remove('d-none');

}

function reset() {
    changeSeatColor("#e8e8fa")
    bookButton.classList.add('d-none');
    count = 0;
    bookedSeatIndex = []
    selectedSeatsCount.innerText = 0
    price.innerText = 0
}

function changeSeatColor(color) {
    bookedSeatIndex.forEach(element => {
        let seatId = "#seat" + element;
        document.querySelector(seatId).style.backgroundColor = color;
    })
}