import { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort } from './algorithms.mjs'

// initialization of html elements to variables
const container = document.getElementById('bars-container')
const generateArrayBtn = document.getElementById('generate-array-btn')
const sortBtn = document.getElementById('sort-btn')
const algoBtns = document.getElementById('algorithm-btns').children
const speedSlider = document.getElementById('speed')
const sizeSlider = document.getElementById('size')

// event listener initialization
window.addEventListener('load', onLoad)
generateArrayBtn.addEventListener('click', generateArray)
sortBtn.addEventListener('click', sort)
speedSlider.oninput = speedSlider_init
sizeSlider.oninput = sizeSlider_init

// global values
let totalBars = sizeSlider.value
let animationDelay = speedSlider.max - speedSlider.value
let array = []
let currentSelection = 'bubble-sort'
let color1 = 'lightseagreen'
let color2 = 'lightcoral'
let isAnimating = false
let resetClicked = false

// *********************** init *************************************** //

function generateArray() {
  // displays bars given current array
  function showBars() {
    container.innerHTML = ''
    for (let i = 0; i < array.length; i++) {
      const bar = document.createElement('div')
      bar.style.height = array[i] + '%'
      bar.classList.add('bar')
      container.appendChild(bar)
    }
  }

  sortBtn.disabled = false
  sizeSlider.disabled = false

  // reset array values
  for (let i = 0; i < totalBars; i++) {
    array[i] = Math.floor(Math.random() * 100)
  }
  showBars()
  if (isAnimating) resetClicked = true
}

function onLoad() {
  algoBtns_init()
  generateArray()
}

// algorithm button initialization
function algoBtns_init() {
  for (let btn of algoBtns) {
    if (btn.id === currentSelection) {
      btn.disabled = true
    } else {
      btn.disabled = false
    }
  }

  // handles selection of new algorithms
  function selectAlgo(e) {
    generateArrayBtn.click()
    currentSelection = e.target.id
    for (let btn of algoBtns) {
      if (btn.disabled) {
        btn.disabled = false
      }
      if (btn.id === currentSelection) {
        btn.disabled = true
      }
    }
  }

  // initialize event listeners for algorithm buttons
  for (let btn of algoBtns) {
    btn.addEventListener('click', e => selectAlgo(e))
  }
}

// speed slider initialization
function speedSlider_init() {
  animationDelay = speedSlider.max - this.value
}

// size slider initialization
function sizeSlider_init() {
  totalBars = this.value
  array = []
  generateArray()
}

// ******************************************************************** //

// resets booleans after stopping animations
function reset() {
  isAnimating = false
  resetClicked = false
}

// activates algorithm given currently selected algorithm
function sort() {
  isAnimating = true
  sortBtn.disabled = true
  sizeSlider.disabled = true

  switch (currentSelection) {
    case 'bubble-sort':
      animate(bubbleSort([...array]))
      break
    case 'selection-sort':
      animate(selectionSort([...array]))
      break
    case 'insertion-sort':
      animate(insertionSort([...array]))
      break
    case 'merge-sort':
      animate(mergeSort([...array]))
      break
    case 'quick-sort':
      animate(quickSort([...array]))
      break
  }
}

// animates algorithm after moves are computed
function animate(moves) {
  // draws the bars depending on current algorithms selection
  function drawBars(move) {
    container.innerHTML = ''
    for (let i = 0; i < array.length; i++) {
      const bar = document.createElement('div')
      bar.style.height = array[i] + '%'
      bar.classList.add('bar')

      switch (currentSelection) {
        case 'bubble-sort':
          if (move && move.indeces.includes(i) && move.type === 'swap') {
            bar.style.backgroundColor = i === move.indeces[0] ? color2 : color1
          } else if (move && move.indeces.includes(i) && move.type === 'comp') {
            bar.style.backgroundColor = i === move.indeces[1] ? color2 : color1
          }
          break
        case 'selection-sort':
          if (move && move.indeces.includes(i)) {
            bar.style.backgroundColor = move.type = 'comp' ? color2 : color1
          }
          if (move && move.j === i) {
            bar.style.backgroundColor = color1
          }
          break
        case 'insertion-sort':
          if (move && move.indeces.includes(i) && move.type === 'comp') {
            bar.style.backgroundColor = move.indeces[0] === i ? color1 : color2
          }
          if (move && move.indeces.includes(i) && move.type === 'swap') {
            bar.style.backgroundColor = move.indeces[0] === i ? color1 : color2
          }
          break
        case 'merge-sort':
          if (move && move.indeces.includes(i)) {
            bar.style.backgroundColor = move.type === 'comp' ? color1 : color2
          }
          break
        case 'quick-sort':
          if (move && move.type === 'swap' && (move.start === i || move.indeces.includes(i))) {
            if (!move.finalSwap) {
              bar.style.backgroundColor = move.start === i ? color1 : color2
            } else if (move.indeces.includes(i)) {
              bar.style.backgroundColor = color2
            }
          } else if (move && move.indeces.includes(i) && move.type === 'comp') {
            bar.style.backgroundColor = color1
          }
          if (move && i > move.start && i < move.swapIdx) {
            bar.style.backgroundColor = 'gray'
          }
          break
      }

      container.appendChild(bar)
    }
  }

  if (resetClicked) {
    reset()
    return
  }
  if (!moves.length) {
    reset()
    return drawBars()
  }

  const move = moves.shift()
  const [i, j] = move.indeces

  if (currentSelection !== 'merge-sort') {
    if (move.type === 'swap') {
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  } else {
    if (move.type === 'replace') {
      array[i] = move.newVal
    }
  }

  drawBars(move)
  setTimeout(() => {
    animate(moves)
  }, animationDelay)
}
