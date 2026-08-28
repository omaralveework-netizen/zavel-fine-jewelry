import CrownMark from './CrownMark'

export default function Logo({ size = 'md', mono = false }) {
  const sizes = {
    sm: { crown: 'w-6 h-5', word: 'text-base', tag: 'text-[8px] tracking-[0.35em]' },
    md: { crown: 'w-9 h-7', word: 'text-xl', tag: 'text-[9px] tracking-[0.4em]' },
    lg: { crown: 'w-14 h-11', word: 'text-3xl', tag: 'text-[10px] tracking-[0.5em]' },
  }
  const s = sizes[size]

  return (
    <div className="flex flex-col items-center">
      <CrownMark className={s.crown} stroke={mono ? '#F8F5EE' : '#D4AF37'} />
      <span
        className={`font-accent ${s.word} tracking-[0.28em] mt-1 ${
          mono ? 'text-gold-100' : 'text-gold-foil'
        }`}
      >
        ZAVEL
      </span>
      <span className={`font-ui text-gold-500 ${s.tag} mt-0.5`}>FINE JEWELRY</span>
    </div>
  )
}
