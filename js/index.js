// Variables globales
let selectedElement = null;
let canvas = document.getElementById('canvas');
let dropZone = document.getElementById('dropZone');
let draggedElement = null;
let history = [];
let historyStep = -1;
let elementCounter = 0;

// Plantillas predefinidas
const templates = {
    landing: `
        <div class="canvas-element container" data-element-type="container" data-element-id="container_1">
            <div class="element-controls">
                <button class="control-btn" onclick="editElement(this)" title="Editar">✏️</button>
                <button class="control-btn" onclick="duplicateElement(this)" title="Duplicar">📋</button>
                <button class="control-btn" onclick="deleteElement(this)" title="Eliminar">🗑️</button>
            </div>
            <header style="background: #2c3e50; color: white; padding: 20px; text-align: center;">
                <h1>Mi Sitio Web</h1>
                <nav style="margin-top: 20px;">
                    <a href="#inicio" style="color: white; margin: 0 15px; text-decoration: none;">Inicio</a>
                    <a href="#servicios" style="color: white; margin: 0 15px; text-decoration: none;">Servicios</a>
                    <a href="#contacto" style="color: white; margin: 0 15px; text-decoration: none;">Contacto</a>
                </nav>
            </header>
            <div class="nested-elements">
                <section style="padding: 60px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                    <h2 style="font-size: 3rem; margin-bottom: 20px;">Bienvenido a Nuestro Sitio</h2>
                    <p style="font-size: 1.2rem; margin-bottom: 30px;">Creamos soluciones web increíbles para tu negocio</p>
                    <button style="background: #e74c3c; color: white; padding: 15px 30px; border: none; border-radius: 5px; font-size: 1.1rem; cursor: pointer;">Comenzar Ahora</button>
                </section>
                <section style="padding: 60px 20px; background: #f8f9fa;">
                    <h2 style="text-align: center; margin-bottom: 40px; color: #2c3e50;">Nuestros Servicios</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; max-width: 1200px; margin: 0 auto;">
                        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center;">
                            <h3 style="color: #3498db; margin-bottom: 15px;">Desarrollo Web</h3>
                            <p>Creamos sitios web modernos y responsivos</p>
                        </div>
                        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center;">
                            <h3 style="color: #3498db; margin-bottom: 15px;">Diseño UX/UI</h3>
                            <p>Interfaces atractivas y fáciles de usar</p>
                        </div>
                        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center;">
                            <h3 style="color: #3498db; margin-bottom: 15px;">SEO</h3>
                            <p>Optimización para motores de búsqueda</p>
                        </div>
                    </div>
                </section>
                <footer style="background: #34495e; color: white; padding: 40px 20px; text-align: center;">
                    <p>&copy; 2024 Mi Sitio Web. Todos los derechos reservados.</p>
                    <div style="margin-top: 20px;">
                        <a href="#" style="color: white; margin: 0 10px; text-decoration: none;">Facebook</a>
                        <a href="#" style="color: white; margin: 0 10px; text-decoration: none;">Twitter</a>
                        <a href="#" style="color: white; margin: 0 10px; text-decoration: none;">LinkedIn</a>
                    </div>
                </footer>
            </div>
        </div>
    `,
    blog: `
        <div class="canvas-element container" data-element-type="container" data-element-id="container_2">
            <div class="element-controls">
                <button class="control-btn" onclick="editElement(this)" title="Editar">✏️</button>
                <button class="control-btn" onclick="duplicateElement(this)" title="Duplicar">📋</button>
                <button class="control-btn" onclick="deleteElement(this)" title="Eliminar">🗑️</button>
            </div>
            <div class="nested-elements">
                <header style="background: #2c3e50; color: white; padding: 20px; text-align: center;">
                    <h1>Mi Blog</h1>
                    <nav style="margin-top: 15px;">
                        <a href="#" style="color: white; margin: 0 15px; text-decoration: none;">Inicio</a>
                        <a href="#" style="color: white; margin: 0 15px; text-decoration: none;">Artículos</a>
                        <a href="#" style="color: white; margin: 0 15px; text-decoration: none;">Acerca de</a>
                    </nav>
                </header>
                <div style="display: grid; grid-template-columns: 1fr 300px; gap: 40px; max-width: 1200px; margin: 0 auto; padding: 40px 20px;">
                    <article style="background: white; padding: 40px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <h1 style="color: #2c3e50; margin-bottom: 20px;">Título del Artículo</h1>
                        <p style="color: #7f8c8d; margin-bottom: 30px;">Publicado el 15 de Junio, 2024 por Juan Pérez</p>
                        <img src="https://via.placeholder.com/600x300?text=Imagen+del+Artículo" alt="Imagen del artículo" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 30px;">
                        <p style="line-height: 1.8; margin-bottom: 20px; color: #333;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p style="line-height: 1.8; margin-bottom: 20px; color: #333;">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </article>
                    <aside style="background: #f8f9fa; padding: 30px; border-radius: 10px; height: fit-content;">
                        <h3 style="color: #2c3e50; margin-bottom: 20px;">Artículos Recientes</h3>
                        <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #dee2e6;">
                            <h4 style="color: #3498db; margin-bottom: 10px;">Cómo crear una página web</h4>
                            <p style="color: #7f8c8d; font-size: 14px;">Una guía completa para principiantes</p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    `,
    portfolio: `
        <div class="canvas-element container" data-element-type="container" data-element-id="container_3">
            <div class="element-controls">
                <button class="control-btn" onclick="editElement(this)" title="Editar">✏️</button>
                <button class="control-btn" onclick="duplicateElement(this)" title="Duplicar">📋</button>
                <button class="control-btn" onclick="deleteElement(this)" title="Eliminar">🗑️</button>
            </div>
            <div class="nested-elements">
                <header style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 80px 20px; text-align: center;">
                    <img src="https://via.placeholder.com/150x150?text=Foto" alt="Foto de perfil" style="width: 150px; height: 150px; border-radius: 50%; border: 5px solid white; margin-bottom: 20px;">
                    <h1 style="font-size: 2.5rem; margin-bottom: 10px;">Juan Pérez</h1>
                    <h2 style="font-size: 1.5rem; font-weight: 300; margin-bottom: 20px;">Desarrollador Full Stack</h2>
                    <p style="font-size: 1.1rem; max-width: 600px; margin: 0 auto;">Apasionado por crear experiencias web increíbles</p>
                </header>
                <section style="padding: 60px 20px; background: #f8f9fa;">
                    <h2 style="text-align: center; margin-bottom: 40px; color: #2c3e50;">Mis Proyectos</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; max-width: 1200px; margin: 0 auto;">
                        <div style="background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                            <img src="https://via.placeholder.com/400x250?text=Proyecto+1" alt="Proyecto 1" style="width: 100%; height: 250px; object-fit: cover;">
                            <div style="padding: 25px;">
                                <h3 style="color: #2c3e50; margin-bottom: 15px;">E-commerce Platform</h3>
                                <p style="color: #7f8c8d; margin-bottom: 20px;">Plataforma de comercio electrónico con React y Node.js</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    `,
    contact: `
        <div class="canvas-element container" data-element-type="container" data-element-id="container_4">
            <div class="element-controls">
                <button class="control-btn" onclick="editElement(this)" title="Editar">✏️</button>
                <button class="control-btn" onclick="duplicateElement(this)" title="Duplicar">📋</button>
                <button class="control-btn" onclick="deleteElement(this)" title="Eliminar">🗑️</button>
            </div>
            <div class="nested-elements">
                <header style="background: #2c3e50; color: white; padding: 40px 20px; text-align: center;">
                    <h1>Contacto</h1>
                    <p style="margin-top: 10px; opacity: 0.9;">¿Tienes alguna pregunta? ¡Escríbenos!</p>
                </header>
                <section style="padding: 60px 20px; background: #f8f9fa;">
                    <div style="max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px;">
                        <div>
                            <h2 style="color: #2c3e50; margin-bottom: 30px;">Envíanos un mensaje</h2>
                            <form style="background: white; padding: 40px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                                <input type="text" placeholder="Nombre completo" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 5px; margin-bottom: 20px;">
                                <input type="email" placeholder="Email" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 5px; margin-bottom: 20px;">
                                <textarea placeholder="Mensaje" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 5px; height: 120px; margin-bottom: 20px;"></textarea>
                                <button type="submit" style="background: #3498db; color: white; padding: 15px 30px; border: none; border-radius: 5px; width: 100%;">Enviar Mensaje</button>
                            </form>
                        </div>
                        <div>
                            <h2 style="color: #2c3e50; margin-bottom: 30px;">Información de contacto</h2>
                            <div style="background: white; padding: 40px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                                <p style="margin-bottom: 15px;"><strong>📍 Dirección:</strong> Calle Principal 123</p>
                                <p style="margin-bottom: 15px;"><strong>📞 Teléfono:</strong> +1 (555) 123-4567</p>
                                <p style="margin-bottom: 15px;"><strong>✉️ Email:</strong> contacto@miempresa.com</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    `,
    ecommerce: `
        <div class="canvas-element container" data-element-type="container" data-element-id="container_5">
            <div class="element-controls">
                <button class="control-btn" onclick="editElement(this)" title="Editar">✏️</button>
                <button class="control-btn" onclick="duplicateElement(this)" title="Duplicar">📋</button>
                <button class="control-btn" onclick="deleteElement(this)" title="Eliminar">🗑️</button>
            </div>
            <div class="nested-elements">
                <header style="background: #2c3e50; color: white; padding: 15px 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h1>🛍️ Mi Tienda</h1>
                        <button style="background: #e74c3c; color: white; border: none; padding: 8px 15px; border-radius: 5px;">🛒 Carrito (0)</button>
                    </div>
                </header>
                <section style="padding: 40px 20px; max-width: 1200px; margin: 0 auto;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px;">
                        <div>
                            <img src="https://via.placeholder.com/500x400?text=Producto" alt="Producto" style="width: 100%; border-radius: 10px;">
                        </div>
                        <div>
                            <h1 style="color: #2c3e50; margin-bottom: 15px;">Smartphone Premium</h1>
                            <p style="font-size: 2rem; color: #e74c3c; font-weight: bold; margin-bottom: 20px;">$899.99</p>
                            <p style="color: #7f8c8d; line-height: 1.6; margin-bottom: 30px;">Smartphone de última generación con cámara de 108MP y batería de larga duración.</p>
                            <button style="background: #3498db; color: white; padding: 15px 30px; border: none; border-radius: 8px; width: 100%; font-size: 16px;">🛒 Agregar al Carrito</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    `,
    dashboard: `
        <div class="canvas-element container" data-element-type="container" data-element-id="container_6">
            <div class="element-controls">
                <button class="control-btn" onclick="editElement(this)" title="Editar">✏️</button>
                <button class="control-btn" onclick="duplicateElement(this)" title="Duplicar">📋</button>
                <button class="control-btn" onclick="deleteElement(this)" title="Eliminar">🗑️</button>
            </div>
            <div class="nested-elements">
                <div style="display: flex; min-height: 100vh;">
                    <nav style="width: 250px; background: #2c3e50; color: white; padding: 20px;">
                        <h2 style="margin-bottom: 30px; text-align: center;">📊 Dashboard</h2>
                        <ul style="list-style: none;">
                            <li style="margin-bottom: 10px;"><a href="#" style="color: white; text-decoration: none; display: block; padding: 10px; border-radius: 5px; background: #3498db;">🏠 Inicio</a></li>
                            <li style="margin-bottom: 10px;"><a href="#" style="color: white; text-decoration: none; display: block; padding: 10px;">📈 Estadísticas</a></li>
                            <li style="margin-bottom: 10px;"><a href="#" style="color: white; text-decoration: none; display: block; padding: 10px;">👥 Usuarios</a></li>
                        </ul>
                    </nav>
                    <main style="flex: 1; background: #f8f9fa; padding: 30px;">
                        <h1 style="color: #2c3e50; margin-bottom: 30px;">Panel de Control</h1>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                            <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                                <h3 style="color: #2c3e50;">Usuarios Totales</h3>
                                <p style="font-size: 2rem; color: #3498db; font-weight: bold;">12,847</p>
                            </div>
                            <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                                <h3 style="color: #2c3e50;">Ventas</h3>
                                <p style="font-size: 2rem; color: #27ae60; font-weight: bold;">$45,239</p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    `
};

