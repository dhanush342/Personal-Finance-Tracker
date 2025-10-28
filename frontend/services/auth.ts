const API_BASE = import.meta.env.VITE_API_URL || '/api';

export type User = { _id: string; name: string; email: string };

async function parseResponse(res: Response) {
  const contentType = res.headers.get('Content-Type') || '';
  if (contentType.includes('application/json')) {
    try {
      return await res.json();
    } catch {
      // Empty or invalid JSON body
      return null;
    }
  }
  const text = await res.text();
  return text || null;
}

async function request(url: string, init?: RequestInit) {
  try {
    const res = await fetch(url, init);
    const data = await parseResponse(res);
    if (!res.ok) {
      const message = (data && (data.error || data.message)) || 'Request failed';
      throw new Error(message);
    }
    return data;
  } catch (err: any) {
    // Network errors or aborted connections
    const msg = err?.message || String(err) || 'Network error';
    throw new Error(msg.startsWith('Failed to fetch') ? 'Network error: unable to reach API' : msg);
  }
}

export const login = async (email: string, password: string) => {
  return request(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}

export const register = async (name: string, email: string, password: string) => {
  return request(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
}

export const getProfile = async (token: string) => {
  return request(`${API_BASE}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export default { login, register, getProfile };
