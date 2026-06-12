/* Esquema del formulario visual — TEMPORAL, eliminar con /config */
window.CONTENT_FORM_SECTIONS = [
    {
        title: 'SEO y metadatos',
        description: 'Textos que ven buscadores y redes al compartir el sitio.',
        fields: [
            { path: 'meta.title', label: 'Título de la página', type: 'text' },
            { path: 'meta.description', label: 'Descripción', type: 'textarea' },
            { path: 'meta.ogTitle', label: 'Título Open Graph', type: 'text' },
            { path: 'meta.ogDescription', label: 'Descripción Open Graph', type: 'textarea' },
            { path: 'meta.twitterTitle', label: 'Título Twitter', type: 'text' },
            { path: 'meta.twitterDescription', label: 'Descripción Twitter', type: 'textarea' }
        ]
    },
    {
        title: 'Cabecera y navegación',
        fields: [
            { path: 'header.logoName', label: 'Nombre en el logo', type: 'text' },
            { path: 'header.logoAriaLabel', label: 'Descripción accesible del logo', type: 'text' },
            { path: 'header.taglineWords.0', label: 'Tagline — palabra 1', type: 'text' },
            { path: 'header.taglineWords.1', label: 'Tagline — palabra 2', type: 'text' },
            { path: 'header.taglineWords.2', label: 'Tagline — palabra 3', type: 'text' },
            { path: 'header.nav.inicio', label: 'Menú: Inicio', type: 'text' },
            { path: 'header.nav.servicios', label: 'Menú: Servicios', type: 'text' },
            { path: 'header.nav.experiencias', label: 'Menú: Experiencias', type: 'text' },
            { path: 'header.nav.portafolio', label: 'Menú: Portafolio', type: 'text' },
            { path: 'header.nav.contacto', label: 'Menú: Contacto', type: 'text' },
            { path: 'header.cta', label: 'Botón "Hablemos"', type: 'text' },
            { path: 'header.menuOpenLabel', label: 'Etiqueta abrir menú móvil', type: 'text' },
            { path: 'header.menuCloseLabel', label: 'Etiqueta cerrar menú móvil', type: 'text' }
        ]
    },
    {
        title: 'Hero (inicio)',
        fields: [
            { path: 'hero.taglineLine1', label: 'Línea superior del tagline', type: 'text' },
            { path: 'hero.taglineAccent', label: 'Tagline — texto destacado', type: 'text', accent: true },
            { path: 'hero.titleLine1', label: 'Título — línea 1', type: 'text' },
            { path: 'hero.titleLine2Prefix', label: 'Título — línea 2 (antes del destacado)', type: 'text' },
            { path: 'hero.titleLine2Accent', label: 'Título — palabra destacada', type: 'text', accent: true },
            { path: 'hero.descriptionBefore', label: 'Descripción — texto principal', type: 'textarea' },
            { path: 'hero.descriptionAccent', label: 'Descripción — texto destacado', type: 'text', accent: true },
            { path: 'hero.cta', label: 'Botón principal', type: 'text' },
            { path: 'hero.imageAlt', label: 'Texto alternativo de la foto', type: 'text' },
            { path: 'hero.metricValue', label: 'Métrica — valor', type: 'text' },
            { path: 'hero.metricLabel', label: 'Métrica — etiqueta', type: 'text' },
            { path: 'hero.verticalLabel', label: 'Etiqueta vertical', type: 'text' }
        ]
    },
    {
        title: 'Barra de rendimiento',
        groups: [
            { title: 'Ítem 1', fields: [
                { path: 'performance.items.0.title', label: 'Título', type: 'text' },
                { path: 'performance.items.0.description', label: 'Descripción', type: 'textarea' }
            ]},
            { title: 'Ítem 2', fields: [
                { path: 'performance.items.1.title', label: 'Título', type: 'text' },
                { path: 'performance.items.1.description', label: 'Descripción', type: 'textarea' }
            ]},
            { title: 'Ítem 3', fields: [
                { path: 'performance.items.2.title', label: 'Título', type: 'text' },
                { path: 'performance.items.2.description', label: 'Descripción', type: 'textarea' }
            ]},
            { title: 'Ítem 4', fields: [
                { path: 'performance.items.3.title', label: 'Título', type: 'text' },
                { path: 'performance.items.3.description', label: 'Descripción', type: 'textarea' }
            ]}
        ]
    },
    {
        title: 'Experiencias destacadas',
        fields: [
            { path: 'experience.badge', label: 'Etiqueta superior', type: 'text' },
            { path: 'experience.title', label: 'Título principal', type: 'text' },
            { path: 'experience.titleScript', label: 'Título cursiva', type: 'text' },
            { path: 'experience.copyBefore', label: 'Texto descriptivo — inicio', type: 'textarea' },
            { path: 'experience.copyAccent', label: 'Texto descriptivo — destacado', type: 'text', accent: true },
            { path: 'experience.note', label: 'Nota legal', type: 'textarea' }
        ]
    },
    {
        title: 'Campañas — Coca-Cola',
        fields: [
            { path: 'experience.campaigns.0.name', label: 'Nombre de marca', type: 'text' },
            { path: 'experience.campaigns.0.category', label: 'Categoría', type: 'text' },
            { path: 'experience.campaigns.0.metric', label: 'Métrica', type: 'text' },
            { path: 'experience.campaigns.0.metricLabel', label: 'Etiqueta de métrica', type: 'text' },
            { path: 'experience.campaigns.0.cta', label: 'Texto del botón', type: 'text' },
            { path: 'experience.campaigns.0.ctaAriaLabel', label: 'Descripción accesible del botón', type: 'text' }
        ]
    },
    {
        title: 'Campañas — TOTTO',
        fields: [
            { path: 'experience.campaigns.1.name', label: 'Nombre de marca', type: 'text' },
            { path: 'experience.campaigns.1.category', label: 'Categoría', type: 'text' },
            { path: 'experience.campaigns.1.metric', label: 'Métrica', type: 'text' },
            { path: 'experience.campaigns.1.metricLabel', label: 'Etiqueta de métrica', type: 'text' },
            { path: 'experience.campaigns.1.cta', label: 'Texto del botón', type: 'text' },
            { path: 'experience.campaigns.1.ctaAriaLabel', label: 'Descripción accesible del botón', type: 'text' }
        ]
    },
    {
        title: 'Campañas — Cine Colombia',
        fields: [
            { path: 'experience.campaigns.2.name', label: 'Nombre de marca', type: 'text' },
            { path: 'experience.campaigns.2.category', label: 'Categoría', type: 'text' },
            { path: 'experience.campaigns.2.metric', label: 'Métrica', type: 'text' },
            { path: 'experience.campaigns.2.metricLabel', label: 'Etiqueta de métrica', type: 'text' },
            { path: 'experience.campaigns.2.cta', label: 'Texto del botón', type: 'text' },
            { path: 'experience.campaigns.2.ctaAriaLabel', label: 'Descripción accesible del botón', type: 'text' }
        ]
    },
    {
        title: 'Campañas — H&M',
        fields: [
            { path: 'experience.campaigns.3.name', label: 'Nombre de marca', type: 'text' },
            { path: 'experience.campaigns.3.category', label: 'Categoría', type: 'text' },
            { path: 'experience.campaigns.3.metric', label: 'Métrica', type: 'text' },
            { path: 'experience.campaigns.3.metricLabel', label: 'Etiqueta de métrica', type: 'text' },
            { path: 'experience.campaigns.3.cta', label: 'Texto del botón', type: 'text' },
            { path: 'experience.campaigns.3.ctaAriaLabel', label: 'Descripción accesible del botón', type: 'text' }
        ]
    },
    {
        title: 'Campañas — Starbucks',
        fields: [
            { path: 'experience.campaigns.4.name', label: 'Nombre de marca', type: 'text' },
            { path: 'experience.campaigns.4.category', label: 'Categoría', type: 'text' },
            { path: 'experience.campaigns.4.metric', label: 'Métrica', type: 'text' },
            { path: 'experience.campaigns.4.metricLabel', label: 'Etiqueta de métrica', type: 'text' },
            { path: 'experience.campaigns.4.cta', label: 'Texto del botón', type: 'text' },
            { path: 'experience.campaigns.4.ctaAriaLabel', label: 'Descripción accesible del botón', type: 'text' }
        ]
    },
    {
        title: 'Campañas — MaxGordos',
        fields: [
            { path: 'experience.campaigns.5.name', label: 'Nombre de marca', type: 'text' },
            { path: 'experience.campaigns.5.category', label: 'Categoría', type: 'text' },
            { path: 'experience.campaigns.5.metric', label: 'Métrica', type: 'text' },
            { path: 'experience.campaigns.5.metricLabel', label: 'Etiqueta de métrica', type: 'text' },
            { path: 'experience.campaigns.5.cta', label: 'Texto del botón', type: 'text' },
            { path: 'experience.campaigns.5.ctaAriaLabel', label: 'Descripción accesible del botón', type: 'text' }
        ]
    },
    {
        title: 'Resultados',
        fields: [
            { path: 'experience.results.leadBefore', label: 'Frase principal — inicio', type: 'text' },
            { path: 'experience.results.leadAccent', label: 'Frase principal — destacado', type: 'text', accent: true }
        ],
        groups: [
            { title: 'Estadística TikTok', fields: [
                { path: 'experience.results.stats.0.value', label: 'Valor', type: 'text' },
                { path: 'experience.results.stats.0.label', label: 'Etiqueta', type: 'text' }
            ]},
            { title: 'Estadística Instagram', fields: [
                { path: 'experience.results.stats.1.value', label: 'Valor', type: 'text' },
                { path: 'experience.results.stats.1.label', label: 'Etiqueta', type: 'text' }
            ]},
            { title: 'Estadística interacciones', fields: [
                { path: 'experience.results.stats.2.value', label: 'Valor', type: 'text' },
                { path: 'experience.results.stats.2.label', label: 'Etiqueta', type: 'text' }
            ]}
        ]
    },
    {
        title: 'Servicios',
        fields: [
            { path: 'services.badge', label: 'Etiqueta superior', type: 'text' },
            { path: 'services.titleBefore', label: 'Título — inicio', type: 'text' },
            { path: 'services.titleScript', label: 'Título — cursiva', type: 'text' },
            { path: 'services.subtitleBefore', label: 'Subtítulo — inicio', type: 'text' },
            { path: 'services.subtitleAccent1', label: 'Subtítulo — destacado 1', type: 'text', accent: true },
            { path: 'services.subtitleMiddle', label: 'Subtítulo — conector', type: 'text' },
            { path: 'services.subtitleAccent2', label: 'Subtítulo — destacado 2', type: 'text', accent: true },
            { path: 'services.subtitleAfter', label: 'Subtítulo — cierre', type: 'text' }
        ],
        groups: [
            { title: 'Servicio 1 — Gestión de redes', fields: [
                { path: 'services.cards.0.titleLine1', label: 'Título línea 1', type: 'text' },
                { path: 'services.cards.0.titleScript', label: 'Título cursiva', type: 'text' },
                { path: 'services.cards.0.description', label: 'Descripción', type: 'textarea' }
            ]},
            { title: 'Servicio 2 — Creación de contenido', fields: [
                { path: 'services.cards.1.titleBefore', label: 'Título — inicio', type: 'text' },
                { path: 'services.cards.1.titleScript', label: 'Título cursiva', type: 'text' },
                { path: 'services.cards.1.description', label: 'Descripción', type: 'textarea' }
            ]},
            { title: 'Servicio 3 — Estrategia digital', fields: [
                { path: 'services.cards.2.titleLine1', label: 'Título línea 1', type: 'text' },
                { path: 'services.cards.2.titleScript', label: 'Título cursiva', type: 'text' },
                { path: 'services.cards.2.description', label: 'Descripción', type: 'textarea' }
            ]},
            { title: 'Servicio 4 — Email marketing', fields: [
                { path: 'services.cards.3.titleLine1', label: 'Título línea 1', type: 'text' },
                { path: 'services.cards.3.titleScript', label: 'Título cursiva', type: 'text' },
                { path: 'services.cards.3.description', label: 'Descripción', type: 'textarea' }
            ]},
            { title: 'Servicio 5 — Cobertura de eventos', fields: [
                { path: 'services.cards.4.titleLine1', label: 'Título línea 1', type: 'text' },
                { path: 'services.cards.4.titleScript', label: 'Título cursiva', type: 'text' },
                { path: 'services.cards.4.description', label: 'Descripción', type: 'textarea' }
            ]}
        ]
    },
    {
        title: 'Competencias y herramientas',
        fields: [
            { path: 'skills.badge', label: 'Etiqueta superior', type: 'text' },
            { path: 'skills.title', label: 'Título principal', type: 'text' },
            { path: 'skills.titleScript', label: 'Título cursiva', type: 'text' },
            { path: 'skills.descriptionBefore', label: 'Descripción — inicio', type: 'textarea' },
            { path: 'skills.descriptionAccent', label: 'Descripción — destacado', type: 'text', accent: true }
        ],
        groups: [
            { title: 'Premiere Pro', fields: [
                { path: 'skills.items.0.name', label: 'Nombre', type: 'text' },
                { path: 'skills.items.0.percentage', label: 'Porcentaje', type: 'text' }
            ]},
            { title: 'After Effects', fields: [
                { path: 'skills.items.1.name', label: 'Nombre', type: 'text' },
                { path: 'skills.items.1.percentage', label: 'Porcentaje', type: 'text' }
            ]},
            { title: 'Canva', fields: [
                { path: 'skills.items.2.name', label: 'Nombre', type: 'text' },
                { path: 'skills.items.2.percentage', label: 'Porcentaje', type: 'text' }
            ]},
            { title: 'CapCut', fields: [
                { path: 'skills.items.3.name', label: 'Nombre', type: 'text' },
                { path: 'skills.items.3.percentage', label: 'Porcentaje', type: 'text' }
            ]},
            { title: 'Meta y Google Ads', fields: [
                { path: 'skills.items.4.name', label: 'Nombre', type: 'text' },
                { path: 'skills.items.4.percentage', label: 'Porcentaje', type: 'text' }
            ]},
            { title: 'Inglés', fields: [
                { path: 'skills.items.5.name', label: 'Nombre', type: 'text' },
                { path: 'skills.items.5.percentage', label: 'Porcentaje', type: 'text' }
            ]}
        ]
    },
    {
        title: 'Proceso de trabajo',
        fields: [
            { path: 'process.badge', label: 'Etiqueta superior', type: 'text' },
            { path: 'process.titleBefore', label: 'Título — inicio', type: 'text' },
            { path: 'process.titleScript', label: 'Título — cursiva', type: 'text' },
            { path: 'process.quoteBefore', label: 'Cita — inicio', type: 'text' },
            { path: 'process.quoteAccent', label: 'Cita — palabra destacada', type: 'text', accent: true },
            { path: 'process.quoteAfter', label: 'Cita — cierre', type: 'text' }
        ],
        groups: [
            { title: 'Paso 1 — Descubrir', fields: [
                { path: 'process.steps.0.title', label: 'Título', type: 'text' },
                { path: 'process.steps.0.descriptionBefore', label: 'Descripción — inicio', type: 'textarea' },
                { path: 'process.steps.0.descriptionAccent', label: 'Descripción — destacado', type: 'text', accent: true },
                { path: 'process.steps.0.descriptionAfter', label: 'Descripción — cierre', type: 'text' }
            ]},
            { title: 'Paso 2 — Estrategia', fields: [
                { path: 'process.steps.1.title', label: 'Título', type: 'text' },
                { path: 'process.steps.1.descriptionBefore', label: 'Descripción — inicio', type: 'text' },
                { path: 'process.steps.1.descriptionAccent', label: 'Descripción — destacado', type: 'text', accent: true },
                { path: 'process.steps.1.descriptionAfter', label: 'Descripción — cierre', type: 'text' }
            ]},
            { title: 'Paso 3 — Crear', fields: [
                { path: 'process.steps.2.title', label: 'Título', type: 'text' },
                { path: 'process.steps.2.descriptionBefore', label: 'Descripción — inicio', type: 'text' },
                { path: 'process.steps.2.descriptionAccent', label: 'Descripción — destacado', type: 'text', accent: true },
                { path: 'process.steps.2.descriptionAfter', label: 'Descripción — cierre', type: 'text' }
            ]},
            { title: 'Paso 4 — Medir y optimizar', fields: [
                { path: 'process.steps.3.title', label: 'Título', type: 'text' },
                { path: 'process.steps.3.descriptionBefore', label: 'Descripción — inicio', type: 'text' },
                { path: 'process.steps.3.descriptionAccent', label: 'Descripción — destacado', type: 'text', accent: true },
                { path: 'process.steps.3.descriptionAfter', label: 'Descripción — cierre', type: 'text' }
            ]}
        ]
    },
    {
        title: 'Contacto (sección final)',
        fields: [
            { path: 'contact.titleScript', label: 'Título — línea cursiva', type: 'text' },
            { path: 'contact.titleBefore', label: 'Título — conector', type: 'text' },
            { path: 'contact.titleSerif', label: 'Título — cierre', type: 'text' },
            { path: 'contact.descriptionBefore', label: 'Descripción — inicio', type: 'textarea' },
            { path: 'contact.descriptionAccent', label: 'Descripción — destacado', type: 'text', accent: true },
            { path: 'contact.cta', label: 'Botón Hablemos', type: 'text' },
            { path: 'contact.email', label: 'Correo electrónico', type: 'text' },
            { path: 'contact.phone', label: 'Teléfono', type: 'text' }
        ]
    },
    {
        title: 'Pie de página',
        fields: [
            { path: 'footer.brandName', label: 'Nombre de marca', type: 'text' },
            { path: 'footer.brandTagline', label: 'Tagline', type: 'text' },
            { path: 'footer.brandDescription', label: 'Descripción', type: 'textarea' },
            { path: 'footer.navTitle', label: 'Título columna navegación', type: 'text' },
            { path: 'footer.nav.inicio', label: 'Enlace: Inicio', type: 'text' },
            { path: 'footer.nav.servicios', label: 'Enlace: Servicios', type: 'text' },
            { path: 'footer.nav.experiencias', label: 'Enlace: Experiencias', type: 'text' },
            { path: 'footer.nav.portafolio', label: 'Enlace: Portafolio', type: 'text' },
            { path: 'footer.nav.recursos', label: 'Enlace: Recursos', type: 'text' },
            { path: 'footer.nav.contacto', label: 'Enlace: Contacto', type: 'text' },
            { path: 'footer.socialTitle', label: 'Título columna redes', type: 'text' },
            { path: 'footer.socials.0.name', label: 'Red social: Instagram', type: 'text' },
            { path: 'footer.socials.1.name', label: 'Red social: TikTok', type: 'text' },
            { path: 'footer.socials.2.name', label: 'Red social: LinkedIn', type: 'text' },
            { path: 'footer.missionTitle', label: 'Título misión', type: 'text' },
            { path: 'footer.missionItems.0', label: 'Misión — línea 1', type: 'text' },
            { path: 'footer.missionItems.1', label: 'Misión — línea 2', type: 'text' },
            { path: 'footer.missionItems.2', label: 'Misión — línea 3', type: 'text' },
            { path: 'footer.copyright', label: 'Copyright', type: 'text' },
            { path: 'footer.legal.privacy', label: 'Política de privacidad', type: 'text' },
            { path: 'footer.legal.terms', label: 'Términos y condiciones', type: 'text' },
            { path: 'footer.legal.notice', label: 'Aviso legal', type: 'text' }
        ]
    },
    {
        title: 'Modal de contacto',
        fields: [
            { path: 'modals.contact.titleBefore', label: 'Título — inicio', type: 'text' },
            { path: 'modals.contact.titleAccent', label: 'Título — destacado', type: 'text', accent: true },
            { path: 'modals.contact.introBefore', label: 'Intro — inicio', type: 'text' },
            { path: 'modals.contact.introAccent', label: 'Intro — destacado', type: 'text', accent: true },
            { path: 'modals.contact.introAfter', label: 'Intro — cierre', type: 'text' },
            { path: 'modals.contact.email', label: 'Correo', type: 'text' },
            { path: 'modals.contact.phone', label: 'Teléfono', type: 'text' },
            { path: 'modals.contact.instagram', label: 'Usuario Instagram', type: 'text' },
            { path: 'modals.contact.whatsapp', label: 'Botón WhatsApp', type: 'text' },
            { path: 'modals.contact.closeLabel', label: 'Etiqueta cerrar', type: 'text' }
        ]
    },
    {
        title: 'Modal de portafolio',
        fields: [
            { path: 'modals.portfolio.title', label: 'Título', type: 'text' },
            { path: 'modals.portfolio.download', label: 'Botón descargar PDF', type: 'text' },
            { path: 'modals.portfolio.close', label: 'Texto cerrar', type: 'text' },
            { path: 'modals.portfolio.closeLabel', label: 'Etiqueta cerrar', type: 'text' }
        ]
    }
];