// Elementos HTML predefinidos con sus propiedades
const elementTemplates = {
    container: {
        tag: 'div',
        content: '<div class="nested-drop-zone">Arrastra elementos aquí</div>',
        style: 'padding: 20px; border: 2px dashed #3498db; border-radius: 8px; min-height: 100px; background: rgba(52, 152, 219, 0.05);',
        properties: ['id', 'class', 'style'],
        isContainer: true
    },
    grid: {
        tag: 'div',
        content: '<div class="nested-drop-zone">Elemento 1</div><div class="nested-drop-zone">Elemento 2</div><div class="nested-drop-zone">Elemento 3</div>',
        style: 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 20px; border: 2px dashed #9b59b6; border-radius: 8px; background: rgba(155, 89, 182, 0.05);',
        properties: ['id', 'class', 'style', 'grid-template-columns', 'gap'],
        isContainer: true
    },
    flexbox: {
        tag: 'div',
        content: '<div class="nested-drop-zone">Flex Item 1</div><div class="nested-drop-zone">Flex Item 2</div>',
        style: 'display: flex; gap: 20px; padding: 20px; border: 2px dashed #e67e22; border-radius: 8px; background: rgba(230, 126, 34, 0.05);',
        properties: ['id', 'class', 'style', 'flex-direction', 'justify-content', 'align-items', 'gap'],
        isContainer: true
    },
    section: {
        tag: 'section',
        content: '<div class="nested-drop-zone">Contenido de la sección</div>',
        style: 'padding: 30px; background: #f9f9f9; border-radius: 8px; border: 2px dashed #27ae60; background: rgba(39, 174, 96, 0.05);',
        properties: ['id', 'class', 'style'],
        isContainer: true
    },
    header: {
        tag: 'header',
        content: '<div class="nested-drop-zone">Contenido del header</div>',
        style: 'padding: 20px; background: #34495e; color: white; border-radius: 8px;',
        properties: ['id', 'class', 'style'],
        isContainer: true
    },
    footer: {
        tag: 'footer',
        content: '<div class="nested-drop-zone">Contenido del footer</div>',
        style: 'padding: 20px; background: #2c3e50; color: white; text-align: center; border-radius: 8px;',
        properties: ['id', 'class', 'style'],
        isContainer: true
    },
    nav: {
        tag: 'nav',
        content: '<a href="#" style="margin-right: 15px;">Inicio</a><a href="#" style="margin-right: 15px;">Acerca de</a><a href="#">Contacto</a>',
        style: 'padding: 15px; background: #3498db; border-radius: 8px;',
        properties: ['id', 'class', 'style']
    },
    aside: {
        tag: 'aside',
        content: '<div class="nested-drop-zone">Contenido lateral</div>',
        style: 'padding: 15px; background: #ecf0f1; border-left: 3px solid #3498db; border-radius: 8px;',
        properties: ['id', 'class', 'style'],
        isContainer: true
    },
    h1: {
        tag: 'h1',
        content: 'Título Principal',
        style: 'color: #2c3e50; margin-bottom: 20px;',
        properties: ['id', 'class', 'style', 'textContent']
    },
    h2: {
        tag: 'h2',
        content: 'Subtítulo',
        style: 'color: #34495e; margin-bottom: 15px;',
        properties: ['id', 'class', 'style', 'textContent']
    },
    h3: {
        tag: 'h3',
        content: 'Encabezado H3',
        style: 'color: #5d6d7e; margin-bottom: 10px;',
        properties: ['id', 'class', 'style', 'textContent']
    },
    p: {
        tag: 'p',
        content: 'Este es un párrafo de texto. Puedes editar este contenido desde las propiedades.',
        style: 'line-height: 1.6; color: #333; margin-bottom: 15px;',
        properties: ['id', 'class', 'style', 'textContent']
    },
    span: {
        tag: 'span',
        content: 'Texto en línea',
        style: 'background: #f1c40f; padding: 2px 6px; border-radius: 3px;',
        properties: ['id', 'class', 'style', 'textContent']
    },
    a: {
        tag: 'a',
        content: 'Enlace de ejemplo',
        style: 'color: #3498db; text-decoration: none;',
        properties: ['id', 'class', 'style', 'href', 'target', 'textContent']
    },
    form: {
        tag: 'form',
        content: '<div class="nested-drop-zone">Arrastra campos de formulario aquí</div>',
        style: 'padding: 20px; border: 1px solid #ddd; border-radius: 8px;',
        properties: ['id', 'class', 'action', 'method', 'style'],
        isContainer: true
    },
    input: {
        tag: 'input',
        content: '',
        style: 'padding: 10px; border: 2px solid #ddd; border-radius: 5px; width: 100%; margin-bottom: 15px;',
        properties: ['id', 'name', 'type', 'placeholder', 'value', 'class', 'style', 'required']
    },
    textarea: {
        tag: 'textarea',
        content: 'Área de texto...',
        style: 'padding: 10px; border: 2px solid #ddd; border-radius: 5px; width: 100%; height: 100px; margin-bottom: 15px; resize: vertical;',
        properties: ['id', 'name', 'placeholder', 'class', 'style', 'rows', 'cols']
    },
    button: {
        tag: 'button',
        content: 'Botón',
        style: 'padding: 12px 24px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;',
        properties: ['id', 'class', 'type', 'onclick', 'style', 'textContent']
    },
    select: {
        tag: 'select',
        content: '<option value="1">Opción 1</option><option value="2">Opción 2</option><option value="3">Opción 3</option>',
        style: 'padding: 10px; border: 2px solid #ddd; border-radius: 5px; width: 100%; margin-bottom: 15px;',
        properties: ['id', 'name', 'class', 'style', 'multiple']
    },
    label: {
        tag: 'label',
        content: 'Etiqueta:',
        style: 'font-weight: bold; margin-bottom: 5px; display: block; color: #2c3e50;',
        properties: ['for', 'class', 'style', 'textContent']
    },
    img: {
        tag: 'img',
        content: '',
        style: 'max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);',
        properties: ['src', 'alt', 'width', 'height', 'class', 'style']
    },
    video: {
        tag: 'video',
        content: '',
        style: 'width: 100%; max-width: 500px; border-radius: 8px;',
        properties: ['src', 'controls', 'width', 'height', 'autoplay', 'loop', 'class', 'style']
    },
    audio: {
        tag: 'audio',
        content: '',
        style: 'width: 100%;',
        properties: ['src', 'controls', 'autoplay', 'loop', 'class', 'style']
    },
    canvas: {
        tag: 'canvas',
        content: '',
        style: 'border: 2px solid #ddd; background: #f9f9f9; border-radius: 8px;',
        properties: ['width', 'height', 'class', 'style', 'id']
    }
};

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById('canvas');
    dropZone = document.getElementById('dropZone');
    
    // Event listeners para drag and drop
    document.querySelectorAll('.element-item[draggable="true"]').forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
    });

    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('drop', handleDrop);
    canvas.addEventListener('dragleave', handleDragLeave);

    // Inicializar eventos de contenedores anidados
    initNestedDropZones();
    
    // Event listeners globales
    setupGlobalEventListeners();
    
    // Inicializar historial
    saveToHistory();
    
    console.log('🚀 PageMaker Pro cargado correctamente');
});

