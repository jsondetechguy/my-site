setInterval(()=>{
    const time = document.querySelector("p");
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    time.textContent = hours + ":" + minutes + ":" + seconds;
}, 1)

if (hours >= 12) {
    hours -= 12
}