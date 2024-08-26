export function formatToPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{0,2})(\d{1,2})?(\d{2,3})?(\d{4})??$/)

  if (match) {
    return `+${[match[1], match[2], match[3], match[4]].filter(Boolean).join(' ')}`
  }

  return phoneNumber;
}