// Funciones de Drag and Drop
function handleDragStart(e) {
    draggedElement = e.target.dataset.type;
    e.dataTransfer.effectAllowed = 'copy';
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (e.target === dropZone || e.target === canvas) {
        dropZone.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    if (!canvas.contains(e.relatedTarget)) {
        dropZone.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    
    if (draggedElement && elementTemplates[draggedElement]) {
        createAndAddElement(draggedElement, canvas);
        saveToHistory();
    }
}

function handleNestedDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    e.target.classList.add('drag-over');
}

function handleNestedDragLeave(e) {
    e.target.classList.remove('drag-over');
}

function handleNestedDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove('drag-over');
    
    if (draggedElement && elementTemplates[draggedElement]) {
        createAndAddElement(draggedElement, e.target);
        saveToHistory();
    }
}

function initNestedDropZones() {
    document.querySelectorAll('.nested-drop-zone').forEach(zone => {
        zone.addEventListener('dragover', handleNestedDragOver);
        zone.addEventListener('drop', handleNestedDrop);
        zone.addEventListener('dragleave', handleNestedDragLeave);
    });
}

// Funciones de creación de elementos
function createAndAddElement(elementType, container) {
    const template = elementTemplates[elementType];
    const element = document.createElement(template.tag);
    
    elementCounter++;
    const elementId = `${elementType}_${elementCounter}`;
    
    // Configurar el elemento según su tipo
    setupElement(element, template, elementId);

    // Crear wrapper con controles
    const wrapper = document.createElement('div');
    wrapper.className = template.isContainer ? 'canvas-element container' : 'canvas-element';
    wrapper.dataset.elementType = elementType;
    wrapper.dataset.elementId = elementId;
    
    // Controles del elemento
    const controls = document.createElement('div');
    controls.className = 'element-controls';
    controls.innerHTML = `
        <button class="control-btn" onclick="editElement(this)" title="Editar">✏️</button>
        <button class="control-btn" onclick="duplicateElement(this)" title="Duplicar">📋</button>
        <button class="control-btn" onclick="deleteElement(this)" title="Eliminar">🗑️</button>
    `;

    wrapper.appendChild(element);
    wrapper.appendChild(controls);

    // Agregar al contenedor
    if (container === canvas && dropZone.style.display !== 'none') {
        dropZone.style.display = 'none';
    }
    
    if (container.classList && container.classList.contains('nested-drop-zone')) {
        container.innerHTML = '';
        container.appendChild(wrapper);
        container.classList.remove('nested-drop-zone');
        container.classList.add('nested-elements');
    } else {
        container.appendChild(wrapper);
    }

    // Event listeners
    wrapper.addEventListener('click', selectElement);

    // Inicializar zonas de drop anidadas si es necesario
    if (template.isContainer) {
        initNestedDropZones();
    }

    showToast(`${elementType.charAt(0).toUpperCase() + elementType.slice(1)} agregado correctamente`);
}

