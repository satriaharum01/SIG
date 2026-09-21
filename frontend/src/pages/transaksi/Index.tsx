import { useEffect, useState } from "react";

import DataTable, {
    type DataTableColumn,
} from "../../components/datatable/DataTable";

import { getTransaksi } from "../../services/transaksiService";
import type { ITransaksi } from "../../types/transaksi";

import PageHeader from "../../components/common/PageHeader";
import EmptyState from "../../components/common/EmptyState";


const TransaksiPage = () => {
    const [orders, setOrders] = useState<ITransaksi[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    /**
       * LOAD DATA FROM API
       */

    const loadOrders = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getTransaksi();

            if (response.status) {
                setOrders(response.data);
            } else {
                setOrders([]);
                setError("Failed to load orders.");
            }
        } catch (err) {
            console.error(err);

            setError(
                "Unable to connect to the server."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    /**
     * TABLE COLUMNS
     */
    const columns: DataTableColumn<ITransaksi>[] = [
        {
            key: "nasabah",
            label: "Nasabah",
            sortable: true,
        },

        {
            key: "amount",
            label: "Amount",
            sortable: true,

            render: (row) =>
                new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                }).format(row.jumlah),
        },

        {
            key: "tanggal",
            label: "Tanggal",
            sortable: true,

            render: (row) =>
                new Date(row.tanggal).toLocaleDateString(
                    "id-ID",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    }
                ),
        },

        {
            key: "status",
            label: "Status",
            sortable: true,
            className: "text-center",

            render: (row) => {
                let badgeClass = "bg-secondary";

                switch (row.status.toLowerCase()) {
                    case "lelang":
                        badgeClass = "bg-warning text-dark";
                        break;

                    case "aktif":
                        badgeClass = "bg-info text-dark";
                        break;

                    case "lunas":
                        badgeClass = "bg-success";
                        break;

                    case "jatuh tempo":
                        badgeClass = "bg-danger";
                        break;
                }

                return (
                    <span className={`badge ${badgeClass}`}>
                        {row.status}
                    </span>
                );
            },
        },

        {
            key: "actions",
            label: "Actions",
            className: "text-center",

            render: (row) => (
                <div className="d-flex justify-content-center gap-1">
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => {
                            console.log("View:", row.uuid);
                        }}
                    >
                        <i className="bi bi-eye" />
                    </button>

                    <button
                        type="button"
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => {
                            console.log("Edit:", row.uuid);
                        }}
                    >
                        <i className="bi bi-pencil" />
                    </button>

                    <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => {
                            console.log("Delete:", row.uuid);
                        }}
                    >
                        <i className="bi bi-trash" />
                    </button>
                </div>
            ),
        },
    ];
    return (
        <>
            <PageHeader title="Semua Transaksi" />
            <div className="card">
                <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                    <h2 className="card-title">Data Transaksi</h2>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            console.log("Add order");
                        }}
                    >
                        <i className="bi bi-plus-lg me-2" />
                        Add Order
                    </button>
                </div>

                <div className="container-fluid py-0">

                    {/* DATA TABLE */}
                    <DataTable
                        data={orders}
                        columns={columns}
                        loading={loading}
                        error={error}
                        pageSize={10}
                        searchable={true}
                        searchPlaceholder="Search orders..."
                        emptyMessage="No orders found."
                    />

                </div>
            </div>
        </>
    );
};

function BasicTables() {
    return <>
        <PageHeader title="Semua Transaksi" />
        <div className="card"><div className="card-header">
            <h2 className="card-title">Data Transaksi</h2>
        </div>
            {/* LOAD FROM DATABASE: rows tabel */}
            <EmptyState message="Table data will be loaded from backend." />
        </div>
    </>;
}


export default TransaksiPage;