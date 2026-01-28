import React, { useState } from "react";
import SearchSection from "./components/SearchSection";
import TodaysReview from "./components/TodaysReview";

const UserHome = () => {
  const [keywordNo, setKeywordNo] = useState(null);
  const [query, setQuery] = useState("");

  return (
    <>
      <SearchSection
        keywordNo={keywordNo}
        setKeywordNo={setKeywordNo}
        query={query}
        setQuery={setQuery}
      />
      <TodaysReview keywordNo={keywordNo} query={query} />
    </>
  );
};

export default UserHome;
