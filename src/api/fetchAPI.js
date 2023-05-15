export const fetchAPI = async (url) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/${url}`);
		return data;
    } catch(error) {
        if (error.response) {
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
		} else if (error.request) {
			console.log(error.request);
		} else {
			console.log('Error', error.message);
		}
    }
};