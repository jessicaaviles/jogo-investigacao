export const API_URL = 'http://localhost:3001/api';

export const registerAnonymousUser = async (displayName?: string) => {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ displayName })
  });
  return res.json();
};

export const createRoom = async (hostUserId: string) => {
  const res = await fetch(`${API_URL}/rooms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hostUserId })
  });
  return res.json();
};

export const joinRoom = async (publicCode: string, userId: string, displayName: string) => {
  const res = await fetch(`${API_URL}/rooms/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ publicCode, userId, displayName })
  });
  return res.json();
};
