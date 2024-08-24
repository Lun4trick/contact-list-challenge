export async function fetchContacts() {
  const res = await fetch('/api/contacts', {method: 'GET'})
  if (!res.ok) {
    throw new Error('Failed to fetch contacts')
  }

  return res.json()
}