function setupElement(element, template, elementId) {
    // Agregar ID único
    element.id = elementId;
    
    // Agregar contenido
    if (template.content) {
        if (['img', 'input', 'video', 'audio', 'canvas'].includes(template.tag)) {
            setupSpecialElements(element, template);
        } else {
            element.innerHTML = template.content;
        }
    }

    // Agregar estilos
    if (template.style) {
        element.style.cssText = template.style;
    }
}

function setupSpecialElements(element, template) {
    switch (template.tag) {
        case 'img':
            element.src = 'https://via.placeholder.com/300x200?text=Imagen+de+Ejemplo';
            element.alt = 'Imagen de ejemplo';
            break;
        case 'input':
            element.type = 'text';
            element.placeholder = 'Escribe aquí...';
            break;
        case 'video':
            element.controls = true;
            element.innerHTML = '<source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">Tu navegador no soporta video HTML5.';
            break;
        case 'audio':
            element.controls = true;
            element.innerHTML = '<source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg">Tu navegador no soporta audio HTML5.';
            break;
        case 'canvas':
            element.width = 400;
            element.height = 200;
            break;
    }
}

// Funciones de selección y edición
function selectElement(e) {
    // Remover selección anterior
    document.querySelectorAll('.canvas-element.selected').forEach(el => {
        el.classList.remove('selected');
    });

    // Seleccionar elemento actual
    const wrapper = e.currentTarget;
    wrapper.classList.add('selected');
    selectedElement = wrapper;

    // Mostrar propiedades
    showElementProperties(wrapper);
    updateElementTree();
    e.stopPropagation();
}

