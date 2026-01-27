import styled from 'styled-components';

export const UserPageContainer = styled.div`
  min-height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export const NotFoundPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column; 
  background-color: white;
`;

/* 미식대장용 스타일 */
export const CaptainPageBody = styled.div`
  padding: 24px;
  min-height: 60vh;
`;

export const CaptainTitle = styled.h2`
  margin: 12px 0 10px;
  font-size: 40px;        
  font-weight: 800;
  text-align: center;    
`;


export const CaptainSubTitle = styled.p`
  margin: 0 0 16px;
  font-size: 13px;
  color: #666;
  text-align: center;  
`;

export const CaptainErrorBox = styled.div`
  padding: 12px 14px;
  border-radius: 12px;
  background: #fff5f5;
  border: 1px solid #ffd6d6;
  color: #c92a2a;
  margin-bottom: 14px;
`;

export const CaptainEmptyBox = styled.div`
  padding: 40px 16px;
  border: 1px dashed #ddd;
  border-radius: 12px;
  color: #666;
`;
/* 여기까지 미식대장 */

export const ReviewListContainer = styled.div`
  min-height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export const ReviewDetailContainer = styled.div`
  min-height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
`;
