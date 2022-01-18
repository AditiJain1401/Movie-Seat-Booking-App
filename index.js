/*const selectedSeatsCount = document.getElementById('count');
const price = document.getElementById('price');
const seats = Array.from(document.querySelectorAll('.seats .seat'));
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
    resetButton.classList.add('d-none');
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
}*/

const seats = [
    { price: 200, num: "seat00", isOccupied: false, isSelected: false },
    { price: 200, num: "seat01", isOccupied: false, isSelected: false },
    { price: 150, num: "seat02", isOccupied: false, isSelected: false },
    { price: 150, num: "seat03", isOccupied: false, isSelected: false },
    { price: 150, num: "seat04", isOccupied: false, isSelected: false },
    { price: 150, num: "seat05", isOccupied: false, isSelected: false },
    { price: 200, num: "seat06", isOccupied: false, isSelected: false },
    { price: 200, num: "seat07", isOccupied: false, isSelected: false },
    { price: 300, num: "seat10", isOccupied: false, isSelected: false },
    { price: 300, num: "seat11", isOccupied: false, isSelected: false },
    { price: 250, num: "seat12", isOccupied: false, isSelected: false },
    { price: 250, num: "seat13", isOccupied: false, isSelected: false },
    { price: 250, num: "seat14", isOccupied: false, isSelected: false },
    { price: 250, num: "seat15", isOccupied: false, isSelected: false },
    { price: 300, num: "seat16", isOccupied: false, isSelected: false },
    { price: 300, num: "seat17", isOccupied: false, isSelected: false },
    { price: 400, num: "seat20", isOccupied: false, isSelected: false },
    { price: 400, num: "seat21", isOccupied: false, isSelected: false },
    { price: 350, num: "seat22", isOccupied: false, isSelected: false },
    { price: 350, num: "seat23", isOccupied: false, isSelected: false },
    { price: 350, num: "seat24", isOccupied: false, isSelected: false },
    { price: 350, num: "seat25", isOccupied: false, isSelected: false },
    { price: 400, num: "seat26", isOccupied: false, isSelected: false },
    { price: 400, num: "seat27", isOccupied: false, isSelected: false }
]
const movies = [{
    name: "83",
    url: "83.jpeg",
    seats
}, {
    name: "Spider-Man:No Way Home",
    url: "spiderman.jpeg",
    seats
}, {
    name: "Shershaah",
    url: "shershaah.jpeg",
    seats
}]

let movieNames = []
let selectedMovie = null;
const movieOptions = document.querySelector(".movie");
const displaySeats = document.querySelector(".seats")
const countAndTotal = document.querySelector(".total")
const buttons = document.querySelector(".btns")
const movieImage = document.querySelector('.displayMovie');

function showMovieNames() {
    let htmlCode = ``
    movieNames = movies.map(movie => movie.name)
    movieNames.forEach(movie => {
        htmlCode += `<option>${movie}</option>`
    })
    movieOptions.innerHTML = htmlCode
    getSelectedMovie()
}

function getSelectedMovie() {
    movieOptions.addEventListener(`change`, (e) => {
        let selectedMovieName = e.target.value;
        let movie = movies.find(element => element.name == selectedMovieName)
        console.log(movie)
        if (movie) {
            selectedMovie = movie
        }
        render()
    })
}

function render() {
    if (selectedMovie) {
        const {
            url: selectedMovieUrl,
            name: selectedMovieName,
            seats: selectedMovieSeats = [],
        } = selectedMovie;
        let imgCode = `<img src= ${selectedMovieUrl} alt="${selectedMovieName}">`;
        movieImage.innerHTML = imgCode;
        let diplaySeatsInnerHtml = "";
        let selectedSeatCount = 0
        let totalCost = 0;
        (selectedMovieSeats).forEach((seat, i) => {
            const { price, num, isOccupied, isSelected } = seat;
            let seatClasses = isSelected ? "seat selected-seat" : "seat";
            seatClasses = isOccupied ? "seat occupied-seat" : seatClasses;
            selectedSeatCount = isSelected ? selectedSeatCount + 1 : selectedSeatCount;
            totalCost = isSelected ? totalCost + price : totalCost;
            diplaySeatsInnerHtml += `<div class="${seatClasses}" style="cursor:pointer;" id="#${i}" onclick="selectSeat(${i})">
              </div>`;
        });
        countAndTotal.innerHTML = `You have selected <span id = "count">${selectedSeatCount} </span> seat(s) of total of Rs.<span id="total">${totalCost}</span >`
        displaySeats.innerHTML = diplaySeatsInnerHtml;
        buttons.innerHTML = `<button type="button" class="btn btn-outline-light" id="bookBtn" onclick="bookSeats()">Book Tickets</button>
        <button type = "button" class = "btn btn-outline-light" id = "resetBtn" onclick = "reset()"> Reset </button>`
    }




}



function isAvailable(seat) {
    if (!seat.isOccupied) {
        return true;
    }
    return false;
}


function selectSeat(index) {
    if (selectedMovie) {
        const { seats = [] } = selectedMovie || {};
        const selectedSeat = seats[index] || {};
        if (isAvailable(selectedSeat)) {
            selectedSeat.isSelected = !selectedSeat.isSelected;
            selectedMovie[index] = selectedSeat;
        }

    }
    //const bookBtn = document.getElementById('bookBtn');
    //bookBtn.removeAttribute('disabled')
    render();
}

function bookSeats() {
    if (selectedMovie) {
        const {
            url,
            name,
            seats: selectedMovieSeats = [],
        } = selectedMovie || {};
        (selectedMovieSeats || []).forEach((seat) => {
            if (seat.isSelected) {
                seat.isOccupied = true;
                seat.isSelected = false;
            }

        });
    }
    render()
}

function reset() {
    if (selectedMovie) {
        selectedMovieSeats = selectedMovie.seats;
        (selectedMovieSeats || []).forEach((seat) => {
            if (seat.isSelected || seat.isOccupied) {
                seat.isOccupied = false;
                seat.isSelected = false;
            }

        });
    }
    render()
}

showMovieNames()