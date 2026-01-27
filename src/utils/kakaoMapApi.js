import axios from "axios";

  const KAKAO_KEY =
    window.ENV?.KAKAO_API_KEY ??
    import.meta.env.KAKAO_API_KEY;

export const kakaoMapApi = {
    
    getAddressByQuery: async ({
        query,
        category_group_code = "FD6"}) => {

            try{
                const response = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json`, {
                    headers:{
                        Authorization: `KakaoAK ${KAKAO_KEY}`
                    },
                    params:{
                        query,
                        category_group_code
                    },
                });

                return response.data;
            } catch (error) {
                console.error("getAddressByQuery error:", error);
                throw error;
            }
    },
}