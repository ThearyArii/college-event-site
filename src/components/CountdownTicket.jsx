import { useEffect, useState } from 'react'

// Set your fest's start date/time here
export const EVENT_DATE = new Date('2026-11-14T09:00:00')

function getTimeLeft() {
  const diff = Math.max(0, EVENT_DATE.getTime() - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    mins: Math.floor((diff / 60000) % 60),
    secs: Math.floor((diff / 1000) % 60),
  }
}

function Digit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 sm:w-20 h-16 sm:h-20 bg-ink text-paper rounded-lg flex items-center justify-center font-display text-2xl sm:text-3xl shadow-[4px_4px_0_#F5A623]">
        {String(value).padStart(2, '0')}
      </div>
      <span className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink/70">
        {label}
      </span>
    </div>
  )
}

export default function CountdownTicket() {
  const [t, setT] = useState(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="inline-flex items-center gap-3 sm:gap-4 bg-paper border-2 border-ink rounded-2xl px-5 sm:px-7 py-6 stub-notch relative">
      <Digit value={t.days} label="Days" />
      <span className="font-display text-2xl text-ink/30 pb-6">:</span>
      <Digit value={t.hours} label="Hrs" />
      <span className="font-display text-2xl text-ink/30 pb-6">:</span>
      <Digit value={t.mins} label="Min" />
      <span className="font-display text-2xl text-ink/30 pb-6">:</span>
      <Digit value={t.secs} label="Sec" />
    </div>
  )
}
