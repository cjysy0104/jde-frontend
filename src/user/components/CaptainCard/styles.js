import styled, { keyframes } from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 320px);
  gap: 20px;

  justify-content: center;
  margin: 0 auto;

  @media (max-width: 1020px) {
    grid-template-columns: repeat(2, 320px);
  }

  @media (max-width: 700px) {
    grid-template-columns: 320px;
  }
`;



export const Card = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 24px 16px 20px;
  text-align: center;

  border: 1px solid #e5e7eb; /* 얇은 테두리 */
  box-shadow: none;

  transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: #d1d5db;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
  }
`;




export const Avatar = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 10px;
  display: block;
  border: 2px solid #f1f1f1;
`;

export const Nickname = styled.div`
  font-size: 20px;
  font-weight: 600;   /* 800 → 600 */
  margin-bottom: 12px;
`;


export const MetaRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 28px;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #555;   
`;


export const Icon = styled.span`
  font-size: 15px;
`;

export const MetaValue = styled.span`
  font-weight: 500;   
`;


const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

export const SkeletonCard = styled.div`
  height: 210px;
  border-radius: 18px;
  border: 1px solid #eee;
  background: linear-gradient(90deg, #f3f3f3 25%, #e9e9e9 37%, #f3f3f3 63%);
  background-size: 800px 100%;
  animation: ${shimmer} 1.1s infinite linear;
`;
