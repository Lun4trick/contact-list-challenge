// Checks if email is provided, is it have correct format
export function checkIsEmailFormatCorrect(email: string): boolean {
  const re = /\S+@\S+\.\S+/
  return re.test(email) || email === ''
}