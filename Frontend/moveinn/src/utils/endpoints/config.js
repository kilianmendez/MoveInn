export const API_BASE = "localhost:7023"; 


export const API_BASE_URL = `https://${API_BASE}/api`;
export const API_BASE_SOCKET_URL = `wss://${API_BASE}`;
export const API_BASE_IMAGE_URL = `https://${API_BASE}/`;


const API_AUTH = `${API_BASE_URL}/Auth`;
export const API_AUTH_LOGIN = `${API_AUTH}/Login`;
export const API_AUTH_REGISTER = `${API_AUTH}/Register`;


const API_USER = `${API_BASE_URL}/User`;
export const API_GET_USER = (id) => `${API_USER}/${id}`;
export const API_UPDATE_USER = (id) => `${API_USER}/Update/${id}`;
export const API_DELETE_USER = (id) => `${API_USER}/Delete/${id}`;
export const API_UPDATE_SOCIALMEDIA = (id) => `${API_USER}/${id}/SocialMedias`;
const API_RECOMMENDATION = `${API_BASE_URL}/Recommendation`;
export const API_ALL_RECOMMENDATION = `${API_RECOMMENDATION}/AllRecommendations`;
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


const API_FORUMS = `${API_BASE_URL}/Forum`;
export const API_ALL_FORUMS = `${API_FORUMS}/forum`;
export const API_FORUM_THREADS_BY_FORUM_ID = (forumId) => `${API_FORUMS}/thread/forum/${forumId}`;
export const API_FORUM_MESSAGES_BY_THREAD_ID = (threadId) => `${API_FORUMS}/message/thread/${threadId}`;
export const API_FORUM_POST_FORUM = `${API_FORUMS}/forum`;
export const API_FORUM_POST_THREAD = `${API_FORUMS}/thread`;
export const API_FORUM_POST_RESPONSE_TO_THREAD = `${API_FORUMS}/createMessageInThread`;


const API_LOCATION = `${API_BASE_URL}/Location`;
export const API_GET_COUNTRYSEARCH = (query) => `${API_LOCATION}/CountriesSearch?query=${query}`;
export const API_GET_CITYSEARCH = (country, query) =>`${API_LOCATION}/CitiesSearch?country=${country}&query=${query}`;

const API_EVENT = `${API_BASE_URL}/Event`;
export const API_CREATE_EVENT = `${API_EVENT}`;
export const API_GET_ALL_EVENTS = `${API_EVENT}`;
export const API_GET_EVENT = (id) => `${API_EVENT}/${id}`;
export const API_DELETE_EVENT = (id) => `${API_EVENT}/${id}`;
export const API_JOIN_EVENT = (id, userId) => `${API_EVENT}/${id}/join?userId=${userId}`;
export const API_LEAVE_EVENT = (id, userId) => `${API_EVENT}/${id}/leave?userId=${userId}`;

const API_REVIEWS = `${API_BASE_URL}/Reviews`;
export const API_GET_ALL_REVIEWS = `${API_REVIEWS}`;
export const API_GET_REVIEW = (id) => `${API_REVIEWS}/${id}`;
export const API_CREATE_REVIEW = `${API_REVIEWS}`;
export const API_DELETE_REVIEW = (id) => `${API_REVIEWS}/${id}`;
export const API_GET_REVIEWS_BY_ACCOMMODATION = (accommodationId) => `${API_REVIEWS}/accommodation/${accommodationId}`;