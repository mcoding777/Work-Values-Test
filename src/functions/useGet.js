import axios from 'axios';

// 심리검사 항목 API 호출 함수
async function useGet(url) {
    try {
        const response = await axios.get(url);
        data = response.data;
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// const res = response.data.RESULT;
// setResult([...res]);