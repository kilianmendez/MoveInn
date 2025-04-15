const API_BASE = "localhost:7023"; 

export const API_BASE_URL = `https://${API_BASE}/api`;
export const API_BASE_SOCKET_URL = `wss://${API_BASE}`;

const API_AUTH = `${API_BASE_URL}/Auth`;
export const API_AUTH_LOGIN = `${API_AUTH}/Login`;
export const API_AUTH_REGISTER = `${API_AUTH}/Register`;

const API_USER = `${API_BASE_URL}/User`;
export const API_GET_USER = (id) => `${API_USER}/${id}`;

