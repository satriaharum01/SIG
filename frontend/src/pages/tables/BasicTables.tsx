import PageHeader from "../../components/common/PageHeader";
import EmptyState from "../../components/common/EmptyState";
export default function BasicTables() { return <><PageHeader title="Basic Tables" /><div className="card"><div className="card-header"><h2 className="card-title">Data</h2></div>{/* LOAD FROM DATABASE: rows tabel */}<EmptyState message="Table data will be loaded from backend." /></div></>; }
