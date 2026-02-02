import React, { useState, useCallback } from "react";
import SearchSection from "./components/SearchSection";
import TodaysReview from "./components/TodaysReview";
import { useNavigate } from "react-router";

const UserHome = () => {
  const navigate = useNavigate();
  const [keywordNo, setKeywordNo] = useState(null);
  const [query, setQuery] = useState("");

  const goSearchPage = useCallback(() => {
    const q = query.trim();
    if (!q) {
      navigate("/reviews");
      return;
    }
    navigate(`/reviews?query=${encodeURIComponent(q)}`);
  }, [navigate, query]);

  return (
    <>
      <SearchSection
        keywordNo={keywordNo}
        setKeywordNo={setKeywordNo}
        query={query}
        setQuery={setQuery}
        onSubmit={goSearchPage}
      />
      <TodaysReview keywordNo={keywordNo} query={query} />
    </>
  );
};

export default UserHome;
