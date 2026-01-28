import React, { useEffect, useState } from 'react';
import { KeywordContainer, KeywordButton } from './KeywordSection.styled';
import { reviewApi } from '../../../utils/reviewApi';

const KeywordSection = ({ selectedKeywords, onKeywordToggle }) => {
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const res = await reviewApi.getKeywordList();
        setKeywords(res.data ?? []);
      } catch (e) {
        console.error(e);
        setKeywords([]);
      } finally {
        setLoading(false);
      }
    };

    fetchKeywords();
  }, []);

  if (loading) return null; 

  return (
    <KeywordContainer>
      {keywords.map((k) => (
        <KeywordButton
          key={k.keywordNo}
          selected={selectedKeywords.includes(k.keywordNo)}
          onClick={() => onKeywordToggle(k.keywordNo)}
        >
          #{k.keywordName}
        </KeywordButton>
      ))}
    </KeywordContainer>
  );
};

export default KeywordSection;
