import { useEffect, useState } from 'react';

const useKakaoMapScript = () => {
  const KAKAO_KEY =
    window.ENV?.KAKAO_MAP_APP_KEY ??
    import.meta.env.VITE_KAKAO_MAP_APP_KEY;

  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 카카오키 확인
    if (!KAKAO_KEY) {
      console.error("KAKAO_MAP_APP_KEY가 설정되지 않았습니다.");
      return;
    }
    
    // 이미 로드되어 있는지 확인
    if (window.kakao && window.kakao.maps) {
      setReady(true);
      return;
    }

    // 스크립트가 이미 DOM에 있는지 확인
    const existingScript = document.querySelector('script[src*="dapi.kakao.com"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        window.kakao.maps.load(() => {
          setReady(true);
        });
      });
      return;
    }

    // 새로운 스크립트 로드
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false&libraries=services`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        setReady(true);
      });
    };

    script.onerror = () => {
      console.error('Kakao Maps API 로드 실패');
    };
  }, []);

  return ready;
};

export default useKakaoMapScript;