interface DataTablePaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const DataTablePagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: DataTablePaginationProps) => {
    if (totalPages <= 1) {
        return null;
    }

    const pages: number[] = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <nav>
            <ul className="pagination pagination-sm mb-0">
                <li
                    className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                    <button
                        type="button"
                        className="page-link"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>

                {pages.map((page) => (
                    <li
                        key={page}
                        className={`page-item ${currentPage === page ? "active" : ""
                            }`}
                    >
                        <button
                            type="button"
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""
                        }`}
                >
                    <button
                        type="button"
                        className="page-link"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default DataTablePagination;