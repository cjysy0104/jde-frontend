import React, { useState, useEffect } from 'react';
import { myActivityApi } from '../../../utils/api';
import {
  AvatarListContainer,
  AvatarItem,
  AvatarImage,
  AvatarName,
} from './styles';

// 기본 아바타 이미지 (SVG data URI)
const defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNFNUU3RUIiLz4KPHBhdGggZD0iTTI0IDE0QzI2LjIwOTEgMTQgMjggMTUuNzkwOSAyOCAxOEMyOCAyMC4yMDkxIDI2LjIwOTEgMjIgMjQgMjJDMjEuNzkwOSAyMiAyMCAyMC4yMDkxIDIwIDE4QzIwIDE1Ljc5MDkgMjEuNzkwOSAxNCAyNCAxNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTI0IDI2QzE4LjQ3NzEgMjYgMTQuMDExNCAyOC45MDU3IDEyIDMzLjA2OTlWMjZIMzZWMzMuMDY5OUMzMy45ODg2IDI4LjkwNTcgMjkuNTIyOSAyNiAyNCAyNloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';

// 개별 아바타 이미지 컴포넌트 (에러 상태 관리)
const AvatarImageWithFallback = ({ src, alt, defaultSrc }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // src가 변경되면 상태 초기화
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(defaultSrc);
    }
  };

  return (
    <AvatarImage 
      src={imgSrc} 
      alt={alt}
      onError={handleError}
    />
  );
};

const UserAvatarList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaptainList = async () => {
      try {
        setLoading(true);
        const response = await myActivityApi.getCaptainList();
        
        // 응답 데이터 구조에 따라 조정
        let memberList = [];
        if (Array.isArray(response?.data)) {
          memberList = response.data;
        } else if (response?.data?.content && Array.isArray(response.data.content)) {
          memberList = response.data.content;
        } else if (response?.data?.data && Array.isArray(response.data.data)) {
          memberList = response.data.data;
        }

        // 최대 인원 표시 지금은 5명명
        const displayUsers = memberList.map((member) => {
          // fileUrl이 null이거나 빈 문자열이면 기본 아바타 사용
          const avatarUrl = member.fileUrl && member.fileUrl.trim() !== '' 
            ? member.fileUrl 
            : defaultAvatar;
          
          return {
            name: member.nickname || member.memberName || 'Unknown',
            avatar: avatarUrl,
            memberNo: member.memberNo,
          };
        });

        setUsers(displayUsers);
      } catch (error) {
        console.error('회원 목록 로딩 실패:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCaptainList();
  }, []);

  if (loading) {
    return (
      <AvatarListContainer>
        <div style={{ padding: '10px', textAlign: 'center', color: '#666' }}>
          로딩 중...
        </div>
      </AvatarListContainer>
    );
  }

  if (users.length === 0) {
    return (
      <AvatarListContainer>
        <div style={{ padding: '10px', textAlign: 'center', color: '#666' }}>
          표시할 회원이 없습니다.
        </div>
      </AvatarListContainer>
    );
  }

  return (
    <AvatarListContainer>
      {users.map((user, index) => (
        <AvatarItem key={user.memberNo || index}>
          <AvatarImageWithFallback 
            src={user.avatar} 
            alt={user.name}
            defaultSrc={defaultAvatar}
          />
          <AvatarName>{user.name}</AvatarName>
        </AvatarItem>
      ))}
    </AvatarListContainer>
  );
};

export default UserAvatarList;
