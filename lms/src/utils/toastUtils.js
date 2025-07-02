import { toast } from "react-toastify";

/**
 * Show a single toast message summarizing action on multiple students.
 * 
 * @param {string} actionName - The action performed (e.g., "Suspended")
 * @param {Array} rows - Array of objects with at least a `name` property
 * @param {string} toastType - Type of toast: "info", "error", "success"
 */
export const showToastWithNames = (actionName, rows, toastType = "info") => {
  if (!rows || rows.length === 0) return;

  const names = rows.map((row) => row.name);
  const count = names.length;
  const displayNames = names.slice(0, 3).join(", ");
  const moreCount = count - 3;

  const message =
    count <= 3
      ? `${actionName}: ${displayNames}`
      : `${actionName}: ${displayNames} and ${moreCount} more student(s)`;

  if (toastType === "error") toast.error(message);
  else if (toastType === "success") toast.success(message);
  else toast.info(message);
};
