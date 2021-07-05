const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');


const setDate = () => {
    const date = new Date();
    //seconds
    const seconds = date.getSeconds();
    const secondDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;

    //minutes
    const minutes = date.getMinutes();
    const minuteDegrees = (((minutes / 60) * 360) + (seconds / 60) * 6) + 90;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`

    //hours
    const hours = date.getHours();
    const hourDegrees = (((hours / 12) * 360) + (minutes / 60) * 30) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`

    // console.log(hours);
    // console.log(hourDegrees);
}

setInterval(setDate, 1000);