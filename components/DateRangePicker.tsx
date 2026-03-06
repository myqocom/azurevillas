'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface DateRangePickerProps {
  value: { from?: Date; to?: Date } | undefined
  onChange: (range: { from?: Date; to?: Date } | undefined) => void
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

function isSameDate(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isBeforeDate(a: Date, b: Date) {
  return a.getTime() < b.getTime()
}

function isBetween(date: Date, from: Date, to: Date) {
  const t = date.getTime()
  return t > from.getTime() && t < to.getTime()
}

function formatDate(d: Date) {
  const day = d.getDate().toString().padStart(2, '0')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`
}

function MonthGrid({
  year,
  month,
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  year: number
  month: number
  selected: { from?: Date; to?: Date } | undefined
  hovered: Date | undefined
  onSelect: (d: Date) => void
  onHover: (d: Date | undefined) => void
}) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let i = 1; i <= daysInMonth; i++) cells.push(i)

  const rangeEnd = selected?.to || (selected?.from && hovered && !selected.to ? hovered : undefined)
  const rangeFrom = selected?.from
  const rangeTo = rangeEnd && rangeFrom && isBeforeDate(rangeEnd, rangeFrom) ? undefined : rangeEnd

  return (
    <div className="drp-month">
      <div className="drp-month__caption">{MONTHS[month]} {year}</div>
      <div className="drp-month__weekdays">
        {DAYS.map(d => <div key={d} className="drp-month__weekday">{d}</div>)}
      </div>
      <div className="drp-month__grid">
        {cells.map((day, i) => {
          if (day === null) return <div key={`e-${i}`} className="drp-day drp-day--empty" />

          const date = new Date(year, month, day)
          date.setHours(0, 0, 0, 0)
          const isPast = date < today
          const isStart = rangeFrom && isSameDate(date, rangeFrom)
          const isEnd = rangeTo && isSameDate(date, rangeTo)
          const inRange = rangeFrom && rangeTo && isBetween(date, rangeFrom, rangeTo)

          const hasRange = rangeFrom && rangeTo && !isSameDate(rangeFrom, rangeTo)

          let cls = 'drp-day'
          if (isPast) cls += ' drp-day--disabled'
          if (isStart) cls += ' drp-day--start'
          if (isEnd) cls += ' drp-day--end'
          if ((isStart || isEnd) && hasRange) cls += ' drp-day--has-range'
          if (inRange) cls += ' drp-day--range'
          if (isSameDate(date, today)) cls += ' drp-day--today'

          return (
            <div
              key={day}
              className={cls}
              onClick={isPast ? undefined : () => onSelect(date)}
              onMouseEnter={isPast ? undefined : () => onHover(date)}
              onMouseLeave={() => onHover(undefined)}
            >
              <span>{day}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })
  const [hovered, setHovered] = useState<Date | undefined>()
  const ref = useRef<HTMLDivElement>(null)

  const close = useCallback(() => { setOpen(false); setHovered(undefined) }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, close])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, close])

  function handleSelect(date: Date) {
    if (!value?.from || (value.from && value.to)) {
      onChange({ from: date, to: undefined })
    } else {
      if (isBeforeDate(date, value.from)) {
        onChange({ from: date, to: undefined })
      } else {
        onChange({ from: value.from, to: date })
        setTimeout(close, 150)
      }
    }
  }

  function nextMonth() {
    setViewDate(v => v.month === 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: v.month + 1 })
  }

  function prevMonth() {
    setViewDate(v => v.month === 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: v.month - 1 })
  }

  const month2 = viewDate.month === 11 ? { year: viewDate.year + 1, month: 0 } : { year: viewDate.year, month: viewDate.month + 1 }

  return (
    <div ref={ref} className="date-range-picker" style={{ position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label className="date-range-picker__label">Check-in</label>
          <button type="button" onClick={() => setOpen(!open)} className="date-range-picker__btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className={value?.from ? 'date-range-picker__value' : 'date-range-picker__placeholder'}>
              {value?.from ? formatDate(value.from) : 'Select date'}
            </span>
          </button>
        </div>
        <div>
          <label className="date-range-picker__label">Check-out</label>
          <button type="button" onClick={() => setOpen(!open)} className="date-range-picker__btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className={value?.to ? 'date-range-picker__value' : 'date-range-picker__placeholder'}>
              {value?.to ? formatDate(value.to) : 'Select date'}
            </span>
          </button>
        </div>
      </div>
      {open && (
        <div className="date-range-picker__dropdown">
          <div className="drp-nav">
            <button type="button" onClick={prevMonth} className="drp-nav__btn" aria-label="Previous month">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button type="button" onClick={nextMonth} className="drp-nav__btn" aria-label="Next month">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
          <div className="drp-months">
            <MonthGrid
              year={viewDate.year}
              month={viewDate.month}
              selected={value}
              hovered={!value?.to ? hovered : undefined}
              onSelect={handleSelect}
              onHover={setHovered}
            />
            <MonthGrid
              year={month2.year}
              month={month2.month}
              selected={value}
              hovered={!value?.to ? hovered : undefined}
              onSelect={handleSelect}
              onHover={setHovered}
            />
          </div>
        </div>
      )}
    </div>
  )
}