function showElementProperties(wrapper) {
    const elementType = wrapper.dataset.elementType;
    const template = elementTemplates[elementType];
    const element = wrapper.querySelector(template.tag);

    const propertiesContent = document.getElementById('propertiesContent');
    const breadcrumb = document.getElementById('elementBreadcrumb');
    const tree = document.getElementById('elementTree');
    
    // Mostrar breadcrumb
    breadcrumb.style.display = 'block';
    breadcrumb.textContent = `${template.tag.toUpperCase()} #${wrapper.dataset.elementId}`;
    
    // Mostrar árbol de elementos
    tree.style.display = 'block';
    updateElementTree();

    propertiesContent.innerHTML = `
        <div class="element-breadcrumb" id="elementBreadcrumb">${template.tag.toUpperCase()} #${wrapper.dataset.elementId}</div>
        <div class="tree-view" id="elementTree"></div>
        <h4>Propiedades de ${template.tag.toUpperCase()}</h4>
        <div id="propertyFields"></div>
    `;

    const propertyFields = document.getElementById('propertyFields');

    template.properties.forEach(prop => {
        const group = document.createElement('div');
        group.className = 'property-group';

        const label = document.createElement('label');
        label.className = 'property-label';
        label.textContent = prop.charAt(0).toUpperCase() + prop.slice(1).replace(/([A-Z])/g, ' $1');

        let input = createPropertyInput(prop, element, template);
        input.className = 'property-input';
        input.addEventListener('input', () => updateElementProperty(element, prop, input.value));

        group.appendChild(label);
        group.appendChild(input);
        propertyFields.appendChild(group);
    });

    // Agregar propiedades específicas de contenedores
    if (template.isContainer) {
        addContainerProperties(propertyFields, element);
    }

    // Actualizar referencias
    updateElementTree();
}

