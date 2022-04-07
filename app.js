document.ondragstart = noselect;
document.onselectstart = noselect;
document.oncontextmenu = noselect;

console.log(window.innerHeight)

function noselect() {
    return false;
}

const body = document.querySelector('body')
const grid = document.querySelector('.grid')
const timeDisplay = document.querySelector('.time__current')
const boomsDisplay = document.querySelector('.booms__current')
const buttonEasy = document.querySelector('.button__easy')
const buttonNormal = document.querySelector('.button__normal')
const buttonHard = document.querySelector('.button__hard')
const buttonMyGame = document.querySelector('.button__my-game')
const popup = document.querySelector('.popup')
const popupInner = document.querySelector('.popup__inner')
const popupTitle = document.querySelector('.popup__title')
let gamesPlayed = 0
let booms = 10
let squareNumber = 10
let squareWidth = 20
if (window.innerHeight < 800){
    squareWidth = 16
}
let width
let size
let boomsMassive = []
let squares = []
let currentIndex
let timerId
let squaresActive = []
let currentTime = 0
let currentMinutes = 0
let currentBooms
let timerIdNull

function calc(){
    width = squareNumber * squareWidth
    size = width * width/ (squareWidth*squareWidth)
    currentBooms = booms
    boomsMassive = []
    squares = []
    squaresActive = []
    currentTime = 0
    currentMinutes = 0
    console.log(1)
}

buttonEasy.addEventListener('click', () => {
    popupInner.style.display = 'none'
    booms = 10
    squareNumber = 10
    body.style.zoom = '250%'
    startGame()
})
buttonNormal.addEventListener('click', () => {
    popupInner.style.display = 'none'
    booms = 30
    squareNumber = 16
    body.style.zoom = '200%'
    startGame()
})
buttonHard.addEventListener('click', () => {
    popupInner.style.display = 'none'
    booms = 120
    squareNumber = 30
    body.style.zoom = '125%'
    startGame()
})
buttonMyGame.addEventListener('click', () => {
    popup.style.display = "none"
    const boomInput = document.createElement('input')
    const sizeInput = document.createElement('input')
    popupInner.style.height = '200px'
    popupInner.appendChild(boomInput)
    boomInput.style.marginBottom = '10px'
    boomInput.placeholder = "Введіть кількість бомб"
    popupInner.appendChild(sizeInput)
    sizeInput.style.marginBottom = '20px'
    sizeInput.placeholder = "Введіть розмір"
    const buttonContainer = document.createElement('div')
    const buttonPrev = document.createElement('button')
    const buttonStart = document.createElement('button')
    popupInner.appendChild(buttonContainer)
    buttonContainer.appendChild(buttonPrev)
    buttonContainer.appendChild(buttonStart)
    buttonPrev.classList.add('button__prev')
    buttonStart.textContent = "Почати"
    buttonStart.classList.add('button__start')
    buttonStart.style.marginBottom = '5px'
    buttonContainer.classList.add('button__container')
    buttonPrev.textContent = "Назад"
    popupTitle.textContent = "Введіть параметри"
    buttonPrev.addEventListener('click', () => {
        popup.style.display = "flex"
        buttonContainer.style.display = "none"
        sizeInput.style.display = "none"
        boomInput.style.display = "none"
        popupInner.style.height = '150px'
        popupTitle.textContent = "Вибір ігрового режиму"
    })
    buttonStart.addEventListener('click', ()=> {
        if (Number.isInteger(parseInt(boomInput.value)) && Number.isInteger(parseInt(sizeInput.value))){
            booms = parseInt(boomInput.value)
            squareNumber = parseInt(sizeInput.value)
            if (squareNumber <= 10){
                body.style.zoom = '300%'
            }
            else if (squareNumber > 10 && squareNumber <= 16){
                body.style.zoom = '200%'
            }
            else if (squareNumber > 16 && squareNumber <= 25){
                body.style.zoom = '150%'
            }
            else if (squareNumber > 25 && squareNumber <= 30){
                body.style.zoom = '125%'
            }
            else if (squareNumber > 30 && squareNumber < 40){
                body.style.zoom = '110%'
            }
            else{
                body.style.zoom = '100%'
            }
            popupInner.style.display = 'none'
            startGame()
        }
        else{
            alert('Введіть коректні дані!!')
        }
    })
})


