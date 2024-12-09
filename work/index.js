let plus = document.getElementById('plus')
let minus = document.getElementById('minus')
let img = ['<img width="500px" height="500px" src="africa.png">', '<img width="500px" height="500px" src="nigeria.png">', '<img width="500px" height="500px" src="lagos.png">', '<img width="500px" height="500px" src="surulere.png">', '<img width="500px" height="500px" src="home.png">']
let div = document.getElementById('div')
let index = 0

function map() {
    requestAnimationFrame(map)
    div.innerHTML = img[index]
    if (index<0) {
        alert('stop')
        index++
    }
    if (index>img.length-1) {
        alert('stop')
        index--
    }


}

map()

plus.onclick = () =>{
    index++
}

minus.onclick = () =>{
    index--
}