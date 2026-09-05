export default function EmptyState({ message = "No data available." }) { return <div className="empty-state"><i className="bi bi-database" /><span>{message}</span></div>; }
