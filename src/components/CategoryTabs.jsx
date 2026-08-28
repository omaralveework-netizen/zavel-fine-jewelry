const TABS = ['All', 'Rings', 'Earrings']

export default function CategoryTabs({ active, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {TABS.map((tab) => {
        const isActive = active === tab
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`font-ui text-xs tracking-[0.16em] uppercase px-5 py-2.5 rounded-sm border transition-colors ${
              isActive
                ? 'bg-gold-400 text-emerald-950 border-gold-400'
                : 'border-gold-400/30 text-gold-100/70 hover:border-gold-400 hover:text-gold-300'
            }`}
          >
            {tab}
          </button>
        )
      })}
    </div>
  )
}
