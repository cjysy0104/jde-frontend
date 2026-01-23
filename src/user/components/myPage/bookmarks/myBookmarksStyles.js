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
    gap: 16,
  },

  card: {
    border: "1px solid #eef0f3",
    borderRadius: 14,
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 1px 0 rgba(17, 24, 39, 0.04)",
  },

  mediaWrap: {
    position: "relative",
    width: "100%",
    aspectRatio: "1 / 1",
    background: "#f3f4f6",
  },

  media: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  kebabBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 10,
    border: "1px solid rgba(229,231,235,0.9)",
    background: "rgba(255,255,255,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#111827",
  },

  meta: {
    padding: "10px 12px 12px",
  },

  iconRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 8,
  },

  leftIcons: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  iconItem: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontWeight: 900,
    color: "#111827",
  },

  iconCount: {
    fontSize: 13,
    color: "#111827",
  },

  bookmarkBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#111827",
  },

  titleLine: {
    fontSize: 15,
    fontWeight: 950,
    color: "#111827",
    marginBottom: 6,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  contentLine: {
    fontSize: 13,
    fontWeight: 700,
    color: "#374151",
    lineHeight: 1.45,
    wordBreak: "break-word",
    marginBottom: 8,
  },

  moreBtn: {
    marginLeft: 6,
    border: "none",
    background: "transparent",
    color: "#6b7280",
    fontWeight: 900,
    cursor: "pointer",
    padding: 0,
  },

  dateLine: {
    fontSize: 12,
    fontWeight: 800,
    color: "#9ca3af",
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
    gap: 16,
  },

  skeletonCard: {
    height: 320,
    borderRadius: 14,
    border: "1px solid #eef0f3",
    background: "#f3f4f6",
  },
};
