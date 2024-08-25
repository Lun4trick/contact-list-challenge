export async function deleteImage(name: string) {
  try {
    const res = await fetch(`${process.env.LOCAL_URL}/api/imgs/${name}`, {method: 'DELETE'})
    if (!res.ok) {
      throw new Error('Failed to delete image')
    }
    
  } catch (error) {
    console.error('Error deleting image:', error)
    throw new Error('Error deleting image')
  }
}