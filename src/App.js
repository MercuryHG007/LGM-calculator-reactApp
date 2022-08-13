import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mercury's Calculator</h1>
      </header>
      <div id='calculator-container'>
        <div id='main-container'>
          <div id='display-container'>
            <div id='previous-output'>

            </div>
            <div id='current-output'>

            </div>
          </div>
          <div id='buttons-container'>
            <table>
              <tr>
                <button className='button ops' >%</button>
                <button className='button ops' >CE</button>
                <button className='button ops' >C</button>
                <button className='button ops' >DEL</button>
              </tr>

              <tr>
                <button className='button ops' >1/x</button>
                <button className='button ops' >x <sup>2</sup></button>
                <button className='button ops' >sqrt</button>
                <button className='button ops' >/</button>
              </tr>

              <tr>
                <button className='button nums' >7</button>
                <button className='button nums' >8</button>
                <button className='button nums' >9</button>
                <button className='button ops' >*</button>
              </tr>

              <tr>
                <button className='button nums' >4</button>
                <button className='button nums' >5</button>
                <button className='button nums' >6</button>
                <button className='button ops' >-</button>
              </tr>
              
              <tr>
                <button className='button nums' >1</button>
                <button className='button nums' >2</button>
                <button className='button nums' >3</button>
                <button className='button ops' >+</button>
              </tr>
              
              <tr>
                <button className='button nums' >+/−</button>
                <button className='button nums' >0</button>
                <button className='button nums' >.</button>
                <button className='button equal' >=</button>
              </tr>

            </table>
          </div>
        </div>
        <div id='memory-container'>
          <div id='memory-heading'>
            <p id='history'>History</p>
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
