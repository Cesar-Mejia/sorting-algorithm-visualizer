import { bubbleSort, selectionSort, insertionSort } from './algorithms.mjs'

const container = document.getElementById('bars-container')
const generateArrayBtn = document.getElementById('generate-array-btn')
const sortBtn = document.getElementById('sort-btn')
const algoBtns = document.getElementById('algorithm-btns').children

window.addEventListener('load', onLoad)
generateArrayBtn.addEventListener('click', generateArray)
sortBtn.addEventListener('click', sort)

let totalBars = 80
let animationDelay = 0
let array = []
let currentSelection = 'bubble-sort'

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

// ******************************************************************** //

function showBars(move) {
  container.innerHTML = ''
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement('div')
    bar.style.height = array[i] * 100 + '%'
    bar.classList.add('bar')
    container.appendChild(bar)
  }
}

function generateArray() {
  for (let i = 0; i < totalBars; i++) {
    array[i] = Math.random()
  }
  showBars()
}

function sort() {
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
  }
}

// ************************** Animations ****************************** //

function animate_bubbleSort(moves) {
  function showBars_bubbleSort(move) {
    container.innerHTML = ''
    for (let i = 0; i < array.length; i++) {
      const bar = document.createElement('div')
      bar.style.height = array[i] * 100 + '%'
      bar.classList.add('bar')
      if (move && move.indeces.includes(i)) {
        bar.style.backgroundColor = move.type === 'swap' ? 'red' : 'blue'
      }
      container.appendChild(bar)
    }
  }

  if (!moves.length) return showBars_bubbleSort()

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
      bar.style.height = array[i] * 100 + '%'
      bar.classList.add('bar')
      if (move && move.indeces.includes(i)) {
        bar.style.backgroundColor = move.type = 'comp' ? 'orange' : 'red'
      }
      if (move && move.j === i) {
        bar.style.backgroundColor = 'blue'
      }
      container.appendChild(bar)
    }
  }

  if (!moves.length) return showBars_selectionSort()
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
      bar.style.height = array[i] * 100 + '%'
      bar.classList.add('bar')
      if (move && move.indeces.includes(i)) {
        console.log(move.type)
        bar.style.backgroundColor = move.type === 'comp' ? 'blue' : 'red'
      }
      container.appendChild(bar)
    }
  }

  if (!moves.length) return showBars_insertionSort()
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
