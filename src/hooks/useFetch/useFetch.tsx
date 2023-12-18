import { useEffect, useReducer, useRef } from "react";
import fetchReducer, { initial_fetch } from "./reducer";

type Cache<T> = { [url: string]: T };

const useFetch = <T,>(url: string, deps: unknown[] = [], options?: RequestInit) => {
	const [{ data, loading, error}, dispatch] = useReducer(fetchReducer<T>, initial_fetch);
	const cache = useRef<Cache<T>>({});
	const cancelRequest = useRef<boolean>(false);

	useEffect(() => {
		const getUrl = async () => {
			dispatch({type: 'FETCH_START'});
			if(cache.current[url]){
				dispatch({type: 'FETCH_SUCCESS', data: cache.current[url]});
				return;
			}
			try{
				const response = await fetch(url, options);
				if(!response.ok) throw new Error(response.statusText);
				const responseData = (await response.json()) as T;
				cache.current[url] = responseData;

				dispatch({type: 'FETCH_SUCCESS', data: cache.current[url]});
			}catch(error){
				if(cancelRequest.current) return;
				dispatch({type: 'FETCH_FAILURE', error: error as Error})
			}
		}
		getUrl();

		return () => {
			cancelRequest.current = true;
		}
		
	}, [...deps]);

	const reFetch = async () => {
		if(cache.current[url]){
			dispatch({type: 'FETCH_SUCCESS', data: cache.current[url]});
			return;
		}
		try{
			const response = await fetch(url);
			if(!response.ok) throw new Error(response.statusText);
			const data = (await response.json()) as T;
			cache.current[url] = data;

			if(cancelRequest.current) return;
			dispatch({type: 'FETCH_SUCCESS', data});
		}catch(error){
			dispatch({type: 'FETCH_FAILURE', error: error as Error})
		}
	}

	return { data, loading, error, reFetch };
}

export default useFetch;