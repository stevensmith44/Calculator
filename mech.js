let currentNum = ''
let previousNum = ''
let operatorSelected = ''

const mainDisplay = document.querySelector('.display-main')
const operationsDisplay = document.querySelector('.display-operations')

const Number = document.querySelectorAll('.number')
const operation = document.querySelectorAll('.operator')

const clear = document.querySelector('.clear')
clear.addEventListener('click',(e) => {
  clearCalculator()
})

const deleteNum = document.querySelector('.delete')
deleteNum.addEventListener('click',(e) => {deletingNumber()})

const decimal = document.querySelector('.decimal')
decimal.addEventListener('click',(e) => {addDecimal()})

const equal = document.querySelector('.eq')
equal.addEventListener('click',(e) => {
  if(currentNum !== '' && previousNum !== ''){calculate()}
})

Number.forEach((btn) => {
  btn.addEventListener('click',(e) => {HandleNumbers(e.target.textContent)})})

function HandleNumbers(num){
  currentNum += num
  mainDisplay.textContent = currentNum
}

operation.forEach((btn) => {
  btn.addEventListener('click',(e) => {HandleOperator(e.target.textContent)})})

function HandleOperator(op){
  if(previousNum === ''){
    previousNum = currentNum
    operatorCheck(op)
  }
  else if(currentNum === ''){
    operatorCheck(op)
  }
  else{
    calculate();
    operatorSelected = op
    operationsDisplay.textContent = previousNum + operatorSelected
    mainDisplay.textContent = ''
  }
}

function operatorCheck(text){
  operatorSelected = text
  operationsDisplay.textContent = previousNum + operatorSelected
  mainDisplay.textContent = '0'
  currentNum = ''
}

function calculate(){
  previousNum = +(previousNum);
  currentNum = +(currentNum);
  if(operatorSelected === '+'){
    previousNum += currentNum
  }
  else if(operatorSelected === '-'){
    previousNum -= currentNum
  }
  else if(operatorSelected === 'x'){
    previousNum *= currentNum
  }
  else if(operatorSelected === '/'){
    if(currentNum <= 0){
      ShowResult()
      return
    }
    previousNum /= currentNum
  }
  previousNum = RoundNum(previousNum)
  previousNum = previousNum.toString()
  ShowResult() 
}

function RoundNum(num){
  return Math.round(num*10000)/10000
}

function ShowResult() {
  if (previousNum.length <= 10){mainDisplay.textContent = previousNum}
  else if(previousNum.length > 10 && currentNum != 0){
    mainDisplay.textContent = (previousNum)/Math.pow(10, previousNum.length-1) + 'e+' + (previousNum.length-1)
  }
  else{previousNum = 'ERROR'
       mainDisplay.textContent = previousNum}
  operationsDisplay.textContent = ''
  operatorSelected = ''
  currentNum = ''

}

function clearCalculator(){
  currentNum = ''
  previousNum = ''
  operatorSelected = ''
  operationsDisplay.textContent = ''
  mainDisplay.textContent = ''
  
}

function deletingNumber(){
  currentNum = currentNum.slice(0,-1)
  mainDisplay.textContent  = currentNum
}

function addDecimal(){
  if(!currentNum.includes('.')){
    currentNum += '.'
    mainDisplay.textContent  = currentNum
  }
}