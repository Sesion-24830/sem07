// js/auth.js
const Auth = (function() {
  const STORAGE_KEY = 'utp_users';
  const SESSION_KEY = 'utp_session';

  // Obtener todos los usuarios
  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  // Guardar lista de usuarios
  function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  // Buscar un usuario por código
  function findUser(codigo) {
    const users = getUsers();
    return users.find(u => u.codigo.toLowerCase() === codigo.toLowerCase());
  }

  // Obtener sesión actual
  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
    } catch {
      return null;
    }
  }

  // Establecer sesión
  function setSession(codigo) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ codigo, timestamp: Date.now() }));
  }

  // Cerrar sesión
  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  // Autenticar usuario
  function authenticate(codigo, clave) {
    const user = findUser(codigo);
    if (user && user.clave === clave) {
      setSession(codigo);
      return true;
    }
    return false;
  }

  // Registrar nuevo usuario
  function registerUser(codigo, clave) {
    const users = getUsers();
    if (users.some(u => u.codigo.toLowerCase() === codigo.toLowerCase())) {
      return { success: false, message: 'El código de estudiante ya está registrado.' };
    }
    users.push({ codigo: codigo.trim(), clave });
    saveUsers(users);
    return { success: true, message: 'Cuenta creada exitosamente.' };
  }

  // Inicializar con usuarios de ejemplo (si no hay datos)
  function initDemoUsers() {
    if (getUsers().length === 0) {
      saveUsers([
        { codigo: 'U202312345', clave: 'utp2024' },
        { codigo: 'U202398765', clave: '123456' },
      ]);
    }
  }

  // Exponer API pública
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
