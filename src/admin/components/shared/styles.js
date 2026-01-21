import styled from 'styled-components';

export const ManagementContainer = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
`;

export const ManagementHeader = styled.div`
  margin-bottom: 32px;
`;

export const ManagementTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

export const TableContainer = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  margin-bottom: 24px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  padding: 16px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9fafb;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  background-color: ${props => props.color || '#6b7280'};
  border-radius: 12px;
`;

export const ActionButton = styled.button`
  padding: 6px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #3b82f6;
  background-color: #eff6ff;
  border: 1px solid #3b82f6;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #3b82f6;
    color: white;
  }
`;

export const DeleteButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  background-color: #ef4444;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #dc2626;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
`;

export const PageButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.active ? 'white' : '#374151'};
  background-color: ${props => props.active ? '#3b82f6' : 'white'};
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#2563eb' : '#f9fafb'};
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
  padding: 24px;
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  border-bottom: 1px solid #e5e7eb;
`;

export const ModalBody = styled.div`
  padding: 24px;
`;

export const ModalFooter = styled.div`
  padding: 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const DetailSection = styled.div`
  margin-bottom: 16px;
`;

export const DetailLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const DetailValue = styled.div`
  font-size: 14px;
  color: #111827;
  line-height: 1.5;
  word-break: break-word;
`;

export const RoleSelect = styled.select`
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: white;
  color: #111827;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;
