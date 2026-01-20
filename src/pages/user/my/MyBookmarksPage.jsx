import React, { useEffect, useState } from "react";
import { bookmarkApi } from "../../../utils/api";
import ReviewCard from "../components/ReviewCard"; 

export default function MyBookmarksPage() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);

  const load = async (p = 0) => {
    const data = await bookmarkApi.getMyBookmarks(p, 20);
    const list = data.result ?? data;
    setItems(Array.isArray(list) ? list : []);
    setPage(p);
  };

  useEffect(() => {
    load(0);
  }, []);

  const toggle = async (reviewNo) => {
    await bookmarkApi.toggle(reviewNo);
    await load(page);
  };

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 900, margin: "0 0 18px 0" }}>내 즐겨찾기</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
        {items.map((b, idx) => (
          <div key={b.reviewNo ?? idx}>
            <ReviewCard
              review={{
                restaurantName: b.storeName || b.restaurantName || "맛집",
                rating: b.rating ?? 0,
                category: b.category || "",
                image: b.thumbnailUrl || b.imageUrl || "https://via.placeholder.com/300x200?text=IMG",
              }}
            />

            <button
              onClick={() => toggle(b.reviewNo)}
              style={{
                width: "100%",
                marginTop: 10,
                padding: "12px 0",
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                background: "#fff",
                cursor: "pointer",
                fontWeight: 900,
              }}
            >
              즐겨찾기 해제
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 22 }}>
        <button disabled={page === 0} onClick={() => load(page - 1)}>이전</button>
        <button onClick={() => load(page + 1)}>다음</button>
      </div>
    </div>
  );
}
