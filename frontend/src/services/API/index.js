import axios from "../../axios";

const handleApiRequest = async (apiCall) => {
    try {
        const response = await apiCall();
        return response;
    } catch (error) {
        console.error(error);
        return error;
    }
};

const post = (uri, data) => axios.post(uri, data);
const put = (uri, data) => axios.put(uri, data);
const get = (uri) => axios.get(uri);
const formPost = (uri, data) => axios.post(uri, data);
const formPostAttachment = (uri, data, setProgress, Signal) => {
    return axios.post(uri, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
            if (progressEvent && progressEvent.total) {
                const progress = (progressEvent.loaded / progressEvent.total) * 100;
                setProgress(progress);
            }
        },
        cancelToken: Signal
    });
};

export default { handleApiRequest, post, put, get, formPost, formPostAttachment };
