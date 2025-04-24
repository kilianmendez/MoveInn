export const API_BASE = "localhost:7023"; 

export const API_BASE_URL = `https://${API_BASE}/api`;
export const API_BASE_SOCKET_URL = `wss://${API_BASE}`;
export const API_BASE_IMAGE_URL = `https://${API_BASE}/`;

const API_AUTH = `${API_BASE_URL}/Auth`;
export const API_AUTH_LOGIN = `${API_AUTH}/Login`;
export const API_AUTH_REGISTER = `${API_AUTH}/Register`;

const API_USER = `${API_BASE_URL}/User`;
export const API_GET_USER = (id) => `${API_USER}/${id}`;

const API_RECOMMENDATION = `${API_BASE_URL}/Recommendation`;
export const API_SEARCH_RECOMMENDATION = `${API_RECOMMENDATION}/SearchRecommendation`;

const API_RESERVATION = `${API_BASE_URL}/Reservation`;
export const API_GET_RESERVATION = (id) => `${API_RESERVATION}/${id}`;
export const API_CREATE_RESERVATION = `${API_RESERVATION}/CreateReservation`;
export const API_UPDATE_RESERVATION = (id) => `${API_RESERVATION}/Update/${id}`;
export const API_DELETE_RESERVATION = (id) => `${API_RESERVATION}/Delete/${id}`;

const API_ACCOMMODATION = `${API_BASE_URL}/Accommodations`;
export const API_GET_ACCOMMODATION = (id) => `${API_ACCOMMODATION}/${id}`;
export const API_CREATE_ACCOMMODATION = `${API_ACCOMMODATION}/CreateAccommodation`;
export const API_UPDATE_ACCOMMODATION = (id) => `${API_ACCOMMODATION}/Update/${id}`;
export const API_DELETE_ACCOMMODATION = (id) => `${API_ACCOMMODATION}/Delete/${id}`;
export const API_GET_UNAVAILABLEDATESBYACCOMMODATION = (id) => `${API_ACCOMMODATION}/UnavailableDates/${id}`;

const API_PAYMENT = `${API_BASE_URL}/Payment`;
export const API_CREATE_PAYMENT = `${API_PAYMENT}/CreatePaymentIntent`;
export const API_GET_RECOMMENDATION = (id) => `${API_RECOMMENDATION}/${id}`;

const API_ACOMMODATION = `${API_BASE_URL}/Accommodations`;
export const API_SEARCH_ACOMMODATION = `${API_ACOMMODATION}/SearchAccommodation`;
export const API_GET_ACOMMODATION = (id) => `${API_ACOMMODATION}/${id}`;
export const API_ALL_ACOMMODATIONS = `${API_ACOMMODATION}/AllAccommodations`;
