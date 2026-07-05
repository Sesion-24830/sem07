# 🎓 UTP - Sistema de Acceso Académico

Sistema de autenticación sencillo para la Universidad Tecnológica del Perú, desarrollado con **HTML, Tailwind CSS y JavaScript puro**. Los datos de usuarios se almacenan en `localStorage`, simulando una base de datos local.

---

## 📋 Características

- Pantalla de **inicio de sesión** con código de estudiante y contraseña.
- **Registro de nuevos usuarios** con validación de campos.
- **Persistencia de sesión** en el navegador (recarga la página y sigues autenticado).
- Vista de **bienvenida** con mensaje personalizado.
- Cierre de sesión.
- Botones de acceso social (Google y GitHub) como placeholder.
- Diseño responsivo y alineado con la identidad visual de la UTP.

---

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3 (Tailwind CSS + estilos propios)
- JavaScript (ES6)
- `localStorage` para persistencia de datos

---

## 📁 Estructura del proyecto
```bash
mi-proyecto/
├── index.html
├── css/
│ └── styles.css
├── js/
│ ├── auth.js # Lógica de autenticación y localStorage
│ └── ui.js # Control de la interfaz de usuario
└── README.md
```

---

## 🚀 Cómo probarlo (local)

Sigue estos pasos para ejecutar el proyecto en tu máquina:

### 1. Clona o descarga el repositorio

```bash
git clone https://github.com/tu-usuario/utp-acceso.git
cd utp-acceso
```

> (Si no usas Git, simplemente descarga el ZIP y extrae los archivos)

### 2. Abre el proyecto en tu editor favorito
Recomendamos Visual Studio Code con la extensión Live Server para una experiencia más rápida.

### 3. Ejecuta el proyecto
## Opción A: Usando Live Server (recomendado)
1. Instala la extensión Live Server en VS Code.
2. Haz clic derecho sobre el archivo index.html y selecciona "Open with Live Server".
3. Se abrirá automáticamente en tu navegador en http://127.0.0.1:5500.

## Opción B: Abrir directamente el archivo
- Haz doble clic sobre index.html para abrirlo en tu navegador.
> Nota: Algunas funciones pueden verse limitadas si usas file://, pero para este proyecto funciona correctamente.

### 4. Prueba con usuarios de ejemplo
El sistema incluye dos cuentas de demostración precargadas:

| Código de estudiante | Contraseña |
|----------------------|------------|
| U202312345           | utp2024    |
| U202398765           | 123456     |

También puedes crear tu propia cuenta usando el botón "¿No tienes cuenta? Regístrate".

---
