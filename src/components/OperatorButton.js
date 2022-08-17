import { ACTIONS } from "../App"

export default function OperatorButton({dispatch, operation, cl}){
    return <button 
                className={(cl)? cl : 'button ops'}
                onClick={() => 
                    dispatch({
                        type: ACTIONS.CHOOSE_OPERATION,
                        payload: {operation}
                    })}
            >
                {operation}
            </button>
}