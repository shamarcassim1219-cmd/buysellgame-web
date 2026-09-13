const BASE_URL = 'https://api.finbassshamar.online';

function getToken() {
  return localStorage.getItem('token');
}

function setToken(token) {
  localStorage.setItem('token', token);
}

function clearToken() {
  localStorage.removeItem('token');
}

async function headers(withAuth = true) {
  const h = { 'Content-Type': 'application/json' };
  if (withAuth) {
    const token = getToken();
    if (token) h['Authorization'] = `Bearer ${token}`;
  }
  return h;
}

async function handle(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
}

export const api = {
  getToken,
  setToken,
  clearToken,

  // ---------- AUTH ----------
  async register(email, password, displayName) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: await headers(false),
      body: JSON.stringify({ email, password, displayName }),
    });
    return handle(res);
  },

  async login(email, password) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: await headers(false),
      body: JSON.stringify({ email, password }),
    });
    return handle(res);
  },

  async verifyRegistration(email, code, referralCode) {
    const res = await fetch(`${BASE_URL}/auth/verify-registration`, {
      method: 'POST',
      headers: await headers(false),
      body: JSON.stringify({ email, code, referralCode }),
    });
    const data = await handle(res);
    if (data.token) setToken(data.token);
    return data;
  },

  async verifyLogin(email, code) {
    const res = await fetch(`${BASE_URL}/auth/verify-login`, {
      method: 'POST',
      headers: await headers(false),
      body: JSON.stringify({ email, code }),
    });
    const data = await handle(res);
    if (data.token) setToken(data.token);
    return data;
  },

  async forgotPassword(email) {
    const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: await headers(false),
      body: JSON.stringify({ email }),
    });
    return handle(res);
  },

  async resetPassword(email, code, newPassword) {
    const res = await fetch(`${BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: await headers(false),
      body: JSON.stringify({ email, code, newPassword }),
    });
    return handle(res);
  },

  async googleSignIn(idToken) {
    const res = await fetch(`${BASE_URL}/auth/google`, {
      method: 'POST',
      headers: await headers(false),
      body: JSON.stringify({ idToken }),
    });
    const data = await handle(res);
    if (data.token) setToken(data.token);
    return data;
  },

  // ---------- PROFILE ----------
  async getProfile() {
    const res = await fetch(`${BASE_URL}/user/me`, { headers: await headers() });
    return handle(res);
  },

  // ---------- WALLET ----------
  async getWalletBalance() {
    const res = await fetch(`${BASE_URL}/wallet/balance`, { headers: await headers() });
    return handle(res);
  },

  async getWalletTransactions() {
    const res = await fetch(`${BASE_URL}/wallet/transactions`, { headers: await headers() });
    return handle(res);
  },

  async getAdminBankDetails() {
    const res = await fetch(`${BASE_URL}/wallet/admin-bank-details`, { headers: await headers() });
    return handle(res);
  },

  async requestTopUp(amount, slipUrl, referenceNumber) {
    const res = await fetch(`${BASE_URL}/wallet/topup`, {
      method: 'POST',
      headers: await headers(),
      body: JSON.stringify({ amount, slipUrl, referenceNumber }),
    });
    return handle(res);
  },

  async requestWithdrawal(amount) {
    const res = await fetch(`${BASE_URL}/wallet/withdraw`, {
      method: 'POST',
      headers: await headers(),
      body: JSON.stringify({ amount }),
    });
    return handle(res);
  },

  // ---------- SUPPORT CHAT ----------
  async getActiveChatTicket() {
    const res = await fetch(`${BASE_URL}/user/support-chat/active`, { headers: await headers() });
    const data = await handle(res);
    return data.ticket;
  },

  async startLiveChat(message) {
    const res = await fetch(`${BASE_URL}/user/support-chat/start`, {
      method: 'POST',
      headers: await headers(),
      body: JSON.stringify({ message }),
    });
    return handle(res);
  },

  async getLiveChatMessages(ticketId) {
    const res = await fetch(`${BASE_URL}/user/support-chat/${ticketId}/messages`, { headers: await headers() });
    return handle(res);
  },

  async sendLiveChatMessage(ticketId, content) {
    const res = await fetch(`${BASE_URL}/user/support-chat/${ticketId}/reply`, {
      method: 'POST',
      headers: await headers(),
      body: JSON.stringify({ content }),
    });
    return handle(res);
  },
};
