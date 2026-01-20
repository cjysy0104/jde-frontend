import React from 'react';
import {
  AvatarListContainer,
  AvatarItem,
  AvatarImage,
  AvatarName,
} from './styles';

const users = [
  { name: 'Johnson D.', avatar: 'https://via.placeholder.com/48' },
  { name: 'Didinya J.', avatar: 'https://via.placeholder.com/48' },
  { name: 'Penny L.', avatar: 'https://via.placeholder.com/48' },
  { name: 'Elon M.', avatar: 'https://via.placeholder.com/48' },
];

const UserAvatarList = () => {
  return (
    <AvatarListContainer>
      {users.map((user, index) => (
        <AvatarItem key={index}>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarName>{user.name}</AvatarName>
        </AvatarItem>
      ))}
    </AvatarListContainer>
  );
};

export default UserAvatarList;
