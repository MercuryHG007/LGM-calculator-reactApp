import { useReducer } from 'react';

import './App.css';

// import { VscTrash } from 'react-icons/vsc';
import { TbSquareRoot2 } from 'react-icons/tb';

import DigitButton from './components/DigitButton';
import OperatorButton from './components/OperatorButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
  CLEAR: 'clear',
  CLEAR_ENTRY: 'clear-entry',
  CLEAR_HISTORY: 'claer_history',
  SQ: 'sqaured',
  SQRT: 'sqrt',
  PERCENT: 'percent',
  SIGN_CHANGE: 'sign_change',
  INVERSE: 'inverse'
}

function REDUCER(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit === ".") {
        if (state.currentOperand == null) {
          return {
            ...state,
            currentOperand: "0."
          }
        }
        else if (state.currentOperand.includes(".")) {
          return state
        }
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }
    case ACTIONS.SIGN_CHANGE:
      if (state.currentOperand == null) {
        return state
      }
      return {
        ...state,
        currentOperand: otherOps(state,'sign')
      }
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.previousOperand == null ||
        state.currentOperand == null
      ) {
        return state
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          currentOperand: null,
          overwrite: false
        }
      }
      if(state.currentOperand == null) return state
      if(state.currentOperand.length === 1){
        return{
          ...state,
          currentOperand: null
        }
      }
      return{
        ...state,
        currentOperand: state.currentOperand.slice(0,-1)
      }
    case ACTIONS.CLEAR_ENTRY:
      if(state.currentOperand == null) return state
      return {
        ...state,
        currentOperand: 0
      }
    case ACTIONS.CLEAR:
      return {
        ...state,
        previousOperand: null,
        operation: null,
        currentOperand: null
      }
    case ACTIONS.SQ:
      if(state.currentOperand == null) return state
      return{
        ...state,
        previousOperand: otherOps(state,'sq'),
        // currentOperand: state.currentOperand
      }
    case ACTIONS.SQRT:
      if(state.currentOperand == null) return state
      return{
        ...state,
        previousOperand: otherOps(state,'sqrt'),
        // currentOperand: state.currentOperand
      }
    case ACTIONS.PERCENT:
      if(state.currentOperand == null && state.previousOperand == null){
        return state
      }
      if(state.operation === '+' || state.operation === '-'){
        return{
          ...state,
          operation: null,
          currentOperand: otherOps(state,'perc'),
          previousOperand: evaluate(state),
        }
      }
      return{
        ...state,

      }
    default:
      return {}
  }

}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-in",{
  maximumFractionDigits: 0,
})

function formatter(operand){
  if(operand == null) return
  const [integer, decimal] = operand.split('.')
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`

}

function otherOps(state, op){
  const prev = parseFloat(state.previousOperand)
  const curr = parseFloat(state.currentOperand)
  let ans = ""
  switch(op){
    case "sign":
      ans = curr * -1
      break
    case "sq":
      ans = (curr * curr)
      break
    case "sqrt":
      ans = Math.sqrt(curr)
      break
    case "perc":
      ans = prev * curr/100
      break
    default:
      ans = ""
  }
  return ans.toString()
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand)
  const curr = parseFloat(currentOperand)
  if (isNaN(curr)) {
    return ""
  }
  let ans = ""
  switch (operation) {
    case "+":
      ans = prev + curr
      break;
    case "-":
      ans = prev - curr
      break
    case "×":
      ans = prev * curr
      break
    case "÷":
      ans = prev / curr
      break
    default:
      ans = ""
  }
  return ans.toString()
}

function App() {

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(REDUCER, {});

  // dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit: 1 }})

  // let previous = "" + previousOperand + " " + operation;
  // if (operation === "√") {
  //   previous = "" + operation + `(${previousOperand})`;
  // }
  // if (operation === "1/x") {
  //   previous = "" + operation.slice(0, 2) + `(${previousOperand})`;
  // }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mercury's Calculator</h1>
      </header>
      <div id='calculator-container'>
        <div id='main-container'>
          {/* <div id=''>
            <p id='history'>Standard</p>
          </div> */}
          <div id='display-container'>
            <div id='previous-output'>
              <p>
                {formatter(previousOperand)} {operation}
              </p>
            </div>
            <div id='current-output'>
              <p>{formatter(currentOperand)}</p>
            </div>
          </div>
          <div id='buttons-container'>
            <table>
              <tr className='table-row'>
                <OperatorButton operation="&#37;" dispatch={dispatch}/>
                <button
                  className='button ops'
                  onClick={() => dispatch({ type: ACTIONS.CLEAR_ENTRY })}
                >
                  CE
                </button>
                <button
                  className='button ops'
                  onClick={() => dispatch({ type: ACTIONS.CLEAR })}
                >
                  C
                </button>
                <button 
                  className='button ops'
                  onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}
                >
                  DEL
                </button>
                {/* <OperatorButton operation="÷" dispatch={dispatch} /> */}
              </tr>

              <tr className='table-row'>
                <button
                  className='button ops'
                  onClick={() => dispatch({type: ACTIONS.INVERSE})}
                >
                  <sup>1</sup>&frasl;<sub>&#120;</sub>
                </button>
                <button
                  className='button ops'
                  onClick={() => dispatch({type: ACTIONS.SQ})}
                >
                  x&sup2;
                </button>
                <button
                  className='button ops'
                  onClick={() => dispatch({type: ACTIONS.SQRT})}
                >
                  <TbSquareRoot2 />
                </button>
                <OperatorButton operation="÷" dispatch={dispatch}/>
              </tr>

              <tr className='table-row'>
                <DigitButton digit="7" dispatch={dispatch} />
                <DigitButton digit="8" dispatch={dispatch} />
                <DigitButton digit="9" dispatch={dispatch} />
                <OperatorButton operation="×" dispatch={dispatch} />
              </tr>

              <tr className='table-row'>
                <DigitButton digit="4" dispatch={dispatch} />
                <DigitButton digit="5" dispatch={dispatch} />
                <DigitButton digit="6" dispatch={dispatch} />
                <OperatorButton operation="-" dispatch={dispatch} />
              </tr>

              <tr className='table-row'>
                <DigitButton digit="1" dispatch={dispatch} />
                <DigitButton digit="2" dispatch={dispatch} />
                <DigitButton digit="3" dispatch={dispatch} />
                <OperatorButton operation="+" dispatch={dispatch} />
              </tr>

              <tr className='table-row'>
                <button
                  className='button nums'
                  onClick={() => dispatch({ type: ACTIONS.SIGN_CHANGE })}
                >
                  <sup>+</sup>/-
                </button>
                <DigitButton digit="0" dispatch={dispatch} />
                <DigitButton digit="." dispatch={dispatch} />
                <button
                  className='button equal'
                  onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
                >
                  =
                </button>
              </tr>

            </table>
          </div>
        </div>
        {/* <div id='memory-container'>
          <div id='memory-heading'>
            <p id='history'>History</p>
          </div>
          <div id='memory-list-container'>
            <ul id='memory-list'>
              
              <li id='memory-list-item'>
                ikjhjk
              </li>
              <li id='memory-list-item'>
                ikjhjk
              </li>        
            </ul>
          </div>
          <div id='clear-history'>
            <button id='clear-button'>
              <VscTrash size={23} />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;
