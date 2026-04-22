import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type {
  ProductCategoryValue,
  ProductSortValue,
} from '#/modules/products/model/types'

export type Locale = 'en' | 'es'

const LOCALE_STORAGE_KEY = 'locale'

export const LOCALE_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('${LOCALE_STORAGE_KEY}');var locale=(stored==='en'||stored==='es')?stored:'en';document.documentElement.lang=locale;}catch(e){document.documentElement.lang='en';}})();`

const categoryLabels: Record<Locale, Record<ProductCategoryValue, string>> = {
  en: {
    '': 'All categories',
    'cat-electronics': 'Electronics',
    'cat-office': 'Office',
    'cat-storage': 'Storage',
    'cat-accessories': 'Accessories',
  },
  es: {
    '': 'Todas las categorías',
    'cat-electronics': 'Electrónica',
    'cat-office': 'Oficina',
    'cat-storage': 'Almacenamiento',
    'cat-accessories': 'Accesorios',
  },
}

const sortLabels: Record<Locale, Record<ProductSortValue, string>> = {
  en: {
    'name-asc': 'Name (A-Z)',
    'name-desc': 'Name (Z-A)',
    'price-asc': 'Price (Low-High)',
    'price-desc': 'Price (High-Low)',
    'stock-asc': 'Stock (Low-High)',
    'stock-desc': 'Stock (High-Low)',
  },
  es: {
    'name-asc': 'Nombre (A-Z)',
    'name-desc': 'Nombre (Z-A)',
    'price-asc': 'Precio (Menor-Mayor)',
    'price-desc': 'Precio (Mayor-Menor)',
    'stock-asc': 'Stock (Menor-Mayor)',
    'stock-desc': 'Stock (Mayor-Menor)',
  },
}

const supplierLabels = {
  'sup-tech-hub': 'Tech Hub Distributors',
  'sup-workflow-goods': 'Workflow Goods Co.',
  'sup-storage-house': 'Storage House Supply',
  'sup-studio-retail': 'Studio Retail Partners',
} as const

const messages = {
  en: {
    meta: {
      title: 'TanStack Learning Playground',
    },
    language: {
      label: 'Language',
      english: 'English',
      spanish: 'Spanish',
    },
    theme: {
      dark: 'Dark',
      light: 'Light',
      switchToLight: 'Switch to light mode',
      switchToDark: 'Switch to dark mode',
    },
    header: {
      title: 'TanStack Learning Playground',
      subtitle: 'personal lab for routes, loaders, and query flow',
      soloWorkspace: 'solo workspace',
      nav: {
        overview: 'Overview',
        routes: 'Routes',
        data: 'Data',
        static: 'Static',
        cheatSheet: 'Guide',
        tooling: 'Tooling',
        suppliers: 'Suppliers',
      },
    },
    footer: {
      description:
        'Personal TanStack learning playground for routes, loaders, query flows, and experiments.',
      built: 'Built for exploration, not dashboard theater.',
      shell: 'TanStack Start laboratory shell',
      chips: {
        router: 'Router',
        query: 'Query',
        tooling: 'Tooling',
        staticRefs: 'Static refs',
      },
      x: 'Follow TanStack on X',
      github: 'Go to TanStack GitHub',
      creator: 'Made by Lautaro Damore',
    },
    home: {
      kicker: 'Personal lab environment',
      title:
        'TanStack Learning Playground for routes, loaders, query flows, and experiments.',
      description:
        'This app is now framed as a personal learning app instead of an inventory console. Use it to trace route relationships, compare static versus data-backed surfaces, and keep the TanStack mental model in view while you explore.',
      ctaRouteMap: 'Open Route Map',
      ctaData: 'Explore Data Flow',
      ctaGuide: 'Open Cheat-Sheet',
      ctaTooling: 'Open Tooling',
      cards: {
        routes:
          'Track how the overview, nested routes, and supporting pages connect.',
        data: 'Use the products flow as the main loader, query, and cache exercise.',
        cheatSheet:
          'Use the bilingual study guide as the reference layer while you explore.',
        tooling:
          'Keep Devtools, command references, and mental models close at hand.',
        categories:
          'Intentional static reference screen for contrast against dynamic routes.',
        suppliers:
          'Another static route for comparing structure, not data behavior.',
      },
      routeMap: 'Route map',
      routeMapItems: [
        'Overview -> route taxonomy and next steps',
        'Routes -> relationship view and exploration order',
        'Data -> loader hydration, query state, and app API flow',
        'Static -> comparison surfaces that stay intentionally hardcoded',
      ],
      howToExplore: 'How to explore',
      howToExploreItems: [
        'Start with `Routes` to understand the shell.',
        'Open `Data` to inspect the live TanStack flow.',
        'Use `Static` to compare what intentionally does not move.',
        'Keep `Tooling` nearby when you want to inspect behavior.',
      ],
    },
    dashboard: {
      title: 'Trace the route graph before you dive into the code.',
      description:
        'Use this screen as a quick map of the playground. It tells you which routes are there for framing, which ones are intentionally static, and where the real data-backed TanStack behavior lives.',
      readingOrder: 'Reading order',
      readingOrderText:
        '`Overview` explains the playground. `Products` shows the most complete dynamic flow. `Categories` and `Suppliers` stay static on purpose so the contrast is visible. `Tooling` is where you inspect behavior instead of guessing.',
      chips: {
        routeMap: 'route map',
        navigationModel: 'navigation model',
      },
      cards: {
        overview:
          'Start at the orientation screen and pick the next concept to inspect.',
        products:
          'Main data-backed route for loaders, cache hydration, and mutations.',
        categories: 'Static reference surface that stays intentionally simple.',
        suppliers:
          'Companion static route for contrast against the dynamic flow.',
        tooling: 'Inspect Devtools, commands, and the TanStack mental model.',
      },
    },
    categories: {
      title: 'Static reference surface for route contrast.',
      description:
        "This route stays static on purpose. It helps you compare a lightweight page shell against the app's more dynamic TanStack flows without adding backend noise.",
      staticExample: (products: number) =>
        `Static example: ${products} products assigned`,
      why: 'Why this matters',
      whyText:
        'When you switch back to `Products`, the differences in loaders, query hydration, and mutation state become easier to notice because this route remains intentionally simple.',
      chips: {
        static: 'static',
        comparisonRoute: 'comparison route',
      },
      names: {
        furniture: 'Furniture',
        equipment: 'Equipment',
        accessories: 'Accessories',
      },
    },
    suppliers: {
      title: 'Static supplier route for quick structure checks.',
      description:
        'Static reference surface for comparing simple route rendering with the more dynamic data-backed areas. It is intentionally useful without pretending to be finished backend work.',
      deliveryEstimate: (eta: string) =>
        `Static example delivery estimate: ${eta}`,
      learningCue: 'Learning cue',
      learningCueText:
        'Use this route as a reminder that not every page needs data wiring. Sometimes the clearest teaching surface is the one that holds still.',
      chips: {
        static: 'static',
        referenceRoute: 'reference route',
      },
      status: {
        preferred: 'Preferred',
        onboarding: 'Onboarding',
        active: 'Active',
      },
      eta: {
        twoDays: '2 days',
        fourDays: '4 days',
        oneDay: '1 day',
      },
    },
    tooling: {
      title: 'Open the instrument panel instead of guessing.',
      description:
        'This route keeps the route tree, query behavior, and core commands in view while you work through the playground.',
      backToOverview: 'Back to Overview',
      openProducts: 'Open products',
      openGuide: 'Open cheat-sheet',
      inspectTitle: 'What to inspect',
      commandsTitle: 'Core commands',
      inspect: {
        router:
          'Use this to inspect the route tree, params, search params, and the current matched route.',
        query:
          'Use this to inspect query keys, cache freshness, refetches, and invalidation after mutations.',
        db: 'TanStack DB is your reactive client collection layer on top of fetching, not your backend database.',
      },
      chips: {
        tooling: 'tooling',
        inspection: 'inspection',
      },
    },
    about: {
      kicker: 'About the stack',
      title: 'How the TanStack pieces fit together.',
      start:
        'TanStack Start is the full-stack framework that ties the app together. It gives this project the app shell, SSR-friendly routing, and the place where client and server features meet.',
      router:
        'TanStack Router handles app and page routing, plus URL state like the products search params. It keeps links, params, and rendered pages aligned in a type-safe way.',
      nitro:
        'Nitro handles the server/runtime routing layer. It is what lets the app run its server-side pieces and API routes without changing the overall app structure.',
      apiTitle: 'App API routes',
      apiRoutes:
        'The product endpoints now live inside TanStack Start API routes, so the playground can deploy as one Netlify app without a separate backend process.',
      creatorTitle: 'Project authorship',
      creatorText:
        'This learning playground was made by Lautaro Damore as a practical space for studying TanStack concepts.',
      creatorLink: 'Lautaro Damore on GitHub',
    },
    products: {
      chips: {
        dataBacked: 'data-backed',
        loader: 'loader',
        query: 'query',
        searchParams: 'search params',
        inspection: 'inspection',
        detailRoute: 'detail route',
        sharedQueryCache: 'shared query cache',
        mutation: 'mutation',
        tanstackForm: 'tanstack form',
        tanstackQuery: 'tanstack query',
      },
      overview: {
        title: 'Products control room',
        description:
          'This is the main workspace for exploring filter orchestration, row scanning, loader hydration, TanStack Query cache behavior, and the app-owned API flow. It is the control room for the product area.',
        create: 'Create product',
        virtual: 'Virtualized catalog',
        db: 'DB live view',
        metrics: {
          matchingRows: 'matching rows',
          currentResultSet: 'current query result set',
          pageWindow: 'page window',
          pagination: 'search params drive pagination',
          activeScope: 'active scope',
          categoryFilter: 'category filter in effect',
          sortMode: 'sort mode',
          inspectionGrid: 'scan order for the inspection grid',
        },
      },
      filters: {
        kicker: 'Command surface',
        title: 'Tune the browse state before you scan the grid.',
        description:
          'Search, category scope, sort mode, and page controls all feed the same loader and query-driven list. This panel keeps the browse state visible instead of hiding it behind the table.',
        labels: {
          category: 'Category',
          page: 'Page',
          rows: 'Rows',
          sort: 'Sort',
          search: 'Search',
        },
        pageSummary: (page: number, totalPages: number, totalItems: number) =>
          `Showing page ${page} of ${totalPages} with ${totalItems} matching products.`,
        customOrder: 'Custom order',
        debouncing: 'Debouncing search...',
        searchPlaceholder:
          'Search names, SKUs, or the current inspection target',
      },
      table: {
        header: {
          product: 'Product',
          category: 'Category',
          price: 'Price',
          stock: 'Stock',
          actions: 'Actions',
        },
        kicker: 'Inspection grid',
        title: 'Scan records, compare fields, and open the next route.',
        note: 'Sort cues stay in the header so row scanning remains fast.',
        inspect: 'Inspect',
        empty: 'No products match the current filters right now.',
      },
      detail: {
        kicker: 'Product Detail',
        title: (name: string) => `Product inspection: ${name}`,
        description:
          'This inspection surface loads product data through the app API layer, with the loader and component sharing the same query cache entry.',
        edit: 'Edit product',
        cards: {
          identity: 'Identity',
          pricing: 'Pricing',
          stock: 'Stock',
          relationships: 'Relationships',
          identityText: (category: string, sku: string) =>
            `${category} category · SKU ${sku}`,
          pricingText: (price: string) =>
            `${price} current list price for this record.`,
          stockText: (stock: number) =>
            `${stock} units currently available in the inspection view.`,
          relationshipsText: (supplierId: string) =>
            `Primary supplier id ${supplierId}.`,
        },
      },
      mutation: {
        createKicker: 'Create Product',
        createTitle: 'Mutation workspace: create a product',
        editKicker: 'Edit Product',
        editTitle: (name: string) => `Mutation workspace: update ${name}`,
        createDescription:
          'You are performing a state change in the product workspace. This form uses TanStack Form for field state and validation, then TanStack Query for the create mutation.',
        editDescription:
          'You are performing a state change with data already hydrated by the route loader. This edit flow reuses the same TanStack Form component while TanStack Query owns the update mutation.',
        saveChanges: 'Save changes',
        createProduct: 'Create product',
      },
      form: {
        sections: {
          identity: 'Identity',
          identityDescription:
            'Define the record name and the SKU that anchors this product in the inspection grid.',
          inventory: 'Inventory',
          inventoryDescription:
            'Control the price and stock values that surface in the control room.',
          relationships: 'Relationships',
          relationshipsDescription:
            'Attach the product to the category and supplier context used across the detail route.',
        },
        labels: {
          name: 'Name',
          sku: 'SKU',
          price: 'Price',
          stock: 'Stock',
          category: 'Category',
          supplier: 'Supplier',
        },
        selectPrompt: (label: string) => `Select ${label.toLowerCase()}`,
        mutationStatus: 'Mutation status',
        mutationDescription:
          'Validation runs in TanStack Form before the mutation is allowed to leave this workspace.',
        saving: 'Saving...',
      },
      virtual: {
        kicker: 'Virtual Catalog',
        title: 'Render 1,000 rows without rendering 1,000 DOM nodes.',
        description:
          'This page reuses the current product query, expands it into a larger client-side catalog, and lets TanStack Virtual render only the visible rows. That is the core idea: big list, small DOM.',
        back: 'Back to products',
        querySource: (real: number, virtual: number) =>
          `Query source: ${real} real products to ${virtual} virtual rows`,
        row: 'Row',
      },
      db: {
        kicker: 'TanStack DB',
        title: 'Live client collection with optimistic stock updates.',
        description:
          'This page keeps products in a TanStack DB collection, derives a live low-stock view, and applies stock changes optimistically before the app API confirms them.',
        back: 'Back to products',
        showAll: 'Show all products',
        showLowStockOnly: 'Show low stock only',
        threshold: (threshold: number, visible: number) =>
          `Low stock threshold: ${threshold}. Visible products: ${visible}`,
        loading: 'Loading collection...',
        error: 'The DB-backed collection could not be loaded.',
        action: 'Action',
        addStock: '+5 stock',
      },
    },
  },
  es: {
    meta: {
      title: 'Laboratorio de Aprendizaje TanStack',
    },
    language: {
      label: 'Idioma',
      english: 'Inglés',
      spanish: 'Español',
    },
    theme: {
      dark: 'Oscuro',
      light: 'Claro',
      switchToLight: 'Cambiar a modo claro',
      switchToDark: 'Cambiar a modo oscuro',
    },
    header: {
      title: 'Laboratorio de Aprendizaje TanStack',
      subtitle: 'laboratorio personal para rutas, loaders y flujo de query',
      soloWorkspace: 'espacio personal',
      nav: {
        overview: 'Resumen',
        routes: 'Rutas',
        data: 'Datos',
        static: 'Estático',
        cheatSheet: 'Guía',
        tooling: 'Herramientas',
        suppliers: 'Proveedores',
      },
    },
    footer: {
      description:
        'Laboratorio personal de TanStack para rutas, loaders, flujos de query y experimentos.',
      built: 'Hecho para explorar, no para parecer un dashboard.',
      shell: 'Shell de laboratorio con TanStack Start',
      chips: {
        router: 'Router',
        query: 'Query',
        tooling: 'Herramientas',
        staticRefs: 'Referencias estáticas',
      },
      x: 'Seguir a TanStack en X',
      github: 'Ir al GitHub de TanStack',
      creator: 'Hecho por Lautaro Damore',
    },
    home: {
      kicker: 'Entorno personal de laboratorio',
      title:
        'Laboratorio TanStack para rutas, loaders, flujos de query y experimentos.',
      description:
        'Esta app ahora está pensada como una app personal de aprendizaje en vez de una consola de inventario. Úsala para seguir relaciones entre rutas, comparar superficies estáticas y con datos, y mantener visible el modelo mental de TanStack mientras exploras.',
      ctaRouteMap: 'Abrir mapa de rutas',
      ctaData: 'Explorar flujo de datos',
      ctaGuide: 'Abrir cheat-sheet',
      ctaTooling: 'Abrir herramientas',
      cards: {
        routes:
          'Sigue cómo se conectan el resumen, las rutas anidadas y las páginas de apoyo.',
        data: 'Usa el flujo de productos como ejercicio principal de loader, query y caché.',
        cheatSheet:
          'Usa la guía bilingüe como capa de referencia mientras exploras.',
        tooling: 'Mantén Devtools, comandos y modelos mentales siempre a mano.',
        categories:
          'Pantalla de referencia estática para contrastar con rutas dinámicas.',
        suppliers:
          'Otra ruta estática para comparar estructura, no comportamiento de backend.',
      },
      routeMap: 'Mapa de rutas',
      routeMapItems: [
        'Resumen -> taxonomía de rutas y próximos pasos',
        'Rutas -> vista de relaciones y orden de exploración',
        'Datos -> hidratación del loader, estado de query y flujo de API de la app',
        'Estático -> superficies de comparación que permanecen intencionalmente fijas',
      ],
      howToExplore: 'Cómo explorar',
      howToExploreItems: [
        'Empieza por `Rutas` para entender el shell.',
        'Abre `Datos` para inspeccionar el flujo real de TanStack.',
        'Usa `Estático` para comparar lo que intencionalmente no cambia.',
        'Ten `Herramientas` cerca cuando quieras inspeccionar comportamiento.',
      ],
    },
    dashboard: {
      title: 'Recorre el grafo de rutas antes de meterte en el código.',
      description:
        'Usa esta pantalla como mapa rápido del laboratorio. Te muestra qué rutas sirven para orientar, cuáles son intencionalmente estáticas y dónde vive el comportamiento real de TanStack con datos.',
      readingOrder: 'Orden de lectura',
      readingOrderText:
        '`Resumen` explica el laboratorio. `Productos` muestra el flujo dinámico más completo. `Categorías` y `Proveedores` permanecen estáticos a propósito para que el contraste sea visible. `Herramientas` es donde inspeccionas el comportamiento en vez de adivinar.',
      chips: {
        routeMap: 'mapa de rutas',
        navigationModel: 'modelo de navegación',
      },
      cards: {
        overview:
          'Empieza en la pantalla de orientación y elige el siguiente concepto a inspeccionar.',
        products:
          'Ruta principal con datos para loaders, hidratación de caché y mutaciones.',
        categories:
          'Superficie de referencia estática que se mantiene simple a propósito.',
        suppliers:
          'Ruta estática complementaria para contrastar con el flujo dinámico.',
        tooling:
          'Inspecciona Devtools, comandos y el modelo mental de TanStack.',
      },
    },
    categories: {
      title: 'Superficie de referencia estática para contrastar rutas.',
      description:
        'Esta ruta permanece estática a propósito. Te ayuda a comparar una página liviana contra los flujos TanStack más dinámicos de la app sin agregar ruido de backend.',
      staticExample: (products: number) =>
        `Ejemplo estático: ${products} productos asignados`,
      why: 'Por qué importa',
      whyText:
        'Cuando vuelves a `Productos`, las diferencias en loaders, hidratación de query y estado de mutación se hacen más evidentes porque esta ruta se mantiene intencionalmente simple.',
      chips: {
        static: 'estático',
        comparisonRoute: 'ruta de comparación',
      },
      names: {
        furniture: 'Muebles',
        equipment: 'Equipamiento',
        accessories: 'Accesorios',
      },
    },
    suppliers: {
      title: 'Ruta estática de proveedores para revisar estructura rápido.',
      description:
        'Superficie de referencia estática para comparar renderizado simple de rutas con las áreas más dinámicas y respaldadas por datos. Es útil a propósito sin fingir que ya es trabajo de backend terminado.',
      deliveryEstimate: (eta: string) =>
        `Estimación estática de entrega: ${eta}`,
      learningCue: 'Pista de aprendizaje',
      learningCueText:
        'Usa esta ruta como recordatorio de que no toda página necesita cableado de datos. A veces la superficie didáctica más clara es la que se queda quieta.',
      chips: {
        static: 'estático',
        referenceRoute: 'ruta de referencia',
      },
      status: {
        preferred: 'Preferido',
        onboarding: 'En incorporación',
        active: 'Activo',
      },
      eta: {
        twoDays: '2 días',
        fourDays: '4 días',
        oneDay: '1 día',
      },
    },
    tooling: {
      title: 'Abre el panel de instrumentos en vez de adivinar.',
      description:
        'Esta ruta mantiene visibles el árbol de rutas, el comportamiento de query y los comandos centrales mientras recorres el laboratorio.',
      backToOverview: 'Volver al resumen',
      openProducts: 'Abrir productos',
      openGuide: 'Abrir cheat-sheet',
      inspectTitle: 'Qué inspeccionar',
      commandsTitle: 'Comandos principales',
      inspect: {
        router:
          'Úsalo para inspeccionar el árbol de rutas, params, search params y la ruta actual que coincide.',
        query:
          'Úsalo para inspeccionar claves de query, frescura de caché, refetches e invalidación después de mutaciones.',
        db: 'TanStack DB es tu capa reactiva de colecciones cliente sobre fetching, no tu base de datos de backend.',
      },
      chips: {
        tooling: 'herramientas',
        inspection: 'inspección',
      },
    },
    about: {
      kicker: 'Sobre el stack',
      title: 'Cómo encajan las piezas de TanStack.',
      start:
        'TanStack Start es el framework full-stack que une toda la app. Le da a este proyecto el shell de la aplicación, el enrutado compatible con SSR y el lugar donde se encuentran las funciones de cliente y servidor.',
      router:
        'TanStack Router se encarga del enrutado de la app y de las páginas, además del estado en la URL como los search params de productos. Mantiene alineados links, params y páginas renderizadas de forma type-safe.',
      nitro:
        'Nitro maneja la capa de runtime y routing del servidor. Es lo que permite que la app ejecute sus partes server-side y rutas API sin cambiar la estructura general.',
      apiTitle: 'Rutas API de la app',
      apiRoutes:
        'Los endpoints de productos ahora viven dentro de rutas API de TanStack Start, así que el playground puede desplegarse como una sola app en Netlify sin un backend separado.',
      creatorTitle: 'Autoría del proyecto',
      creatorText:
        'Este playground de aprendizaje fue hecho por Lautaro Damore como un espacio práctico para estudiar conceptos de TanStack.',
      creatorLink: 'Lautaro Damore en GitHub',
    },
    products: {
      chips: {
        dataBacked: 'con datos',
        loader: 'loader',
        query: 'query',
        searchParams: 'search params',
        inspection: 'inspección',
        detailRoute: 'ruta detalle',
        sharedQueryCache: 'caché de query compartida',
        mutation: 'mutación',
        tanstackForm: 'tanstack form',
        tanstackQuery: 'tanstack query',
      },
      overview: {
        title: 'Centro de control de productos',
        description:
          'Este es el espacio principal para explorar orquestación de filtros, lectura de filas, hidratación de loaders, comportamiento de caché de TanStack Query y el flujo de API propio de la app. Es el centro de control del área de productos.',
        create: 'Crear producto',
        virtual: 'Catálogo virtualizado',
        db: 'Vista viva de DB',
        metrics: {
          matchingRows: 'filas coincidentes',
          currentResultSet: 'conjunto de resultados actual',
          pageWindow: 'ventana de página',
          pagination: 'los search params controlan la paginación',
          activeScope: 'alcance activo',
          categoryFilter: 'filtro de categoría en uso',
          sortMode: 'modo de orden',
          inspectionGrid: 'orden de lectura para la grilla de inspección',
        },
      },
      filters: {
        kicker: 'Superficie de control',
        title: 'Ajusta el estado de navegación antes de leer la grilla.',
        description:
          'Búsqueda, alcance por categoría, modo de orden y controles de página alimentan la misma lista impulsada por loader y query. Este panel mantiene visible el estado en vez de esconderlo detrás de la tabla.',
        labels: {
          category: 'Categoría',
          page: 'Página',
          rows: 'Filas',
          sort: 'Orden',
          search: 'Buscar',
        },
        pageSummary: (page: number, totalPages: number, totalItems: number) =>
          `Mostrando página ${page} de ${totalPages} con ${totalItems} productos coincidentes.`,
        customOrder: 'Orden personalizado',
        debouncing: 'Aplicando búsqueda...',
        searchPlaceholder:
          'Busca nombres, SKUs o el objetivo actual de inspección',
      },
      table: {
        header: {
          product: 'Producto',
          category: 'Categoría',
          price: 'Precio',
          stock: 'Stock',
          actions: 'Acciones',
        },
        kicker: 'Grilla de inspección',
        title: 'Lee registros, compara campos y abre la siguiente ruta.',
        note: 'Las pistas de orden se quedan en el encabezado para leer filas más rápido.',
        inspect: 'Inspeccionar',
        empty:
          'No hay productos que coincidan con los filtros actuales ahora mismo.',
      },
      detail: {
        kicker: 'Detalle del producto',
        title: (name: string) => `Inspección del producto: ${name}`,
        description:
          'Esta superficie de inspección carga datos del producto a través de la capa API de la app, con loader y componente compartiendo la misma entrada de caché de query.',
        edit: 'Editar producto',
        cards: {
          identity: 'Identidad',
          pricing: 'Precio',
          stock: 'Stock',
          relationships: 'Relaciones',
          identityText: (category: string, sku: string) =>
            `Categoría ${category} · SKU ${sku}`,
          pricingText: (price: string) =>
            `${price} es el precio actual de este registro.`,
          stockText: (stock: number) =>
            `${stock} unidades disponibles actualmente en la vista de inspección.`,
          relationshipsText: (supplierId: string) =>
            `Proveedor principal: ${supplierId}.`,
        },
      },
      mutation: {
        createKicker: 'Crear producto',
        createTitle: 'Espacio de mutación: crear un producto',
        editKicker: 'Editar producto',
        editTitle: (name: string) => `Espacio de mutación: actualizar ${name}`,
        createDescription:
          'Estás realizando un cambio de estado en el espacio de productos. Este formulario usa TanStack Form para estado y validación de campos, y luego TanStack Query para la mutación de creación.',
        editDescription:
          'Estás realizando un cambio de estado con datos ya hidratados por el loader de la ruta. Este flujo de edición reutiliza el mismo componente de TanStack Form mientras TanStack Query gestiona la mutación de actualización.',
        saveChanges: 'Guardar cambios',
        createProduct: 'Crear producto',
      },
      form: {
        sections: {
          identity: 'Identidad',
          identityDescription:
            'Define el nombre del registro y el SKU que ancla este producto en la grilla de inspección.',
          inventory: 'Inventario',
          inventoryDescription:
            'Controla los valores de precio y stock que aparecen en el centro de control.',
          relationships: 'Relaciones',
          relationshipsDescription:
            'Vincula el producto con el contexto de categoría y proveedor usado en la ruta de detalle.',
        },
        labels: {
          name: 'Nombre',
          sku: 'SKU',
          price: 'Precio',
          stock: 'Stock',
          category: 'Categoría',
          supplier: 'Proveedor',
        },
        selectPrompt: (label: string) => `Selecciona ${label.toLowerCase()}`,
        mutationStatus: 'Estado de mutación',
        mutationDescription:
          'La validación se ejecuta en TanStack Form antes de que la mutación pueda salir de este espacio.',
        saving: 'Guardando...',
      },
      virtual: {
        kicker: 'Catálogo virtual',
        title: 'Renderiza 1.000 filas sin renderizar 1.000 nodos DOM.',
        description:
          'Esta página reutiliza la query actual de productos, la expande a un catálogo cliente más grande y deja que TanStack Virtual renderice solo las filas visibles. Esa es la idea central: lista grande, DOM chico.',
        back: 'Volver a productos',
        querySource: (real: number, virtual: number) =>
          `Origen de query: ${real} productos reales a ${virtual} filas virtuales`,
        row: 'Fila',
      },
      db: {
        kicker: 'TanStack DB',
        title:
          'Colección cliente viva con actualizaciones optimistas de stock.',
        description:
          'Esta página mantiene productos en una colección de TanStack DB, deriva una vista viva de bajo stock y aplica cambios de stock de forma optimista antes de que la API de la app los confirme.',
        back: 'Volver a productos',
        showAll: 'Mostrar todos los productos',
        showLowStockOnly: 'Mostrar solo bajo stock',
        threshold: (threshold: number, visible: number) =>
          `Umbral de bajo stock: ${threshold}. Productos visibles: ${visible}`,
        loading: 'Cargando colección...',
        error: 'No se pudo cargar la colección basada en DB.',
        action: 'Acción',
        addStock: '+5 de stock',
      },
    },
  },
} as const

export const defaultI18nCopy = messages.en

type I18nValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  copy: (typeof messages)[Locale]
}

const I18nContext = createContext<I18nValue>({
  locale: 'en',
  setLocale: () => {},
  copy: defaultI18nCopy,
})

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  return stored === 'es' || stored === 'en' ? stored : 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')

  useEffect(() => {
    setLocale(getInitialLocale())
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = messages[locale].meta.title
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      copy: messages[locale],
    }),
    [locale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}

export function getLocalizedCategoryLabel(
  categoryId: string,
  locale: Locale,
): string {
  const localizedLabels = categoryLabels[locale] as Partial<
    Record<string, string>
  >
  const fallbackLabels = categoryLabels.en as Partial<Record<string, string>>

  return localizedLabels[categoryId] ?? fallbackLabels[categoryId] ?? categoryId
}

export function getLocalizedSortLabel(
  sortValue: string,
  locale: Locale,
): string {
  const localizedLabels = sortLabels[locale] as Partial<Record<string, string>>
  const fallbackLabels = sortLabels.en as Partial<Record<string, string>>

  return localizedLabels[sortValue] ?? fallbackLabels[sortValue] ?? sortValue
}

export function getLocalizedSupplierLabel(supplierId: string): string {
  const labels = supplierLabels as Partial<Record<string, string>>
  return labels[supplierId] ?? supplierId
}

export function getLocalizedProductFormError(
  error: string | undefined,
  locale: Locale,
): string | undefined {
  if (!error || locale === 'en') {
    return error
  }

  switch (error) {
    case 'Name is required':
      return 'El nombre es obligatorio'
    case 'SKU is required':
      return 'El SKU es obligatorio'
    case 'Category is required':
      return 'La categoría es obligatoria'
    case 'Supplier is required':
      return 'El proveedor es obligatorio'
    case 'Price is required':
      return 'El precio es obligatorio'
    case 'Stock is required':
      return 'El stock es obligatorio'
    case 'Price must be a non-negative number':
      return 'El precio debe ser un número no negativo'
    case 'Stock must be a non-negative number':
      return 'El stock debe ser un número no negativo'
    default:
      return error
  }
}

export function formatUsdCurrency(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === 'es' ? 'es-AR' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value)
}
