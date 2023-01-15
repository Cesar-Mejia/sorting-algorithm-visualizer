import { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort } from './algorithms.mjs'

const container = document.getElementById('bars-container')
const generateArrayBtn = document.getElementById('generate-array-btn')
const sortBtn = document.getElementById('sort-btn')
const algoBtns = document.getElementById('algorithm-btns').children
const speedSlider = document.getElementById('speed')
const sizeSlider = document.getElementById('size')

window.addEventListener('load', onLoad)
generateArrayBtn.addEventListener('click', generateArray)
sortBtn.addEventListener('click', sort)
speedSlider.oninput = speedSlider_init
sizeSlider.oninput = sizeSlider_init

let totalBars = sizeSlider.value
let animationDelay = speedSlider.max - speedSlider.value
let array = []
let currentSelection = 'bubble-sort'
let color1 = 'lightseagreen'
let color2 = 'lightcoral'
let isAnimating = false
let resetClicked = false

// *********************** init *************************************** //

function onLoad() {
  algoBtns_init()
  generateArray()
}

function algoBtns_init() {
  for (let btn of algoBtns) {
    if (btn.id === currentSelection) {
      btn.disabled = true
    } else {
      btn.disabled = false
    }
  }

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

  for (let btn of algoBtns) {
    btn.addEventListener('click', e => selectAlgo(e))
  }
}

function speedSlider_init() {
  animationDelay = speedSlider.max - this.value
}

function sizeSlider_init() {
  totalBars = this.value
  array = []
  generateArray()
}

// ******************************************************************** //

function showBars() {
  container.innerHTML = ''
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement('div')
    bar.style.height = array[i] + '%'
    bar.classList.add('bar')
    container.appendChild(bar)
  }
}

function generateArray() {
  sortBtn.disabled = false
  sizeSlider.disabled = false
  for (let i = 0; i < totalBars; i++) {
    array[i] = Math.floor(Math.random() * 100)
  }
  showBars()
  if (isAnimating) resetClicked = true
}

function sort() {
  isAnimating = true
  sortBtn.disabled = true
  sizeSlider.disabled = true

  switch (currentSelection) {
    case 'bubble-sort':
      const moves_bubble = bubbleSort([...array])
      animate_bubbleSort(moves_bubble)
      break
    case 'selection-sort':
      const moves_selection = selectionSort([...array])
      animate_selectonSort(moves_selection)
      break
    case 'insertion-sort':
      const moves_insertion = insertionSort([...array])
      animate_insertionSort(moves_insertion)
      break
    case 'merge-sort':
      const moves_merge = mergeSort([...array])
      animate_mergeSort(moves_merge)
      break
    case 'quick-sort':
      const moves_quick = quickSort([...array])
      animate_quickSort(moves_quick)
  }
}

function reset() {
  isAnimating = false
  resetClicked = false
}

// ************************** Animations ****************************** //

function animate_bubbleSort(moves) {
  function showBars_bubbleSort(move) {
    container.innerHTML = ''
    for (let i = 0; i < array.length; i++) {
      const bar = document.createElement('div')
      bar.style.height = array[i] + '%'
      bar.classList.add('bar')

      if (move && move.indeces.includes(i) && move.type === 'swap') {
        bar.style.backgroundColor = i === move.indeces[0] ? color2 : color1
      } else if (move && move.indeces.includes(i) && move.type === 'comp') {
        bar.style.backgroundColor = i === move.indeces[1] ? color2 : color1
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
    return showBars_bubbleSort()
  }

  const move = moves.shift()
  const [i, j] = move.indeces

  if (move.type === 'swap') {
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  showBars_bubbleSort(move)
  setTimeout(() => {
    animate_bubbleSort(moves)
  }, animationDelay)
}

function animate_selectonSort(moves) {
  function showBars_selectionSort(move) {
    container.innerHTML = ''
    for (let i = 0; i < array.length; i++) {
      const bar = document.createElement('div')
      bar.style.height = array[i] + '%'
      bar.classList.add('bar')
      if (move && move.indeces.includes(i)) {
        bar.style.backgroundColor = move.type = 'comp' ? color2 : color1
      }
      if (move && move.j === i) {
        bar.style.backgroundColor = color1
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
    return showBars_selectionSort()
  }

  const move = moves.shift()
  const [i, j] = move.indeces

  if (move.type === 'swap') {
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  showBars_selectionSort(move)

  setTimeout(() => {
    animate_selectonSort(moves)
  }, animationDelay)
}

function animate_insertionSort(moves) {
  function showBars_insertionSort(move) {
    container.innerHTML = ''
    for (let i = 0; i < array.length; i++) {
      const bar = document.createElement('div')
      bar.style.height = array[i] + '%'
      bar.classList.add('bar')

      if (move && move.indeces.includes(i) && move.type === 'comp') {
        bar.style.backgroundColor = color1
      }
      if (move && move.indeces.slice(1).includes(i) && move.type === 'swap') {
        bar.style.backgroundColor = color2
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
    return showBars_insertionSort()
  }
  const move = moves.shift()
  const [i, j] = move.indeces

  if (move.type === 'swap') {
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  showBars_insertionSort(move)

  setTimeout(() => {
    animate_insertionSort(moves)
  }, animationDelay)
}

function animate_mergeSort(moves) {
  function showBars_mergeSort(move) {
    container.innerHTML = ''
    for (let i = 0; i < array.length; i++) {
      const bar = document.createElement('div')
      bar.style.height = array[i] + '%'
      bar.classList.add('bar')

      if (move && move.indeces.includes(i)) {
        bar.style.backgroundColor = move.type === 'comp' ? color1 : color2
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
    return showBars_mergeSort()
  }
  let move = moves.shift()
  const [i] = move.indeces

  if (move.type === 'replace') {
    array[i] = move.newVal
  }

  showBars_mergeSort(move)

  setTimeout(() => {
    animate_mergeSort(moves)
  }, animationDelay)
}

function animate_quickSort(moves) {
  function showBars_quickSort(move) {
    container.innerHTML = ''
    for (let i = 0; i < array.length; i++) {
      const bar = document.createElement('div')
      bar.style.height = array[i] + '%'
      bar.classList.add('bar')

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

      container.appendChild(bar)
    }
  }

  if (resetClicked) {
    reset()
    return
  }

  if (!moves.length) {
    reset()
    return showBars_quickSort()
  }

  const move = moves.shift()
  const [i, j] = move.indeces

  if (move.type === 'swap') {
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  showBars_quickSort(move)
  setTimeout(() => {
    animate_quickSort(moves)
  }, animationDelay)
}
