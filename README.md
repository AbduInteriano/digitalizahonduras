# Digitaliza Honduras - Sitio Web Profesional

Un sitio web moderno, responsivo y profesional para Digitaliza Honduras, especializada en creación de sitios web para negocios.

## 🚀 Características

- **Diseño Moderno e Interactivo**: Interfaz sofisticada con nueva paleta de colores (navy blue #19284c, beige #e6d7b3)
- **Completamente Responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- **Navegación Suave**: Scroll suave entre secciones
- **Formulario de Contacto Funcional**: Con validación y notificaciones
- **Portafolio Interactivo**: Muestra proyectos con previews y enlaces
- **Servicios Especializados**: Páginas dedicadas para cada servicio con información detallada
- **Botón WhatsApp Flotante**: Chat interactivo con opciones predefinidas
- **Navegación Mejorada**: Menú hamburguesa con dropdown para servicios
- **Animaciones Suaves**: Efectos de hover y transiciones elegantes
- **SEO Optimizado**: Meta tags y estructura semántica

## 📁 Estructura del Proyecto

```
SitioWebDigitalizaHonduras/
├── index.html                              # Página principal
├── styles.css                              # Estilos CSS
├── script.js                               # Funcionalidad JavaScript
├── servicios/
│   ├── sitios-web.html                     # Página de servicios de sitios web
│   └── soluciones-tecnologicas.html        # Página de soluciones tecnológicas
└── README.md                               # Documentación
```

## 🛠️ Instalación y Uso

### Opción 1: Abrir Directamente
1. Descarga todos los archivos en una carpeta
2. Abre `index.html` en tu navegador web
3. ¡Listo! El sitio web está funcionando

### Opción 2: Servidor Local (Recomendado)
1. Instala un servidor local como [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en VS Code
2. Abre la carpeta del proyecto en VS Code
3. Haz clic derecho en `index.html` y selecciona "Open with Live Server"

## 🎨 Personalización

### Cambiar Información de Contacto
Edita el archivo `index.html` en la sección de contacto:

```html
<!-- Línea 189-220 -->
<div class="contact-item">
    <div class="contact-icon">
        <i class="fas fa-phone"></i>
    </div>
    <div class="contact-details">
        <h4>Teléfono</h4>
        <p>+504 9999-9999</p> <!-- Cambia aquí tu número -->
    </div>
</div>
```

### Actualizar Portafolio
Reemplaza las imágenes placeholder y enlaces en la sección de portafolio:

```html
<!-- Línea 108-140 -->
<div class="portfolio-item">
    <div class="portfolio-preview">
        <img src="ruta-a-tu-imagen.jpg" alt="Nombre del Proyecto">
        <div class="portfolio-overlay">
            <a href="https://tu-sitio-web.com" class="portfolio-link" target="_blank">
                <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    </div>
    <div class="portfolio-info">
        <h3>Nombre del Proyecto</h3>
        <p>Descripción del proyecto</p>
        <a href="https://tu-sitio-web.com" class="portfolio-url" target="_blank">www.tu-sitio-web.com</a>
    </div>
</div>
```

### Modificar Colores
Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-blue: #1e40af;    /* Azul principal */
    --secondary-blue: #3b82f6;  /* Azul secundario */
    --light-blue: #dbeafe;      /* Azul claro */
    --dark-blue: #1e3a8a;       /* Azul oscuro */
    --accent-blue: #60a5fa;     /* Azul de acento */
}
```

### Configurar WhatsApp
Edita el número de WhatsApp en `script.js`:

```javascript
// Línea 158
function openWhatsApp() {
    const phone = '+50499999999'; // Cambia por tu número real
    const message = 'Hola, me interesa conocer más sobre sus servicios de creación de sitios web.';
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}
```

## 📱 Secciones del Sitio

### 1. **Navegación**
- Logo de la empresa
- Menú de navegación responsivo
- Menú hamburguesa para móviles

### 2. **Hero Section**
- Título principal impactante
- Descripción de servicios
- Botones de llamada a la acción

### 3. **Servicios**
- **Creación de Sitios Web** (Destacado) - [Ver página dedicada](servicios/sitios-web.html)
- **Soluciones Tecnológicas** - [Ver página dedicada](servicios/soluciones-tecnologicas.html)
- Enfoque especializado en PYMES

### 4. **Portafolio**
- Grid de proyectos con previews
- Enlaces directos a sitios web
- Descripción de cada proyecto

### 5. **Contacto**
- Información de contacto
- Formulario funcional
- Integración con WhatsApp

### 6. **Footer**
- Enlaces rápidos
- Redes sociales
- Información legal

## 🔧 Funcionalidades JavaScript

- **Navegación Móvil**: Menú hamburguesa funcional
- **Scroll Suave**: Navegación entre secciones
- **Formulario de Contacto**: Validación y envío
- **Notificaciones**: Sistema de alertas
- **Animaciones**: Efectos de entrada y hover
- **Responsive**: Adaptación automática a dispositivos

## 📊 Optimización

### SEO
- Meta tags optimizados
- Estructura semántica HTML5
- Títulos descriptivos
- Alt text en imágenes

### Rendimiento
- CSS optimizado
- JavaScript modular
- Imágenes optimizadas
- Carga rápida

### Accesibilidad
- Navegación por teclado
- Contraste adecuado
- Textos alternativos
- Estructura semántica

## 🌐 Despliegue

### Opciones de Hosting
1. **Netlify**: Arrastra y suelta la carpeta
2. **Vercel**: Conecta tu repositorio Git
3. **GitHub Pages**: Sube a un repositorio público
4. **Hosting Tradicional**: Sube archivos via FTP

### Dominio Personalizado
1. Compra un dominio (ej: digitalizahonduras.com)
2. Configura DNS en tu proveedor de hosting
3. Actualiza enlaces en el código si es necesario

## 📞 Soporte

Para personalizaciones adicionales o soporte técnico:
- Email: info@digitalizahonduras.com
- WhatsApp: +504 9999-9999

## 📄 Licencia

Este proyecto está diseñado específicamente para Digitaliza Honduras. Todos los derechos reservados.

---

**Digitaliza Honduras** - Transformando negocios digitalmente desde Honduras 🇭🇳 