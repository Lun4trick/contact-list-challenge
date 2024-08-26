const fetchImage = async (name?: string) => {
  const res = await fetch(`/api/imgs/${name || ''}`, {method: 'GET', next: {revalidate: 1}})
  if (!res.ok) {
    throw new Error('Failed to fetch image')
  }

  return res.text()
}

export default fetchImage