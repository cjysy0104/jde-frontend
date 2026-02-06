import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./ReviewDetail.styled";
import ImageSlider from "../../common/Image/ImageSlider";

import { reviewApi } from "../../../../utils/reviewApi";
import { AuthContext } from "../../context/AuthContext";
import ReviewMapSection from "../../ReviewMapSection/ReviewMapSection";
import ReportModal from "../../report/ReportModal";
import { reportApi } from "../../../../utils/reportApi";

const ReviewDetailSkeleton = () => {
  return (
    <S.Container>
      <S.ContentWrapper>
        <S.LeftSection>
          {/* 별점 영역 */}
          <S.StarRating>
            {Array.from({ length: 5 }).map((_, i) => (
              <S.SkeletonStar key={i} />
            ))}
          </S.StarRating>

          {/* 리뷰 텍스트 영역 */}
          <S.SkeletonTextBlock>
            <S.SkeletonLine $w="92%" />
            <S.SkeletonLine $w="88%" />
            <S.SkeletonLine $w="76%" />
            <S.SkeletonLine $w="84%" />
            <S.SkeletonLine $w="60%" />
          </S.SkeletonTextBlock>

          {/* 작성자/식당 정보 */}
          <S.InfoSection>
            <S.InfoItem>
              <S.SkeletonLine $h="14px" $w="70px" />
              <S.SkeletonLine $h="18px" $w="140px" />
            </S.InfoItem>
            <S.InfoItem>
              <S.SkeletonLine $h="14px" $w="80px" />
              <S.SkeletonLine $h="18px" $w="180px" />
            </S.InfoItem>
          </S.InfoSection>
        </S.LeftSection>

        <S.RightSection>
          {/* 이미지 슬라이더 자리 */}
          <S.SkeletonBox $h="360px" />
        </S.RightSection>
      </S.ContentWrapper>

      {/* 지도 영역 자리 */}
      <S.MapSection>
        <S.SkeletonBox $h="260px" />
      </S.MapSection>

      {/* 버튼 자리 */}
      <S.ButtonGroup>
        <S.SkeletonButton />
        <S.SkeletonButton />
      </S.ButtonGroup>
    </S.Container>
  );
};

const ReviewDetail = ({ reviewNo }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reportOpen, setReportOpen] = useState(false);

  const isLoggedIn = auth?.isAuthenticated;

  const isAuthor =
    auth?.isAuthenticated &&
    review &&
    auth.memberNo === review.writer.memberNo;
  
  // 상세 화면 들어올 때 항상 맨 위
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [reviewNo]);


  useEffect(() => {
    let cancelled = false;

    const fetchReview = async () => {
      setLoading(true);
      setReview(null); // reviewNo 바뀌면 스켈레톤이 다시 보이게

      try {
        const response = await reviewApi.getDetailReview(reviewNo);
        const data = response.data;

        if (!cancelled) {
          setReview(data);
        }
      } catch (error) {
        console.error("리뷰 상세 조회 실패:", error);
        if (!cancelled) setReview(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchReview();

    return () => {
      cancelled = true;
    };
  }, [reviewNo]);

  // 버튼 핸들러들
  const handleGoBack = () => navigate(-1);

  const handleEdit = () => {
    navigate(`/reviews/update/${reviewNo}`);
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 이 리뷰를 삭제하시겠습니까?")) {
      try {
        await reviewApi.deleteReview(reviewNo);
        alert("리뷰가 삭제되었습니다.");
        navigate(-1);
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("리뷰 삭제에 실패했습니다.");
      }
    }
  };

  const handleReport = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    setReportOpen(true);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <S.Star key={index} $filled={index < rating}>
        ★
      </S.Star>
    ));
  };

  // 버튼 렌더링 함수
  const renderButtons = () => {
    if (!isLoggedIn) {
      return (
        <S.ButtonGroup>
          <S.BackButton onClick={handleGoBack}>뒤로가기</S.BackButton>
        </S.ButtonGroup>
      );
    } else if (isAuthor) {
      return (
        <S.ButtonGroup>
          <S.BackButton onClick={handleGoBack}>뒤로가기</S.BackButton>
          <S.EditButton onClick={handleEdit}>수정하기</S.EditButton>
          <S.DeleteButton onClick={handleDelete}>삭제하기</S.DeleteButton>
        </S.ButtonGroup>
      );
    } else {
      return (
        <S.ButtonGroup>
          <S.BackButton onClick={handleGoBack}>뒤로가기</S.BackButton>
          <S.ReportButton onClick={handleReport}>신고하기</S.ReportButton>
        </S.ButtonGroup>
      );
    }
  };

  // 로딩 중에는 스켈레톤
  if (loading) {
    return <ReviewDetailSkeleton />;
  }

  if (!review) {
    return <S.ErrorContainer>리뷰를 찾을 수 없습니다.</S.ErrorContainer>;
  }

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.LeftSection>
          <S.StarRating>{renderStars(review.rating)}</S.StarRating>

          <S.ReviewText>{review.content}</S.ReviewText>

          <S.InfoSection>
            <S.InfoItem>
              <S.Label>Written by</S.Label>
              <S.Value>{review.writer.nickname}</S.Value>
            </S.InfoItem>
            <S.InfoItem>
              <S.Label>Restaurant</S.Label>
              <S.Value>{review.restaurant.normalName}</S.Value>
            </S.InfoItem>
          </S.InfoSection>
        </S.LeftSection>

        <S.RightSection>
          <ImageSlider files={review.files} height={360} />
        </S.RightSection>
      </S.ContentWrapper>

      <S.MapSection>
        <ReviewMapSection
          restaurant={{
            normalName: review.restaurant.normalName,
            address: review.restaurant.address,
            latitude: review.restaurant.latitude,
            longitude: review.restaurant.longitude,
            thumbnailUrl: review.files?.[0]?.fileUrl ?? null,
          }}
        />

        <ReportModal
          open={reportOpen}
          onClose={() => setReportOpen(false)}
          targetLabel="리뷰"
          targetTitle={review?.content ? review.content.slice(0, 40) : ""}
          targetWriter={review?.writer?.nickname}
          onSubmit={({ reportCategoryNo, reportContent }) =>
            reportApi.createReviewReport({
              reviewNo,
              reportCategoryNo,
              reportContent,
            })
          }
        />
      </S.MapSection>

      {renderButtons()}
    </S.Container>
  );
};

export default ReviewDetail;
