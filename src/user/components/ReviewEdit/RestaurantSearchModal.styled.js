import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const Modal = styled.div`
  width: min(560px, calc(100vw - 24px));
  max-height: min(70vh, 640px);
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 16px;
`;

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  font-size: 22px;
  cursor: pointer;
`;

export const Body = styled.div`
  padding: 12px 16px;
  overflow: auto;
`;

export const StateText = styled.div`
  padding: 20px 0;
  text-align: center;
  color: #666;
`;

export const ErrorText = styled(StateText)`
  color: #d00;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Item = styled.button`
  width: 100%;
  text-align: left;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 12px;
  background: #fff;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }
`;

export const PlaceName = styled.div`
  font-weight: 700;
  margin-bottom: 4px;
`;

export const Address = styled.div`
  font-size: 13px;
  color: #444;
  margin-bottom: 4px;
`;

export const Meta = styled.div`
  font-size: 12px;
  color: #777;
`;
