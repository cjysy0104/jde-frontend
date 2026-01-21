export const styles = {
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  title: { fontSize: 22, fontWeight: 800, margin: 0 },

  tabGroup: { display: "flex", gap: 8 },

  pillBtn: (active) => ({
    padding: "10px 14px",
    borderRadius: 999,
    border: "1px solid #e5e7eb",
    background: active ? "#f97316" : "#fff",
    color: active ? "#fff" : "#111827",
    fontWeight: 700,
    cursor: "pointer",
  }),

  empty: { color: "#6b7280", fontWeight: 700 },

  list: { display: "grid", gap: 12 },

  card: { padding: 14, border: "1px solid #eee", borderRadius: 14 },

  cardTop: { display: "flex", justifyContent: "space-between", gap: 12 },

  cardTitle: { fontWeight: 800 },

  meta: { fontSize: 13, opacity: 0.8 },

  btnRow: { display: "flex", gap: 8 },

  btnLink: {
    display: "inline-block",
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid #ddd",
    textDecoration: "none",
    color: "#111",
  },

  btnDark: {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid #111",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
  },

  btnDanger: {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid #ffdddd",
    background: "#ffdddd",
    color: "#a40000",
    cursor: "pointer",
  },

  content: { marginTop: 10 },

  footer: { marginTop: 10, fontSize: 12, opacity: 0.7 },

  moreWrap: { marginTop: 16 },

  moreBtn: (disabled) => ({
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: disabled ? "not-allowed" : "pointer",
  }),

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
    fontWeight: 800,
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

  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 18,
  },

  fullBtn: {
    width: "100%",
    marginTop: 10,
    padding: "12px 0",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 900,
  },

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
    fontWeight: 800,
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
