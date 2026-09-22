import { Link } from 'react-router'
import { PanelIcon } from '../components/PanelIcons'

export default function Placeholder({ icon, title, description, planned = [] }) {
  return (
    <div className="mx-auto max-w-2xl rounded-card border border-dashed border-line bg-white p-8 text-center sm:p-12">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-cream text-navy">
        <PanelIcon name={icon} className="size-7" />
      </span>
      <h2 className="mt-5 font-display text-3xl font-medium tracking-tight">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-muted">{description}</p>

      {planned.length > 0 && (
        <ul className="mx-auto mt-6 grid max-w-md gap-2 text-left text-sm">
          {planned.map(item => (
            <li key={item} className="flex items-start gap-2 rounded-xl bg-cream px-3 py-2">
              <PanelIcon name="check" className="mt-0.5 size-4 shrink-0 text-rating" />
              {item}
            </li>
          ))}
        </ul>
      )}

      <Link to="/panel" className="btn btn-outline btn-sm mt-8">
        Back to dashboard
      </Link>
    </div>
  )
}