function startGame() {
    if (gamesPlayed > 0){
        removeElements()
    }
    calc()
    creatBoard()
    createBooms()
    creatIndex()
    timerId = setInterval(timeIncrease, 1000)
}

function creatBoard() {
    grid.style.width = width + 'px'
    grid.style.height = width + 'px'
    for (let i = 0; i < size; i++){
        const square = document.createElement('div')
        square.textContent = 0
        square.addEventListener('click', click)
        square.addEventListener('contextmenu', contextClick)
        grid.appendChild(square)
        squares.push(square)
    }
}





function createBooms(){
    for (let i = 0; i < booms; i++){
        let randomSquare = squares[Math.floor(Math.random()*size)]
        if (!randomSquare.classList.contains('boom')){
            randomSquare.classList.add('boom')
            boomsMassive.push(randomSquare)
        }
        else{
            i--
        }
    }
    boomsDisplay.textContent = currentBooms
}


function creatIndex(){
    currentIndex = 0
    for (let i = 0; i < size; i++){
        let indexSquare1, indexSquare2, indexSquare3, indexSquare4, indexSquare5, indexSquare6, indexSquare7, indexSquare8
        if (squares[i].classList.contains('boom')){
            if (i > 0 && i  % squareNumber !== 0){
                indexSquare1 = parseInt(squares[i-1].textContent) + 1
                squares[i-1].textContent = indexSquare1
            }
            if (i < squares.length - 1 && (i + 1)  % squareNumber !== 0){
                indexSquare2 = parseInt(squares[i+1].textContent) + 1
                squares[i + 1].textContent = indexSquare2
            }
            if (i > squareNumber - 1){
                indexSquare3 = parseInt(squares[i-squareNumber].textContent) + 1
                squares[i-squareNumber].textContent = indexSquare3
            }
            if (i < squares.length - squareNumber){
                indexSquare4 = parseInt(squares[i+squareNumber].textContent) + 1
                squares[i+squareNumber].textContent = indexSquare4
            }
            if (i > squareNumber  && i  % squareNumber !== 0){
                indexSquare5 = parseInt(squares[i-squareNumber - 1].textContent) + 1
                squares[i-squareNumber - 1].textContent = indexSquare5
            }
            if (i > squareNumber - 1 && (i + 1)  % squareNumber !== 0){
                indexSquare6 = parseInt(squares[i- squareNumber + 1].textContent) + 1
                squares[i- squareNumber + 1].textContent = indexSquare6
            }
            if (i < squares.length - squareNumber - 1 && (i + 1)  % squareNumber !== 0){
                indexSquare7 = parseInt(squares[i+squareNumber + 1].textContent) + 1
                squares[i+squareNumber + 1].textContent = indexSquare7
            }
            if (i < squares.length - squareNumber + 1 && i  % squareNumber !== 0){
                indexSquare8 = parseInt(squares[i+squareNumber - 1].textContent) + 1
                squares[i+squareNumber - 1].textContent = indexSquare8
            }

        }
    }
    for (let i = 0; i < size; i++){
        if (squares[i].classList.contains('boom')){
            squares[i].textContent = null
        }
    }
    for (let i = 0; i < size; i++){
        if (!squares[i].classList.contains('boom')){
            squares[i].classList.add('square')
            squares[i].classList.add('index-' + squares[i].textContent)
            if(squares[i].textContent === '0'){
                squares[i].textContent = null
            }
        }
    }
}

function click(){
   this.classList.add('active')
    if (this.classList.contains('boom')){
        setTimeout(lose, 50)
    }
    else{
        this.removeEventListener('click', click)
        this.removeEventListener('contextmenu', contextClick)
        this.style.cursor = 'auto'
        squaresActive.push(this)
        setTimeout(checkForWin, 50)
        if (this.classList.contains('index-0')){
            // let index = squares.indexOf(this)
            timerIdNull = setInterval(checkForNull, 20)
        }
    }
}