function createPropertyInput(prop, element, template) {
    let input;
    
    if (prop === 'textContent') {
        input = document.createElement('textarea');
        input.value = element.textContent || '';
    } else if (prop === 'style') {
        input = document.createElement('textarea');
        input.value = element.style.cssText || '';
        input.rows = 4;
    } else if (prop === 'type' && template.tag === 'input') {
        input = document.createElement('select');
        const types = ['text', 'email', 'password', 'number', 'date', 'checkbox', 'radio', 'file', 'hidden', 'submit', 'button'];
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            if (element.type === type) option.selected = true;
            input.appendChild(option);
        });
    } else if (prop === 'target' && template.tag === 'a') {
        input = document.createElement('select');
        const targets = ['', '_blank', '_self', '_parent', '_top'];
        targets.forEach(target => {
            const option = document.createElement('option');
            option.value = target;
            option.textContent = target || 'Sin target';
            if (element.target === target) option.selected = true;
            input.appendChild(option);
        });
    } else if (['grid-template-columns', 'flex-direction', 'justify-content', 'align-items'].includes(prop)) {
        input = createLayoutInput(prop, element);
    } else {
        input = document.createElement('input');
        input.type = 'text';
        input.value = element.getAttribute(prop) || '';
    }
    
    return input;
}

function createLayoutInput(prop, element) {
    const input = document.createElement('select');
    let options = [];
    
    switch (prop) {
        case 'grid-template-columns':
            options = [
                { value: 'repeat(1, 1fr)', text: '1 columna' },
                { value: 'repeat(2, 1fr)', text: '2 columnas' },
                { value: 'repeat(3, 1fr)', text: '3 columnas' },
                { value: 'repeat(4, 1fr)', text: '4 columnas' },
                { value: 'repeat(auto-fit, minmax(250px, 1fr))', text: 'Responsive' }
            ];
            break;
        case 'flex-direction':
            options = [
                { value: 'row', text: 'Horizontal' },
                { value: 'column', text: 'Vertical' },
                { value: 'row-reverse', text: 'Horizontal inverso' },
                { value: 'column-reverse', text: 'Vertical inverso' }
            ];
            break;
        case 'justify-content':
            options = [
                { value: 'flex-start', text: 'Inicio' },
                { value: 'center', text: 'Centro' },
                { value: 'flex-end', text: 'Final' },
                { value: 'space-between', text: 'Espacio entre' },
                { value: 'space-around', text: 'Espacio alrededor' },
                { value: 'space-evenly', text: 'Espacio uniforme' }
            ];
            break;
        case 'align-items':
            options = [
                { value: 'flex-start', text: 'Inicio' },
                { value: 'center', text: 'Centro' },
                { value: 'flex-end', text: 'Final' },
                { value: 'stretch', text: 'Estirar' },
                { value: 'baseline', text: 'Línea base' }
            ];
            break;
    }
    
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.text;
        input.appendChild(opt);
    });
    
    return input;
}

function addContainerProperties(container, element) {
    // Agregar botón para limpiar contenedor
    const clearButton = document.createElement('button');
    clearButton.textContent = '🗑️ Limpiar Contenedor';
    clearButton.className = 'btn-secondary';
    clearButton.style.width = '100%';
    clearButton.style.marginTop = '15px';
    clearButton.onclick = () => clearContainer(element);
    container.appendChild(clearButton);
}

