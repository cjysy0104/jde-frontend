import styled from "styled-components";

export const Page = styled.div`
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  padding: 24px; /* ✅ ProfilePage 톤과 통일 */
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 900;
  color: #111827;
`;

export const EditButton = styled.button`
  border: 1px solid #e5e7eb;
  background: white;
  padding: 10px 12px;
  border-radius: 12px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }
`;

export const Card = styled.div`
  margin-top: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: white;
  padding: 18px;
`;

export const ProfileRow = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`;

export const AvatarWrap = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
`;

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AvatarFallback = styled.div`
  font-weight: 900;
  color: #6b7280;
  font-size: 22px;
`;

export const ProfileMeta = styled.div`
  flex: 1;
  min-width: 0;
`;

export const MainName = styled.div`
  font-size: 18px;
  font-weight: 900;
  color: #111827;
`;

export const SubEmail = styled.div`
  margin-top: 6px;
  font-size: 14px;
  font-weight: 700;
  color: #6b7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const InfoBox = styled.div`
  margin-top: 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 14px;
  display: grid;
  gap: 10px;
`;

export const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 10px;
  align-items: center;
`;

export const Label = styled.div`
  font-size: 12px;
  font-weight: 900;
  color: #6b7280;
`;

export const Value = styled.div`
  font-size: 13px;
  font-weight: 900;
  color: #111827;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
