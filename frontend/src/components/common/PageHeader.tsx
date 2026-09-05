export default function PageHeader({ title, subtitle = "" }) {
  return <div className="page-header"><div><h1 className="page-title">{title}</h1><p className="page-subtitle">{subtitle}</p></div></div>;
}
