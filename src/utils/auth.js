const AUTH_KEY = "auth"; // 로그인 성공 시 여기에 저장

export function saveAuth(loginResponseDTO) {
  const auth = {
    accessToken: loginResponseDTO.accessToken,
    refreshToken: loginResponseDTO.refreshToken,
    user: {
      email: loginResponseDTO.email,
      memberName: loginResponseDTO.memberName,
      nickname: loginResponseDTO.nickname,
      phone: loginResponseDTO.phone,
      memberNo: loginResponseDTO.memberNo,
      enrollDate: loginResponseDTO.enrollDate,
      status: loginResponseDTO.status,
      role: loginResponseDTO.role,
      fileUrl: loginResponseDTO.fileUrl,
    },
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

export function getAuth() {
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function getUser() {
  return getAuth()?.user || null;
}

export function getAccessToken() {
  return getAuth()?.accessToken || "";
}

export function updateAuthUser(patchUser) {
  const auth = getAuth();
  if (!auth?.user) return;
  auth.user = { ...auth.user, ...patchUser };
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

export function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}
