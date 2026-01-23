import React from 'react';
import {
  AvatarListContainer,
  AvatarItem,
  AvatarImage,
  AvatarName,
} from './styles';

// 기본 아바타 이미지 (SVG data URI)
const defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNFNUU3RUIiLz4KPHBhdGggZD0iTTI0IDE0QzI2LjIwOTEgMTQgMjggMTUuNzkwOSAyOCAxOEMyOCAyMC4yMDkxIDI2LjIwOTEgMjIgMjQgMjJDMjEuNzkwOSAyMiAyMCAyMC4yMDkxIDIwIDE4QzIwIDE1Ljc5MDkgMjEuNzkwOSAxNCAyNCAxNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTI0IDI2QzE4LjQ3NzEgMjYgMTQuMDExNCAyOC45MDU3IDEyIDMzLjA2OTlWMjZIMzZWMzMuMDY5OUMzMy45ODg2IDI4LjkwNTcgMjkuNTIyOSAyNiAyNCAyNloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';

const users = [
  { name: 'Johnson D.', avatar: defaultAvatar },
  { name: 'Didinya J.', avatar: defaultAvatar },
  { name: 'Penny L.', avatar: defaultAvatar },
  { name: 'Elon M.', avatar: defaultAvatar },
];

const UserAvatarList = () => {
  return (
    <AvatarListContainer>
      {users.map((user, index) => (
        <AvatarItem key={index}>
          <AvatarImage 
            src={user.avatar} 
            alt={user.name}
            onError={(e) => {
              e.target.src = defaultAvatar;
            }}
          />
          <AvatarName>{user.name}</AvatarName>
        </AvatarItem>
      ))}
    </AvatarListContainer>
  );
};

export default UserAvatarList;
