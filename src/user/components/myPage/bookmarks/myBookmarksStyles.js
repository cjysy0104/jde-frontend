export const styles = {
  page: { width: "100%" },

  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 2px 14px",
    gap: 12,
  },

  title: {
    margin: 0,
    fontSize: 22,
    fontWeight: 900,
    letterSpacing: "-0.2px",
    color: "#111827",
  },

  refreshBtn: (disabled) => ({
    height: 36,
    padding: "0 12px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    background: disabled ? "#f3f4f6" : "#fff",
    color: disabled ? "#9ca3af" : "#111827",
    fontWeight: 900,
    cursor: disabled ? "not-allowed" : "pointer",
    whiteSpace: "nowrap",
  }),

  empty: {
    padding: "18px 0",
    color: "#6b7280",
    fontWeight: 800,
    textAlign: "center",
  },

  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 18,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  cardHover: {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
  },

  mediaWrap: {
    position: "relative",
    width: "100%",
    paddingTop: "75%",
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
  },

  media: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  profileBubble: {
    position: "absolute",
    bottom: 15,
    left: 15,
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
  },

  profileImg: {
    width: 24,
    height: 24,
  },

  meta: {
    padding: 18,
  },

  actionBar: {
    display: "flex",
    gap: 12,
    marginBottom: 12,
  },

  actionBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px 6px",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontFamily: "Pretendard, sans-serif",
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1,
    color: "#666",
    transition: "transform 0.2s, color 0.2s",
  },

  restaurantName: {
    fontSize: 18,
    fontWeight: 700,
    margin: "0 0 6px 0",
    color: "#333",
  },

  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },

  nickname: {
    fontSize: 13,
    fontWeight: 600,
    color: "#333",
  },

  rating: {
    fontSize: 13,
    color: "#ff6b35",
    fontWeight: 600,
  },

  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 1.5,
    margin: "0 0 10px 0",
    wordBreak: "break-word",
  },

  keywordContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },

  keywordBadge: {
    backgroundColor: "#f0f0f0",
    color: "#666",
    padding: "4px 10px",
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 500,
  },

  footer: {
    borderTop: "1px solid #eee",
    paddingTop: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dateLine: {
    fontSize: 12,
    color: "#999",
  },

  viewCount: {
    fontSize: 13,
    color: "#999",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },

  bottomStatus: {
    display: "flex",
    justifyContent: "center",
    padding: "18px 0 6px",
  },

  bottomText: {
    color: "#6b7280",
    fontWeight: 900,
  },

  skeletonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 18,
  },

  skeletonCard: {
    height: 340,
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.06)",
    background: "#f3f4f6",
  },
};
