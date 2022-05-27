const main_div = document.getElementById('main')
const slider_div = document.getElementById('slider');
const settings_div = document.getElementById('settings')
const sliderValue_p = document.getElementById('slider-value')
const colorPick = document.getElementById('colorPicker')
const color_button = document.getElementById('color')
const clear_button = document.getElementById('clear')
const eraser_button = document.getElementById('eraser')
const rainbow_button = document.getElementById('rainbow')
const grid_div = document.getElementById('grid');
const defaultColor = '#333333'
const defaultMode = 'color'
let currentColor = defaultColor
let currentMode = defaultMode

function setMode(newMode){
    activateButton(newMode)
    currentMode = newMode
}

function setCurrentColor(newColor){
    currentColor = newColor
}

// create and update grid function
function createUpdateGrid(){
    let size = slider_div.value;
    sliderValue_p.textContent = `${size} x ${size}`
    grid_div.style.gridTemplateColumns = `repeat(${size},1fr)`
    grid_div.style.gridTemplateRows = `repeat(${size},1fr)`
    for (let i = 0; i < size*size; i++) {
        var gridElement = document.createElement('div')
        gridElement.classList.add('grid-element')
        //mousedown : is pressed and move 
        gridElement.addEventListener('mousedown', coloredGrid)
        //mousemove:  is moved
        gridElement.addEventListener('mouseover', coloredGrid)
        grid_div.appendChild(gridElement)
         
    }
    //clear grid everytime grid size updated
    clearGrid()
    //set the mode to default mode
    currentMode = defaultMode
}

//clear the whole grid
function clearGrid(){
    var gridElements = grid_div.querySelectorAll('div')
    Array.from(gridElements).forEach(gridElement => {
        gridElement.style.backgroundColor ='white'
    })
    if (currentMode == 'rainbow'){
        setMode('rainbow')
    } else {
        setMode(defaultMode)
    }
    
}

//to check if the mouse is press or release
let mouseDown
main_div.addEventListener('mousedown', () => (mouseDown = true))
main_div.addEventListener('mouseup', () => (mouseDown = false))

function coloredGrid(element){
    //break the function if mousedown is false (release)
    //mouse over and mousedown = click
    if (element.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow'){
        const randomR = Math.floor(Math.random()*256)
        const randomG = Math.floor(Math.random()*256)
        const randomB = Math.floor(Math.random()*256)
        element.target.style.backgroundColor = `rgb(${randomR},${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
        element.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser'){
        element.target.style.backgroundColor = '#ffffff'
    }
    
}


//show which mode or button is currently used
function activateButton(newMode){
    switch(currentMode){
        case 'color':
            color_button.classList.remove('active')
            break
        case 'rainbow':
            rainbow_button.classList.remove('active')
            break
        case 'eraser':
            eraser_button.classList.remove('active')
            break
    }
    switch(newMode){
        case 'color':
            color_button.classList.add('active')
            break
        case 'rainbow':
            rainbow_button.classList.add('active')
            break
        case 'eraser':
            eraser_button.classList.add('active')
            break
    }
}



slider_div.addEventListener('click', createUpdateGrid)
clear_button.addEventListener('click', clearGrid)
colorPick.addEventListener('input', (e) => {
    setMode('color')
    setCurrentColor(e.target.value)
})
color_button.addEventListener('click', () => setMode('color'))
eraser_button.addEventListener('click', () => setMode('eraser'))
rainbow_button.addEventListener('click', ()=> setMode('rainbow'))

createUpdateGrid()
