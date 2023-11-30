
type FetchState<T> = {
	data: T | null | undefined,
	loading?: boolean,
	error?: Error
};

type FetchActionType = 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_FAILURE';
type FetchAction<T> = {
	type: FetchActionType,
	data?: T | null,
	error?: Error
}

export const initial_fetch = {
	data: null,
	loading: false,
}
const fetchReducer = <T>(state: FetchState<T>, action: FetchAction<T>): FetchState<T> => {
	switch(action.type){
		case 'FETCH_START':
			return {
				...state,
				loading: true
			}
		case 'FETCH_SUCCESS':
			return {
				...state,
				data: action.data,
				loading: false
			}
		case 'FETCH_FAILURE':
			return {
				...state,
				loading: false,
				error: action.error
			}
		default: 
			return { ...initial_fetch}
	}
}

export default fetchReducer;