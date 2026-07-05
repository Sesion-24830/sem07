const Auth = (function() {
  const STORAGE_KEY = 'utp_users';
  const SESSION_KEY = 'utp_session';

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  function findUser(codigo) {
    const users = getUsers();
    return users.find(u => u.codigo.toLowerCase() === codigo.toLowerCase());
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
    } catch {
      return null;
    }
  }

  function setSession(codigo) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ codigo, timestamp: Date.now() }));
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  function authenticate(codigo, clave) {
    const user = findUser(codigo);
    if (user && user.clave === clave) {
      setSession(codigo);
      return true;
    }
    return false;
  }

  function registerUser(codigo, clave) {
    const users = getUsers();
    if (users.some(u => u.codigo.toLowerCase() === codigo.toLowerCase())) {
      return { success: false, message: 'El código de estudiante ya está registrado.' };
    }
    users.push({ codigo: codigo.trim(), clave });
    saveUsers(users);
    return { success: true, message: 'Cuenta creada exitosamente.' };
  }

  function initDemoUsers() {
    if (getUsers().length === 0) {
      saveUsers([
        { codigo: 'U202312345', clave: 'utp2024' },
        { codigo: 'U202398765', clave: '123456' },
      ]);
    }
  }

  return {
    getUsers,
    saveUsers,
    findUser,
    getSession,
    setSession,
    clearSession,
    authenticate,
    registerUser,
    initDemoUsers
  };
})();
