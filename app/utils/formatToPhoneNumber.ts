export function formatToPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, ''); // Remove all non-digit characters
  const match = cleaned.match(/^(\d{2})(\d{2})?(\d{3})?(\d{2})?(\d{2})?$/);

  if (match) {
    return `+${[match[1], match[2], match[3], match[4], match[5]].filter(Boolean).join(' ')}`;
  }

  return phoneNumber;
}