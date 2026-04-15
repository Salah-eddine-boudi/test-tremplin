const API_URL = 'http://localhost:3001/api';

export async function submitContact(data) {
  const response = await fetch(`${API_URL}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Erreur lors de l\'envoi');
  }

  return result;
}