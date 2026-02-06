import {getAuthToken} from "./auth.ts";

export async function apiFetch(url: string, options: RequestInit = {}){
    const token = getAuthToken();

    const res = await fetch(url, {
        ...options,
        headers:{
            'Content-Type': 'application/json',
            ...(token && {Authorization: `Bearer ${token}`}),
            ...options.headers,
        },
    });

    const data = await res.json();

    if(!res.ok){
        throw new Error(data.error || "Something went wrong");
    }

    return data;
}