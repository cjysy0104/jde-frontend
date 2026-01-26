import React from "react";
import {
  Card,
  Avatar,
  Nickname,
  MetaRow,
  MetaItem,
  MetaValue,
  Grid,
  SkeletonCard,
} from "./styles";
import { Heart, FileText } from "lucide-react";

const FALLBACK = "https://dummyimage.com/160x160/e9ecef/6c757d&text=USER";

const CaptainCard = ({
  memberNo,
  nickname,
  fileUrl,
  reviewCount,
  likeCount,
  onClick,
}) => {
  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(memberNo)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.(memberNo);
      }}
    >
      <Avatar
        src={fileUrl || FALLBACK}
        alt={nickname}
        onError={(e) => (e.currentTarget.src = FALLBACK)}
      />

      <Nickname>{nickname}</Nickname>

      <MetaRow>
        <MetaItem>
          <Heart size={16} strokeWidth={1.8} />
          <MetaValue>{likeCount ?? 0}</MetaValue>
        </MetaItem>

        <MetaItem>
          <FileText size={16} strokeWidth={1.8} />
          <MetaValue>{reviewCount ?? 0}</MetaValue>
        </MetaItem>
      </MetaRow>
    </Card>
  );
};

CaptainCard.Grid = Grid;

CaptainCard.SkeletonGrid = ({ count = 6 }) => (
  <Grid>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </Grid>
);

export default CaptainCard;
