import axios from "axios";

const API_BASE_URL = window.ENV?.API_BASE_URL || "http://localhost:8080";

// 스토리지
export const authStorage = {
  getToken: () => localStorage.getItem("authToken"),
  setToken: (token) => localStorage.setItem("authToken", token),
  removeToken: () => localStorage.removeItem("authToken"),

  getRefreshToken: () => localStorage.getItem("refreshToken"),
  setRefreshToken: (token) => localStorage.setItem("refreshToken", token),
  removeRefreshToken: () => localStorage.removeItem("refreshToken"),

  getMemberInfo: () => {
    const memberInfo = localStorage.getItem("memberInfo");
    return memberInfo ? JSON.parse(memberInfo) : null;
  },
  setMemberInfo: (memberInfo) => {
    localStorage.setItem("memberInfo", JSON.stringify(memberInfo));
  },
  removeMemberInfo: () => localStorage.removeItem("memberInfo"),

  clear: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("memberInfo");
  },
};

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// refresh 전용 (중요: apiClient 사용 금지 → 무한루프 방지)
const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 동시 401 발생 시 refresh 중복 호출 방지
let refreshPromise = null;

// refresh 응답: accessToken만 내려오는 스펙 반영
const applyAccessToken = (refreshResponseData) => {
  const newAccessToken = refreshResponseData?.data?.accessToken;

  if (!newAccessToken) {
    throw new Error("토큰 갱신 응답에 accessToken이 없습니다.");
  }

  authStorage.setToken(newAccessToken);
  return newAccessToken;
};

const notifyForceLogout = (reason = "REFRESH_FAILED") => {
  window.dispatchEvent(
    new CustomEvent("auth:forceLogout", { detail: { reason } })
  );
};

const requestRefresh = async () => {
  const refreshToken = authStorage.getRefreshToken();
  if (!refreshToken)
    throw new Error("refreshToken이 없습니다. 다시 로그인 해주세요.");

  const res = await refreshClient.post("/api/auth/refresh", { refreshToken });

  if (!res?.data?.success) {
    const msg = res?.data?.message || "토큰 갱신에 실패했습니다.";
    throw new Error(msg);
  }

  return applyAccessToken(res.data);
};

// 요청 인터셉터: 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = authStorage.getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401이면 refresh 후 재시도
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (!error?.response) {
      if (error?.request) {
        return Promise.reject(
          new Error("서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.")
        );
      }
      return Promise.reject(
        new Error(error?.message || "요청 중 오류가 발생했습니다.")
      );
    }

    const { status, data } = error.response;
    const originalRequest = error.config;

    const isAuthExpired = status === 401;
    const isRefreshRequest = originalRequest?.url?.includes("/api/auth/refresh");

    if (
      isAuthExpired &&
      !isRefreshRequest &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = requestRefresh().finally(() => {
            refreshPromise = null;
          });
        }

        const newAccessToken = await refreshPromise;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshErr) {
        authStorage.clear();
        notifyForceLogout("REFRESH_TOKEN_EXPIRED");
        return Promise.reject(refreshErr);
      }
    }

    const errorMessage = data?.message || data?.error || error.message;
    return Promise.reject(new Error(errorMessage));
  }
);

export default apiClient;
