export function saveAuthToken(token: string){
    localStorage.setItem('token', token);
}

export function getAuthToken(){
    if (typeof window === "undefined") return null
    return localStorage.getItem('token');
}

export function logout(){
    localStorage.removeItem('token');
}