function contextClick() {
    if(!this.classList.contains('active')){
        if (this.classList.contains('context')){
            this.classList.remove('context')
            this.addEventListener('click', click)
            currentBooms++
            boomsDisplay.textContent = currentBooms
        }
        else{
            this.classList.add('context')
            this.removeEventListener('click', click)
            currentBooms--
            boomsDisplay.textContent = currentBooms
        }
    }
}

function lose(){
    clearInterval(timerId)
    clearInterval(timerIdNull)
    alert('GAME OVER')
    for (let i = 0; i < size; i++){
        squares[i].removeEventListener('click', click)
        squares[i].removeEventListener('contextmenu', contextClick)
    }
    restartGame()
}

function checkForWin(){
    if (squaresActive.length >= squares.length - booms){
        clearInterval(timerId)
        clearInterval(timerIdNull)
        for (let i = 0; i < boomsMassive.length; i++){
            boomsMassive[i].classList.add('visible')
        }
        for (let i = 0; i < size; i++){
            squares[i].removeEventListener('click', click)
            squares[i].removeEventListener('contextmenu', contextClick)
        }
        setTimeout(() => alert('YOU WIN!'), 50)
        restartGame()
    }
}
function timeIncrease(){
    currentTime++
    if (currentTime === 60){
        currentMinutes += 1;
        currentTime = 0
    }
    if (currentMinutes < 10){
        if (currentTime < 10){
            timeDisplay.textContent = '0' + currentMinutes + ':' + '0' + currentTime
        }
        else{
            timeDisplay.textContent = '0' + currentMinutes + ':' +  currentTime
        }
    }
    else{
        timeDisplay.textContent = currentMinutes + ':' +  currentTime
    }
}




function checkForNull(){
    let killer = 0
    for (let i = 0; i < squares.length; i++){
        if (squares[i].classList.contains('active') && squares[i].classList.contains('index-0')){
            if (i > 0 && i  % squareNumber !== 0 && !squares[i-1].classList.contains('active')){
                squaresActive.push(squares[i-1])
                squares[i-1].classList.add('active')
                killer++
            }
            else if(i < squares.length - 1 && (i + 1)  % squareNumber !== 0 && !squares[i+1].classList.contains('active')){
                squaresActive.push(squares[i+1])
                squares[i+1].classList.add('active')
                killer++
            }
            else if (i > squareNumber - 1 && !squares[i-squareNumber].classList.contains('active')){
                squaresActive.push(squares[i-squareNumber])
                squares[i-squareNumber].classList.add('active')
                killer++
            }
            else if (i < squares.length - squareNumber && !squares[i+squareNumber].classList.contains('active')){
                squaresActive.push(squares[i+squareNumber])
                squares[i+squareNumber].classList.add('active')
                killer++
            }
            else if (i > squareNumber  && i  % squareNumber !== 0 && !squares[i-squareNumber - 1].classList.contains('active')){
                squaresActive.push(squares[i-squareNumber - 1])
                squares[i-squareNumber - 1].classList.add('active')
                killer++
            }
            else if (i > squareNumber - 1 && (i + 1)  % squareNumber !== 0 && !squares[i-squareNumber + 1].classList.contains('active')){
                squaresActive.push(squares[i-squareNumber + 1])
                squares[i-squareNumber + 1].classList.add('active')
                killer++
            }
            else if (i < squares.length - squareNumber - 1 && (i + 1)  % squareNumber !== 0 && !squares[i+squareNumber + 1].classList.contains('active')){
                squaresActive.push(squares[i+squareNumber + 1])
                squares[i+squareNumber + 1].classList.add('active')
                killer++
            }
            else if (i < squares.length - squareNumber + 1 && i  % squareNumber !== 0 && !squares[i+squareNumber - 1].classList.contains('active')){
                    squaresActive.push(squares[i+squareNumber - 1])
                    squares[i+squareNumber - 1].classList.add('active')
                    killer++
            }
        }
    }
    if (killer === 0){
        clearInterval(timerIdNull)
    }
}


function restartGame() {
    if (window.innerHeight < 800){
        body.style.zoom = "150%"
    }
    popupInner.style.display = 'block'
    gamesPlayed++
}
function removeElements() {
    for (let i = 0; i < size; i++){
        squares[i].remove()
    }
}