function clearContainer(element) {
    if (confirm('¿Estás seguro de que quieres limpiar este contenedor?')) {
        element.innerHTML = '<div class="nested-drop-zone">Arrastra elementos aquí</div>';
        initNestedDropZones();
        saveToHistory();
        showToast('Contenedor limpiado');
    }
}

function updateElementProperty(element, property, value) {
    if (property === 'textContent') {
        element.textContent = value;
    } else if (property === 'style') {
        element.style.cssText = value;
    } else if (['grid-template-columns', 'flex-direction', 'justify-content', 'align-items', 'gap'].includes(property)) {
        element.style[property] = value;
    } else {
        if (value) {
            element.setAttribute(property, value);
        } else {
            element.removeAttribute(property);
        }
    }
    saveToHistory();
}

function updateElementTree() {
    const tree = document.getElementById('elementTree');
    if (!tree) return;
    
    tree.innerHTML = '<h4 style="margin-bottom: 10px;">🌳 Estructura de Elementos</h4>';
    
    const elements = canvas.querySelectorAll('.canvas-element');
    elements.forEach((element, index) => {
        const elementType = element.dataset.elementType;
        const elementId = element.dataset.elementId;
        const isSelected = element.classList.contains('selected');
        
        const treeItem = document.createElement('div');
        treeItem.className = `tree-item ${isSelected ? 'selected' : ''}`;
        treeItem.textContent = `${elementType.toUpperCase()} #${elementId}`;
        treeItem.onclick = () => {
            selectElement({ currentTarget: element, stopPropagation: () => {} });
        };
        
        tree.appendChild(treeItem);
        
        // Agregar elementos anidados
        const nestedElements = element.querySelectorAll('.canvas-element');
        nestedElements.forEach(nested => {
            const nestedType = nested.dataset.elementType;
            const nestedId = nested.dataset.elementId;
            const nestedItem = document.createElement('div');
            nestedItem.className = 'tree-item tree-indent';
            nestedItem.textContent = `↳ ${nestedType.toUpperCase()} #${nestedId}`;
            nestedItem.onclick = (e) => {
                e.stopPropagation();
                selectElement({ currentTarget: nested, stopPropagation: () => {} });
            };
            tree.appendChild(nestedItem);
        });
    });
}

// Funciones de control de elementos
function editElement(btn) {
    const wrapper = btn.closest('.canvas-element');
    selectElement({ currentTarget: wrapper, stopPropagation: () => {} });
    toggleProperties(true);
}

function duplicateElement(btn) {
    const wrapper = btn.closest('.canvas-element');
    const elementType = wrapper.dataset.elementType;
    const parent = wrapper.parentElement;
    
    if (parent.classList.contains('nested-elements')) {
        createAndAddElement(elementType, parent);
    } else {
        createAndAddElement(elementType, canvas);
    }
    saveToHistory();
}

function deleteElement(btn) {
    const wrapper = btn.closest('.canvas-element');
    const parent = wrapper.parentElement;
    
    wrapper.remove();
    
    // Si el contenedor padre queda vacío, restaurar la zona de drop
    if (parent.classList.contains('nested-elements') && parent.children.length === 0) {
        parent.innerHTML = '<div class="nested-drop-zone">Arrastra elementos aquí</div>';
        parent.classList.remove('nested-elements');
        parent.classList.add('nested-drop-zone');
        initNestedDropZones();
    }
    
    // Mostrar drop zone principal si no hay elementos
    if (canvas.querySelectorAll('.canvas-element').length === 0) {
        dropZone.style.display = 'flex';
    }
    
    saveToHistory();
    showToast('Elemento eliminado');
    
    // Actualizar panel de propiedades
    if (selectedElement === wrapper) {
        selectedElement = null;
        document.getElementById('propertiesContent').innerHTML = '<p>Selecciona un elemento para editar sus propiedades</p>';
    }
}

// Funciones de interfaz
function toggleProperties(forceOpen = false) {
    const panel = document.getElementById('propertiesPanel');
    if (forceOpen || !panel.classList.contains('active')) {
        panel.classList.add('active');
    } else {
        panel.classList.remove('active');
    }
}

function showTemplates() {
    document.getElementById('templatesModal').style.display = 'block';
}

function loadTemplate(templateName) {
    if (templates[templateName]) {
        if (confirm('¿Estás seguro? Esto reemplazará el contenido actual.')) {
            canvas.innerHTML = templates[templateName];
            dropZone = document.getElementById('dropZone');
            if (dropZone) dropZone.style.display = 'none';
            
            // Reinicializar event listeners
            canvas.querySelectorAll('.canvas-element').forEach(wrapper => {
                wrapper.addEventListener('click', selectElement);
            });
            
            initNestedDropZones();
            saveToHistory();
            showToast(`Plantilla ${templateName} cargada correctamente`);
            closeModal('templatesModal');
        }
    }
}

