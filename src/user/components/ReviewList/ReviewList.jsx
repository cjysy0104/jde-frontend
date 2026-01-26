import React, { useEffect, useRef, useState } from "react";
import ReviewCard from "./ReviewCard";
import {
  Container,
  ReviewGrid,
  SearchSection,
  SearchBar,
  SearchInput,
  SearchIcon,
  SortDropdown,
  FloatingButton,
  PlusIcon,
} from "./ReviewList.styled";
import { reviewApi } from "../../../utils/api";

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [hasNext, setHasNext] = useState(true);
    const [cursor, setCursor] = useState(null);

    const [loading, setLoading] = useState(false);

    const elementRef = useRef(null);

    const onIntersection = (entries) => {
        const firstEntry = entries[0];

        if(firstEntry.isIntersecting && hasNext && !loading){
            fetchNextReviews();
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(onIntersection);

        if(elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if(elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };

    }, [hasNext, loading]);

    const fetchNextReviews = async() => {
        if(loading || !hasNext) return;
        setLoading(true);

        try {
            const response = await reviewApi.getReviewList({
                cursor: cursor,
                sort: 'latest',
            });
            const data = response.data;
            console.log(data);
    
            setReviews((prevReviews) => [...prevReviews, ...data]);
    
            if(data.length === 0){
                setHasNext(false);
                return;
            } else {
                setCursor(data[data.length - 1].reviewNo);
            }
        } catch (error) {
            console.log("?", error);
        } finally {
            setLoading(false)
        }

    };




  return (
    <Container>
      <SearchSection>
        <SearchBar>
          <SearchInput type="text" placeholder="Search" />
          <SearchIcon>🔍</SearchIcon>
        </SearchBar>
        <SortDropdown>
          <select defaultValue="최신순" disabled>
            <option>최신순</option>
          </select>
        </SortDropdown>
      </SearchSection>

      <ReviewGrid>
        {reviews.map((review) => (
          <ReviewCard key={review.reviewNo} review={review} />
        ))}
      </ReviewGrid>

      {hasNext && !loading && (
        <div ref={elementRef} style={{textAlign: 'center'}}>
            로딩중
        </div>
      )}

      <FloatingButton>
        <PlusIcon>+</PlusIcon>
      </FloatingButton>
    </Container>
  );
};

export default ReviewList;
