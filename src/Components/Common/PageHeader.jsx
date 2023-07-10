import "./PageHeader.css"

export default function PageHeader({ title, icon }) {
  return (
    <div className="page-header">
      <h2>{icon} {title}</h2>
      <hr />
    </div>
  )
}
