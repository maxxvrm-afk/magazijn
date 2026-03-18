export function StatusMessage({
  message,
  tone = "info",
}: {
  message: string;
  tone?: "info" | "success" | "error";
}) {
  if (!message) return null;

  const style =
    tone === "success"
      ? { background: "#ecfdf5", borderColor: "#a7f3d0", color: "#065f46" }
      : tone === "error"
        ? { background: "#fef2f2", borderColor: "#fecaca", color: "#991b1b" }
        : { background: "#eff6ff", borderColor: "#bfdbfe", color: "#1e3a8a" };

  return (
    <div className="card" style={{ ...style, borderWidth: 1, borderStyle: "solid" }}>
      {message}
    </div>
  );
}
