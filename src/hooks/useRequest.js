import { useReducer, useCallback } from "react";

function httpReducer(state, action) {
    if (action.type === 'GET') {
        return {
            data: null,
            error: null,
            status: 'pending',
        };
    }

    if (action.type === 'SUCCES') {
        return {
            data: action.responseData,
            error: null,
            status: 'completed',
        };
    }

    if (action.type === 'ERROR') {
        return {
            data: null,
            error: action.errorMessage,
            status: 'error'
        };
    }

    return state;
}

export const useHttp = (requestFunction) => {
    const [httpState, dispatch] = useReducer(httpReducer, {
        status: 'pending',
        data: null,
        error: null,
    });

    const sendRequest = useCallback(
        async function (requestData) {
            dispatch({ type: 'GET' });
            try {
                const responseData = await requestFunction(requestData);
                dispatch({ type: 'SUCCESS', responseData});
            } catch (error) {
                dispatch({
                    type: 'ERROR',
                    errorMessage: error.message || 'Something wrong with get request',
                });
            }
        }, [requestFunction]
    );

    return {
        sendRequest,
        ...httpState,
    }
} 

export default useHttp;