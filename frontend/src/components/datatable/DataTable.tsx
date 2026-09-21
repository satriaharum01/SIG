import type {ReactNode} from "react";
import { useMemo, useState } from "react";
import DataTablePagination from "./DataTablePagination";

export interface DataTableColumn<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    className?: string;
    render?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: DataTableColumn<T>[];

    loading?: boolean;
    error?: string | null;

    searchable?: boolean;
    searchPlaceholder?: string;

    pageSize?: number;

    emptyMessage?: string;
}

function DataTable<T extends Record<string, any>>({
    data,
    columns,
    loading = false,
    error = null,
    searchable = true,
    searchPlaceholder = "Search...",
    pageSize = 10,
    emptyMessage = "No data available",
}: DataTableProps<T>) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    /**
     * SEARCH
     */
    const filteredData = useMemo(() => {
        if (!search.trim()) {
            return data;
        }

        const keyword = search.toLowerCase();

        return data.filter((row) =>
            columns.some((column) => {
                const value = row[column.key];

                return String(value ?? "")
                    .toLowerCase()
                    .includes(keyword);
            })
        );
    }, [data, search, columns]);

    /**
     * SORTING
     */
    const sortedData = useMemo(() => {
        if (!sortKey) {
            return filteredData;
        }

        return [...filteredData].sort((a, b) => {
            const valueA = a[sortKey];
            const valueB = b[sortKey];

            if (valueA === valueB) {
                return 0;
            }

            if (valueA === null || valueA === undefined) {
                return 1;
            }

            if (valueB === null || valueB === undefined) {
                return -1;
            }

            const result = String(valueA).localeCompare(
                String(valueB),
                undefined,
                {
                    numeric: true,
                    sensitivity: "base",
                }
            );

            return sortDirection === "asc" ? result : -result;
        });
    }, [filteredData, sortKey, sortDirection]);

    /**
     * PAGINATION
     */
    const totalPages = Math.ceil(sortedData.length / pageSize);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;

        return sortedData.slice(start, start + pageSize);
    }, [sortedData, currentPage, pageSize]);

    /**
     * SORT COLUMN
     */
    const handleSort = (column: DataTableColumn<T>) => {
        if (!column.sortable) {
            return;
        }

        const key = String(column.key);

        if (sortKey === key) {
            setSortDirection((previous) =>
                previous === "asc" ? "desc" : "asc"
            );
        } else {
            setSortKey(key);
            setSortDirection("asc");
        }

        setCurrentPage(1);
    };

    /**
     * SEARCH
     */
    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    return (
        <div className="border-0 shadow-sm">
            {/* TABLE HEADER */}
            <div className="row card-header bg-white border-0 py-3 justify-content-between align-items-md-center">
                <div className="row g-3 align-items-center ">
                    <div className="col-md-9">
                        <div className="text-muted small">
                            Showing {paginatedData.length} of {sortedData.length} entries
                        </div>
                    </div>

                    {searchable && (
                        <div className="col-md-3">
                            <div className="input-group">
                                <span className="input-group-text bg-white">
                                    <i className="bi bi-search" />
                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={searchPlaceholder}
                                    value={search}
                                    onChange={(event) =>
                                        handleSearch(event.target.value)
                                    }
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* RESPONSIVE TABLE */}
            <div className="table-responsive">
                <table className="table table-hover table-bordered align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            {columns.map((column) => {
                                const key = String(column.key);

                                const isSorted = sortKey === key;

                                return (
                                    <th
                                        key={key}
                                        className={column.className}
                                        style={{
                                            cursor: column.sortable
                                                ? "pointer"
                                                : "default",
                                            whiteSpace: "nowrap",
                                        }}
                                        onClick={() => handleSort(column)}
                                    >
                                        <div className="d-flex align-items-center gap-2">
                                            <span>{column.label}</span>

                                            {column.sortable && (
                                                <>
                                                    {!isSorted && (
                                                        <i className="bi bi-arrow-down-up text-muted" />
                                                    )}

                                                    {isSorted &&
                                                        sortDirection === "asc" && (
                                                            <i className="bi bi-arrow-up" />
                                                        )}

                                                    {isSorted &&
                                                        sortDirection === "desc" && (
                                                            <i className="bi bi-arrow-down" />
                                                        )}
                                                </>
                                            )}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {/* LOADING */}
                        {loading && (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center py-5"
                                >
                                    <div
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                    />

                                    Loading data...
                                </td>
                            </tr>
                        )}

                        {/* ERROR */}
                        {!loading && error && (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center text-danger py-5"
                                >
                                    <i className="bi bi-exclamation-triangle me-2" />

                                    {error}
                                </td>
                            </tr>
                        )}

                        {/* EMPTY */}
                        {!loading &&
                            !error &&
                            paginatedData.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="text-center text-muted py-5"
                                    >
                                        {emptyMessage}
                                    </td>
                                </tr>
                            )}

                        {/* DATA */}
                        {!loading &&
                            !error &&
                            paginatedData.map((row, index) => (
                                <tr key={row.uuid ?? index}>
                                    {columns.map((column) => {
                                        const key = String(column.key);

                                        return (
                                            <td
                                                key={key}
                                                className={column.className}
                                            >
                                                {column.render
                                                    ? column.render(row)
                                                    : row[column.key]}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* FOOTER */}
            <div className="card-footer bg-white border-0 py-3">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                    <div className="small text-muted">
                        Page {totalPages === 0 ? 0 : currentPage} of{" "}
                        {totalPages}
                    </div>

                    <DataTablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default DataTable;