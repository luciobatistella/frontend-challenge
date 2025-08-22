type DateFormatOptions = { locale?: string; timeZone?: string }

export const formatDate = (dateString: string, opts: DateFormatOptions = {}): string => {
  try {
    const { locale = 'en-US', timeZone } = opts
    const d = new Date(dateString)
    const formatter = new Intl.DateTimeFormat(locale, {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false, timeZone
    })
    const parts = formatter.formatToParts(d)
    const get = (type: Intl.DateTimeFormatPartTypes) => parts.find(p => p.type === type)?.value || ''
    const yyyy = get('year')
    const mm = get('month')
    const dd = get('day')
    const hh = get('hour')
    const mi = get('minute')
    const ss = get('second')
    return `${yyyy}-${mm}-${dd} at ${hh}:${mi}:${ss}`
  } catch {
    return String(dateString)
  }
}

export const formatCurrency = (amount: number, currency: string, opts: { locale?: string } = {}): string => {
  try {
    const { locale = 'en-US' } = opts
    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency || 'USD' }).format(amount)
  } catch {
    return `${currency || 'USD'} ${amount}`
  }
}

