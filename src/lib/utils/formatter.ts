export function formatUserInitials(name?: string | null) {
  if (!name?.trim()) {
    return "VA";
  }

  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase() || "U"
  );
}
