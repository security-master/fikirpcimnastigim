import { motion } from 'framer-motion'

interface OptionChipProps {
  label: string
  icon?: string
  selected?: boolean
  accent?: string
  onClick: () => void
  disabled?: boolean
  size?: 'sm' | 'md'
}

export function OptionChip({
  label,
  icon,
  selected,
  accent = '#00f5ff',
  onClick,
  disabled,
  size = 'md',
}: OptionChipProps) {
  return (
    <motion.button
      type="button"
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`glass rounded-xl text-left transition-all disabled:opacity-30 ${
        size === 'sm' ? 'px-3 py-2 text-xs' : 'px-3 py-2.5 text-sm'
      }`}
      style={{
        borderWidth: 1,
        borderColor: selected ? accent : 'transparent',
        background: selected ? `${accent}18` : undefined,
        color: selected ? '#fff' : 'rgba(255,255,255,0.7)',
      }}
    >
      <span className="flex items-center gap-2">
        {icon && <span className="text-base leading-none">{icon}</span>}
        <span className="leading-snug">{label}</span>
      </span>
    </motion.button>
  )
}
