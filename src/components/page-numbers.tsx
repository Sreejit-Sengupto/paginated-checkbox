import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}
const PageNumbers: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  // Generate page numbers array with dots
  const generatePagination = () => {
    // Always show first page
    const start: (number | string)[] = [1];

    // Calculate range around current page
    let fromCurrent = Math.max(2, currentPage - siblingCount);
    let toCurrent = Math.min(totalPages - 1, currentPage + siblingCount);

    // Adjust the range if current page is near the start or end
    if (currentPage <= 4) {
      toCurrent = 4;
    }
    if (currentPage >= totalPages - 3) {
      fromCurrent = totalPages - 3;
    }

    // Add dots before current range if needed
    if (fromCurrent > 2) {
      start.push("...");
    }

    // Add pages in current range
    for (let i = fromCurrent; i <= toCurrent; i++) {
      start.push(i);
    }

    // Add dots after current range if needed
    if (toCurrent < totalPages - 1) {
      start.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      start.push(totalPages);
    }

    return start;
  };

  const pages = generatePagination();

  // Button styles based on state
  const getButtonStyles = (page: number | string) => {
    const baseStyles = `
        flex items-center justify-center
        w-10 h-10
        text-sm font-medium
        transition-colors duration-150
        rounded-lg
      `;

    if (page === "...") {
      return `${baseStyles} cursor-default text-gray-500`;
    }

    if (page === currentPage) {
      return `${baseStyles} bg-black text-white hover:bg-black`;
    }

    return `${baseStyles} text-gray-700 hover:bg-gray-100`;
  };

  return (
    <nav className="flex items-center justify-center lg:space-x-2">
      {/* Page numbers */}
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() =>
            typeof page === "number" ? onPageChange(page) : undefined
          }
          disabled={page === "..."}
          className={getButtonStyles(page)}
        >
          {page}
        </button>
      ))}
    </nav>
  );
};

export default PageNumbers;
