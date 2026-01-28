import React from 'react';
import { Textarea, CharCount } from './ContentSection.styled';

const ContentSection = ({ content, onContentChange, maxLength = 1000 }) => {
  return (
    <>
      <Textarea
        placeholder="리뷰 내용을 작성해주세요..."
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        maxLength={maxLength}
      />
      <CharCount>{content.length} / {maxLength}</CharCount>
    </>
  );
};

export default ContentSection;