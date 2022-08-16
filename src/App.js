import { TbSquareRoot2 } from 'react-icons/tb';
import { RiDivideLine } from 'react-icons/ri';
import { VscTrash } from 'react-icons/vsc';

import './App.css';

function App() {
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
              <p>ijhuikjbhj</p>
            </div>
            <div id='current-output'>
              <p>ijhuikjbhj</p>
            </div>
          </div>
          <div id='buttons-container'>
            <table>
              <tr className='table-row'>
                <button className='button ops' >&#37;</button>
                <button className='button ops' >CE</button>
                <button className='button ops' >C</button>
                <button className='button ops' >
                  DEL
                </button>
              </tr>

              <tr className='table-row'>
                <button className='button ops' ><sup>1</sup>&frasl;<sub>&#120;</sub></button>
                <button className='button ops' >x&sup2;</button>
                <button className='button ops' >
                  <TbSquareRoot2 size={20} />
                </button>
                <button className='button ops' >
                  <RiDivideLine size={20} />
                </button>
              </tr>

              <tr className='table-row'>
                <button className='button nums' >7</button>
                <button className='button nums' >8</button>
                <button className='button nums' >9</button>
                <button className='button ops' >x</button>
              </tr>

              <tr className='table-row'>
                <button className='button nums' >4</button>
                <button className='button nums' >5</button>
                <button className='button nums' >6</button>
                <button className='button ops' >&#8211;</button>
              </tr>
              
              <tr className='table-row'>
                <button className='button nums' >1</button>
                <button className='button nums' >2</button>
                <button className='button nums' >3</button>
                <button className='button ops' >+</button>
              </tr>
              
              <tr className='table-row'>
                <button className='button nums' ><sup>&#43; </sup>&frasl; &#8211;</button>
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
        </div>
      </div>
    </div>
  );
}

export default App;
