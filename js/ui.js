const UI = (function() {
  const loginView = document.getElementById('loginView');
  const registerView = document.getElementById('registerView');
  const welcomeView = document.getElementById('welcomeView');

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  const loginCodigo = document.getElementById('loginCodigo');
  const loginClave = document.getElementById('loginClave');
  const loginMessage = document.getElementById('loginMessage');

  const registerCodigo = document.getElementById('registerCodigo');
  const registerClave = document.getElementById('registerClave');
  const registerConfirmar = document.getElementById('registerConfirmar');
  const registerMessage = document.getElementById('registerMessage');

  const welcomeUser = document.getElementById('welcomeUser');

  const showRegisterBtn = document.getElementById('showRegisterBtn');
  const showLoginBtn = document.getElementById('showLoginBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  function showView(view) {
    [loginView, registerView, welcomeView].forEach(el => el.classList.add('hidden'));
    view.classList.remove('hidden');
    loginMessage.textContent = '';
    registerMessage.textContent = '';
  }

  function updateUIForSession() {
    const session = Auth.getSession();
    if (session) {
      const user = Auth.findUser(session.codigo);
      if (user) {
        welcomeUser.textContent = `Hola, ${session.codigo}`;
        showView(welcomeView);
        return;
      } else {
        Auth.clearSession();
      }
    }
    showView(loginView);
  }

  function init() {
    Auth.initDemoUsers();

    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const codigo = loginCodigo.value.trim();
      const clave = loginClave.value.trim();

      if (!codigo || !clave) {
        loginMessage.textContent = 'Por favor, completa todos los campos.';
        loginMessage.className = 'text-sm font-medium text-center min-h-[1.5rem] text-error';
        return;
      }

      if (Auth.authenticate(codigo, clave)) {
        loginMessage.textContent = '';
        updateUIForSession();
      } else {
        loginMessage.textContent = 'Código o clave incorrectos.';
        loginMessage.className = 'text-sm font-medium text-center min-h-[1.5rem] text-error';
      }
    });

    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const codigo = registerCodigo.value.trim();
      const clave = registerClave.value.trim();
      const confirmar = registerConfirmar.value.trim();

      if (!codigo || !clave || !confirmar) {
        registerMessage.textContent = 'Todos los campos son obligatorios.';
        registerMessage.className = 'text-sm font-medium text-center min-h-[1.5rem] text-error';
        return;
      }

      if (clave.length < 6) {
        registerMessage.textContent = 'La clave debe tener al menos 6 caracteres.';
        registerMessage.className = 'text-sm font-medium text-center min-h-[1.5rem] text-error';
        return;
      }

      if (clave !== confirmar) {
        registerMessage.textContent = 'Las claves no coinciden.';
        registerMessage.className = 'text-sm font-medium text-center min-h-[1.5rem] text-error';
        return;
      }

      const result = Auth.registerUser(codigo, clave);
      if (result.success) {
        registerMessage.textContent = result.message;
        registerMessage.className = 'text-sm font-medium text-center min-h-[1.5rem] text-green-600';
        registerCodigo.value = '';
        registerClave.value = '';
        registerConfirmar.value = '';
        setTimeout(() => {
          showView(loginView);
          loginCodigo.value = codigo;
          loginClave.value = '';
          loginMessage.textContent = 'Cuenta creada. Ahora inicia sesión.';
          loginMessage.className = 'text-sm font-medium text-center min-h-[1.5rem] text-green-600';
        }, 1500);
      } else {
        registerMessage.textContent = result.message;
        registerMessage.className = 'text-sm font-medium text-center min-h-[1.5rem] text-error';
      }
    });

    showRegisterBtn.addEventListener('click', function() {
      showView(registerView);
      registerCodigo.value = '';
      registerClave.value = '';
      registerConfirmar.value = '';
      registerMessage.textContent = '';
    });

    showLoginBtn.addEventListener('click', function() {
      showView(loginView);
      loginCodigo.value = '';
      loginClave.value = '';
      loginMessage.textContent = '';
    });

    logoutBtn.addEventListener('click', function() {
      Auth.clearSession();
      updateUIForSession();
      loginCodigo.value = '';
      loginClave.value = '';
      loginMessage.textContent = '';
    });

    updateUIForSession();
  }

  return {
    init
  };
})();
