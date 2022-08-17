import { ACTIONS } from "../App"

export default function DigitButton({dispatch, digit}){
    return (
        <button 
            className='button nums' 
            onClick={() => 
                dispatch({
                    type: ACTIONS.ADD_DIGIT,
                    payload: {digit}
                })}
        >
            {digit}
        </button>
    )
}