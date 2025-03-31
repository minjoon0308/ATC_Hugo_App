import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

//refresh token gets new authtoken
API.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                    refresh: refreshToken
                });

                localStorage.setItem('authToken', response.data.access);
                API.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;

                return API(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                logoutUser();
            }
        }
        return Promise.reject(error);
    }
);


export const registerUser = async(username, email, password) => {
    const response = await API.post('register/', {username, email, password});
    return response.data;
}

export const loginUser = async (username, password) => {
    const response = await API.post('login/', { username, password });
    localStorage.setItem('authToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    return response.data.access; // Assuming the response contains a JWT token
}

export const logoutUser = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken'); // Retrieve refresh token
        if (refreshToken) {
            await API.post('logout/', { refresh_token: refreshToken });
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken'); // Clear refresh token as well
        }
    } catch (error) {
        console.error('Logout failed:', error);
    }
    
}