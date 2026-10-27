export function generateICS({
  title,
  description,
  location,
  startDate,
  endDate,
  url
}: {
  title: string;
  description: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  url?: string;
}): string {
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const cleanText = (str: string) => {
    return str.replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  };

  const now = formatDate(new Date());
  const dtStart = formatDate(new Date(startDate));
  const dtEnd = formatDate(new Date(endDate));

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Itihasa Heritage Portal//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:itihasa-event-${Date.now()}@itihasa.org`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${cleanText(title)}`,
    `DESCRIPTION:${cleanText(description)}`,
    location ? `LOCATION:${cleanText(location)}` : '',
    url ? `URL:${url}` : '',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(Boolean).join('\r\n');
}
