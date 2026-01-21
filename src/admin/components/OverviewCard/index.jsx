import React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { CardContainer, CardTitle, CardValue, CardChange, ChangeBadge } from './styles';

const OverviewCard = ({ title, value, change, positive = true, showArrow = false }) => {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardValue>{value}</CardValue>
      <CardChange>
        {showArrow && <FaArrowUp />}
        <ChangeBadge positive={positive}>
          {change}
        </ChangeBadge>
      </CardChange>
    </CardContainer>
  );
};

export default OverviewCard;
