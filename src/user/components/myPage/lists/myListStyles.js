export const styles = {
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  title: { fontSize: 22, fontWeight: 900, margin: 0 },

  tabGroup: { display: "flex", gap: 8 },

  pillBtn: (active) => ({
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid #e5e7eb",
    background: active ? "#f97316" : "#fff",
    color: active ? "#fff" : "#111827",
    fontWeight: 900,
    cursor: "pointer",
  }),

  empty: { color: "#6b7280", fontWeight: 800 },

  list: { display: "grid", gap: 14 },

  // 리뷰 카드
reviewCard: {
  display: "grid",
  gridTemplateColumns: "150px 1fr 120px",
  gap: 14,
  padding: 16,
  border: "1px solid #eee",
  borderRadius: 16,
  background: "#fff",
  alignItems: "center",
},

reviewThumbWrap: {
  width: 150,
  height: 120,
  borderRadius: 16,
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
},

reviewThumbFallback: {
  width: 110,
  height: 110,
  borderRadius: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#f39136",
  fontWeight: 900,
  letterSpacing: -0.2,
},

reviewThumbImg: {
  width: 110,
  height: 110,
  borderRadius: 22,
  objectFit: "cover",
  border: "4px solid #fbbf24",
  display: "block",
},

reviewBlackArea: {
  background: "transparent",
  borderRadius: 0,
  padding: 0,
  minWidth: 0,
  color: "#111827",
},

reviewHeadline: {
  fontSize: 16,
  fontWeight: 900,
  color: "#111827",
  marginBottom: 8,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
},

reviewMetaRow: {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  alignItems: "center",
  marginTop: 6,
  color: "#374151",
},

reviewMetaChip: {
  display: "inline-flex",
  alignItems: "center",
  padding: "0px",
  borderRadius: 0,
  background: "transparent",
  fontWeight: 800,
  fontSize: 13,
},

reviewDates: {
  marginTop: 8,
  fontSize: 12,
  fontWeight: 800,
  color: "#6b7280",
  lineHeight: 1.5,
},

reviewActionCol: {
  display: "flex",
  flexDirection: "row",
  gap: 10,
  justifyContent: "flex-end",
  alignItems: "center",
},
reviewShopName: {
  fontSize: 13,
  fontWeight: 900,
  color: "#374151",
  marginBottom: 6,
},

  // 댓글 카드
  commentCard: {
    display: "grid",
    gridTemplateColumns: "1fr 220px",
    gap: 14,
    padding: 16,
    border: "1px solid #eee",
    borderRadius: 16,
    background: "#fff",
    alignItems: "center",
  },

  commentBody: { minWidth: 0 },

  commentHeadline: {
    fontSize: 16,
    fontWeight: 900,
    color: "#111827",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    marginBottom: 6,
  },

  commentMetaRow: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    flexWrap: "wrap",
    fontSize: 13,
    color: "#4b5563",
    fontWeight: 800,
    marginBottom: 10,
  },

  commentMetaText: { opacity: 0.95 },
  dot: { opacity: 0.35 },

  commentContent: {
    fontSize: 14,
    color: "#111827",
    fontWeight: 800,
    lineHeight: 1.5,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  commentActionCol: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  // 공통 버튼
  btnOutline: {
    textAlign: "center",
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: "#fff",
    color: "#111827",
    textDecoration: "none",
    fontWeight: 900,
    cursor: "pointer",
  },

  btnDark: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #111",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 900,
  },

  btnDanger: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #ffe4e6",
    background: "#ffe4e6",
    color: "#9f1239",
    cursor: "pointer",
    fontWeight: 900,
  },
  // 페이저
  pagerWrap: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    marginTop: 18,
    alignItems: "center",
    flexWrap: "wrap",
  },

  pagerBtn: (active = false) => ({
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    background: active ? "#111" : "#fff",
    color: active ? "#fff" : "#111",
    fontWeight: 900,
    cursor: "pointer",
    minWidth: 40,
  }),

  pagerNavBtn: (disabled = false) => ({
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    background: disabled ? "#f3f4f6" : "#fff",
    color: disabled ? "#9ca3af" : "#111",
    fontWeight: 900,
    cursor: disabled ? "not-allowed" : "pointer",
  }),
};