function previewPage() {
    const previewModal = document.getElementById('previewModal');
    const previewFrame = document.getElementById('previewFrame');
    
    const htmlContent = generateHTMLContent();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    previewFrame.src = url;
    previewModal.style.display = 'block';
}

function exportHTML() {
    const exportModal = document.getElementById('exportModal');
    const codePreview = document.getElementById('codePreview');
    
    codePreview.textContent = generateHTMLContent();
    exportModal.style.display = 'block';
}

function generateHTMLContent() {
    const elements = canvas.querySelectorAll('.canvas-element');
    let bodyContent = '';

    elements.forEach(wrapper => {
        const element = wrapper.firstElementChild.cloneNode(true);
        
        // Limpiar elementos anidados de controles y clases de desarrollo
        cleanElementForExport(element);
        
        bodyContent += element.outerHTML + '\n';
    });

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Página Web - Creada con PageMaker</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        
        /* Estilos responsivos */
        @media (max-width: 768px) {
            .container {
                padding: 10px !important;
            }
            
            h1 {
                font-size: 1.8rem !important;
            }
            
            h2 {
                font-size: 1.5rem !important;
            }
            
            .grid {
                grid-template-columns: 1fr !important;
            }
            
            .flex {
                flex-direction: column !important;
            }
        }
        
        /* Estilos para interactividad */
        button:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }
        
        a:hover {
            opacity: 0.8;
        }
        
        img:hover {
            transform: scale(1.02);
            transition: transform 0.3s ease;
        }
    </style>
</head>
<body>
${bodyContent}

<script>
    // Agregar interactividad básica
    document.addEventListener('DOMContentLoaded', function() {
        // Smooth scrolling para enlaces
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Formularios básicos
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('¡Formulario enviado! (Funcionalidad de ejemplo)');
            });
        });
        
        // Botones interactivos
        document.querySelectorAll('button').forEach(button => {
            if (!button.type || button.type !== 'submit') {
                button.addEventListener('click', function() {
                    console.log('Botón clickeado:', this.textContent);
                });
            }
        });
    });
</script>
</body>
</html>`;
}

function cleanElementForExport(element) {
    // Remover zonas de drop y elementos de desarrollo
    element.querySelectorAll('.nested-drop-zone, .element-controls').forEach(el => {
        el.remove();
    });
    
    // Limpiar clases de desarrollo
    element.querySelectorAll('.nested-elements').forEach(el => {
        el.classList.remove('nested-elements');
    });
    
    // Remover atributos de desarrollo
    element.removeAttribute('data-element-type');
    element.removeAttribute('data-element-id');
}

function copyToClipboard() {
    const codePreview = document.getElementById('codePreview');
    navigator.clipboard.writeText(codePreview.textContent).then(() => {
        showToast('Código copiado al portapapeles');
    }).catch(() => {
        // Fallback para navegadores más antiguos
        const textArea = document.createElement('textarea');
        textArea.value = codePreview.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Código copiado al portapapeles');
    });
}

function downloadHTML() {
    const htmlContent = generateHTMLContent();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mi-pagina-web.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Archivo HTML descargado');
}

function clearCanvas() {
    if (confirm('¿Estás seguro de que quieres limpiar el canvas?')) {
        canvas.innerHTML = '<div class="drop-zone" id="dropZone">✨ Arrastra elementos aquí para comenzar a crear tu página web</div>';
        dropZone = document.getElementById('dropZone');
        canvas.addEventListener('dragover', handleDragOver);
        canvas.addEventListener('drop', handleDrop);
        canvas.addEventListener('dragleave', handleDragLeave);
        selectedElement = null;
        document.getElementById('propertiesContent').innerHTML = '<p>Selecciona un elemento para editar sus propiedades</p>';
        saveToHistory();
        showToast('Canvas limpiado');
    }
}

function saveToHistory() {
    historyStep++;
    if (historyStep < history.length) {
        history.length = historyStep;
    }
    history.push(canvas.innerHTML);
}

function undoAction() {
    if (historyStep > 0) {
        historyStep--;
        canvas.innerHTML = history[historyStep];
        dropZone = document.getElementById('dropZone');
        
        // Reattach event listeners
        canvas.querySelectorAll('.canvas-element').forEach(wrapper => {
            wrapper.addEventListener('click', selectElement);
        });
        
        initNestedDropZones();
        showToast('Acción deshecha');
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Event listeners globales
function setupGlobalEventListeners() {
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.canvas-element') && !e.target.closest('.properties-panel')) {
            document.querySelectorAll('.canvas-element.selected').forEach(el => {
                el.classList.remove('selected');
            });
            selectedElement = null;
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }
        
        // Atajos de teclado
        if (e.ctrlKey && e.key === 'z') {
            e.preventDefault();
            undoAction();
        }
        
        if (e.key === 'Delete' && selectedElement) {
            const deleteBtn = selectedElement.querySelector('.control-btn[title="Eliminar"]');
            if (deleteBtn) deleteBtn.click();
        }
    });

    // Cerrar modales clickeando fuera
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}