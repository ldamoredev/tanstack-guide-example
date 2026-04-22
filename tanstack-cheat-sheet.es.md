# Guía de Estudio TanStack Para Este Proyecto

Esta guía es la versión opinada de lo que aprendí construyendo este repo.

No es una referencia de API de TanStack. La documentación oficial ya hace eso mejor. Esta es la mentalidad que me gustaría tener como ingeniero con experiencia evaluando si TanStack aporta valor en una base de código React real.

## Mi opinión

TanStack no me parece interesante porque agregue más librerías a React.

Me parece interesante porque le pone nombre y límites a problemas que las apps React ya tienen: routing, estado en la URL, server state, formularios, tablas, virtualización, updates optimistas y timing.

Eso importa en sistemas reales. La parte difícil de la arquitectura frontend casi nunca es renderizar un botón. La parte difícil es mantener clara la propiedad del estado cuando una misma pantalla tiene filtros en la URL, datos cacheados, formularios, mutaciones, feedback optimista, loading states y comportamiento derivado de una tabla.

Mi opinión: TanStack brilla cuando querés primitivas explícitas en vez de magia de framework. Te da control, pero también espera que entiendas los límites.

## Por qué TanStack?

Las apps React modernas tienden a acumular máquinas de estado accidentales:

- un router que conoce la página pero no el estado de búsqueda del producto
- cadenas de `useEffect` que intentan ser arquitectura de fetching
- formularios que mezclan validación, estado pendiente y lógica de mutación
- tablas que empiezan como `array.map` y terminan siendo frameworks internos
- invalidación de cache escondida en callbacks de componentes

TanStack le da una herramienta dedicada a cada responsabilidad.

Router es dueño del estado en la URL. Query es dueño del server state. Form es dueño del input en progreso. Table es dueño del comportamiento de tabla. Virtual es dueño de la estrategia de renderizado del DOM. DB es dueño de colecciones cliente más ricas. Pacer es dueño del timing de acciones repetidas. Start le da a la app un límite de servidor.

Lo importante no es usar todas las librerias. Lo importante es saber que problema puede resolver cada una.

## Por qué ahora?

React se movió hacia server rendering, streaming, datos por ruta y límites más claros entre servidor y cliente. Al mismo tiempo, muchos equipos siguen necesitando la ergonomía de una app muy interactiva: URL state tipado, tablas densas, mutaciones rápidas y cache predecible.

TanStack vive en ese espacio.

Está ganando tracción porque no fuerza una sola forma de producto. Podés usar Router sin Start. Podés usar Query en casi cualquier app React. Podés sumar Table o Virtual solo cuando la pantalla lo justifica. Esa modularidad es útil para equipos que no quieren decisiones de framework todo-o-nada.

## TanStack vs Next.js

Next.js es un framework completo con convenciones fuertes, especialmente para file routing, server rendering, server components y deployment.

TanStack Start es más explícito y menos maduro. Te da primitivas potentes alrededor de Router, loaders, server routes, server functions y Vite, pero te pide tomar más decisiones de arquitectura.

Yo usaria Next.js cuando el producto se beneficia de sus convenciones, ecosistema y defaults de hosting.

Usaría TanStack Start cuando quiero una arquitectura más cercana a librerías, mejor ergonomía de routing cliente y propiedad clara sobre estado de URL y flujos de datos.

## TanStack vs React Router

React Router es un default estable para routing en muchas apps React.

TanStack Router se vuelve más atractivo cuando el estado de URL no es solo navegación sino comportamiento de producto: filtros, orden, paginación, tabs, layouts anidados, loaders y params/search tipados.

La diferencia no es solo routing. Es cuánta confianza querés tener sobre los contratos de ruta.

Si las rutas son simples, React Router alcanza. Si el estado de ruta es parte de la superficie del producto, TanStack Router vale la evaluación.

## TanStack Query vs Fetch o Axios

`fetch` y `axios` son herramientas de transporte. No resuelven el ciclo de vida del server state.

El server state real necesita identidad, cache, freshness, retries, loading states, mutaciones, invalidación, prefetching e hidratación SSR.

Podés construir eso con `useEffect`, estado local y convenciones. Muchos equipos terminan haciéndolo. TanStack Query es el punto donde dejás de tratar el transporte como si fuera arquitectura.

## Cuándo usar TanStack

Usa TanStack cuando:

- el estado de URL importa y debe ser tipado, compartible y validado
- los datos se reutilizan entre pantallas y pueden quedar stale
- la carga de datos debería ser parte de la navegación
- los formularios tienen validación y flujos de envío reales
- las tablas necesitan orden, filtros, paginación, visibilidad o selección
- las listas grandes generan problemas de DOM
- el feedback optimista y las vistas derivadas cliente importan
- preferís límites explícitos antes que convenciones ocultas

## Cuándo no usar TanStack

No uses TanStack solo para que el proyecto parezca moderno.

Evitalo cuando:

- la app es mayormente contenido estático
- el routing es simple y el estado de URL no importa
- los datos remotos son triviales y aislados
- el equipo no quiere aprender varias primitivas explícitas
- una convención de framework ya resuelve suficientemente bien el problema
- el producto necesita máxima madurez de ecosistema por encima de control arquitectónico

Para apps chicas, el vocabulario extra puede ser ruido.

## Tradeoffs

La ventaja es control. TanStack hace visible y testeable la propiedad del estado.

El costo es superficie. Tenés que aprender los límites entre Router, Query, Form, Table, DB y Start. Si el equipo mezcla esas responsabilidades, el stack puede volverse más difícil que el problema.

La DX es fuerte cuando el modelo mental hace click. Antes de eso, puede sentirse como muchas librerías pequeñas pidiendo decisiones precisas.

La madurez del ecosistema también varía. Query y Table están muy probadas. Start y DB son más emergentes. Eso no las hace malas, pero cambia el perfil de riesgo.

## Casos reales de uso

TanStack tiene sentido para:

- herramientas internas con pantallas densas de datos
- apps de finanzas, logística, inventario, reporting u operaciones
- productos SaaS con filtros pesados y deep links
- dashboards donde stale data y refetch importan
- apps con formularios complejos y flujos create/edit
- productos que necesitan feedback optimista rapido
- equipos que valoran contratos de ruta type-safe

Es menos atractivo para una landing, blog, sitio institucional o CRUD mínimo.

## La imagen general

En este repo, el stack se divide así:

- `TanStack Start` da el shell full-stack de la app.
- `TanStack Router` controla routing y estado de URL.
- `TanStack Query` controla fetching y cache de backend.
- `TanStack Form` controla estado y validación de formularios.
- `TanStack Table` controla comportamiento de tablas.
- `TanStack Virtual` controla performance de renderizado para listas grandes.
- `TanStack DB` controla colecciones cliente más ricas y flujos optimistas.
- `TanStack Pacer` controla timing de acciones repetidas.
- `TanStack Devtools` ayuda a inspeccionar que hace la app.
- `TanStack CLI` ayuda a crear y scaffoldar proyectos TanStack.

El flujo en este repo es:

1. El browser entra a una ruta
2. Router matchea la página y valida estado de URL
3. Start corre el shell de la app y lógica web del servidor
4. Query carga datos del backend
5. Form edita datos
6. Table presenta datos
7. Virtual reduce trabajo del DOM en listas grandes
8. DB da colecciones reactivas cliente cuando hace falta
9. Pacer ralentiza o encola acciones repetidas
10. Devtools ayuda a inspeccionar el sistema

## TanStack Start

Start es la capa full-stack. Es la razón por la que este proyecto puede tener páginas y API routes en una sola app desplegable.

Usalo cuando necesites SSR, server routes, server functions, middleware, request context o una capa BFF delante de otro backend.

En este repo:

- `src/routes/__root.tsx` define el document shell.
- `src/app/router.tsx` crea el router.
- `src/routes/api` contiene las API routes de la app.
- `vite.config.ts` conecta TanStack Start y el runtime de deploy.

Regla clave: Start es el límite de aplicación. Debe coordinar concerns web, no volverse un lugar para tirar lógica de dominio.

## TanStack Router

Router es donde el estado de URL se vuelve estado real de aplicacion.

La página de productos usa search params para:

- `q`
- `category`
- `sort`
- `page`

Eso significa que una tabla filtrada se puede refrescar, compartir, guardar como bookmark y validar.

En este repo:

- `src/routes/products/index.tsx` valida search params e hidrata la query de lista.
- `src/modules/products/model/search.ts` define la forma aceptada de search.
- `src/modules/products/ui/ProductsPage.tsx` actualiza estado de URL con navegación tipada.

Regla clave: si un estado debe sobrevivir refresh o compartirse como link, probablemente Router debería ser su dueño.

## TanStack Query

Query es dueño del server state.

Eso significa datos con ciclo de vida: fetch, cache, stale, refetch, mutate, invalidate e hidratación entre servidor y cliente.

En este repo:

- `src/modules/products/query/product.queries.ts` define identidades de query.
- `src/modules/products/query/product.mutations.ts` invalida queries relacionadas después de escribir.
- `src/modules/products/query/product.prefetch.ts` conecta loaders de ruta con Query.

Regla clave: Query no es estado global. Es una cache de server state.

Ejemplo de identidad de query:

```ts
;['products', { q: 'ssd', category: 'storage', sort: 'price-desc', page: 2 }]
```

Esa key no es decoración. Es la identidad de los datos remotos que se están pidiendo.

## TanStack Form

Form es dueño del input en progreso.

Esa separación importa. El estado de formulario no es server state. Query no debería saber qué campo está dirty. Form no debería convertirse en cache.

En este repo:

- `src/modules/products/ui/ProductForm.tsx` renderiza formularios de create y edit.
- `src/modules/products/model/form.ts` define validación e input de mutación.
- `src/modules/products/application/useCreateProductFlow.ts` y `useUpdateProductFlow.ts` conectan submit con mutaciones.

Regla clave: Form valida y produce input. Query lo persiste.

## TanStack Table

Table modela comportamiento de tabla. No fetchea datos, no posee lógica de dominio y no renderiza un design system por vos.

Usalo cuando una tabla necesita orden, filtros, paginación, row models, selección, visibilidad de columnas o estado controlado.

En este repo:

- `src/modules/products/ui/ProductTable.tsx` renderiza la grilla de productos.
- `src/modules/products/ui/ProductsPage.tsx` mantiene acciones de tabla conectadas al estado de URL.

Regla clave: Table es para estado de tabla, no para carga de datos.

## TanStack Virtual

Virtual es una estrategia de renderizado para listas grandes.

Mantiene la lista completa disponible conceptualmente, pero solo renderiza la ventana visible más overscan. Eso reduce presión sobre el DOM sin cambiar el modelo de datos.

En este repo:

- `src/modules/products/ui/VirtualProductsPage.tsx` demuestra filas virtualizadas.
- `src/modules/products/lib/virtual.ts` contiene helpers de datos virtuales.

Regla clave: no virtualices temprano. Usalo cuando el volumen de renderizado sea el bottleneck.

## TanStack DB

DB es una capa de datos cliente para colecciones locales más ricas, live queries y flujos optimistas.

No es Postgres, Prisma ni tu base de datos backend.

En este repo:

- `src/modules/products/db/product.collection.ts` define la coleccion.
- `src/modules/products/model/db.ts` modela comportamiento client-side de DB.
- `src/modules/products/ui/DbProductsPage.tsx` demuestra vistas locales reactivas de productos.

Regla clave: empezá con Query. Usá DB cuando la invalidación de queries no exprese bien el modelo de datos cliente.

## TanStack Pacer

Pacer es dueño del timing.

Suena menor hasta que tenés search boxes, scroll handlers, resize handlers, mutaciones repetidas o acciones rate-limited.

En este repo:

- `src/modules/products/ui/DebouncedSearchInput.tsx` mantiene la escritura responsive.
- `src/modules/products/lib/pacer.ts` controla el search demorado.

Regla clave: el timing es parte de la correccion de UX, no solo performance.

## TanStack Devtools

Devtools acortan el feedback loop.

Ayudan a inspeccionar rutas, cache de queries, invalidación, freshness y navegación en vez de adivinar con console logs.

En este repo:

- `src/routes/__root.tsx` monta el shell global.
- `vite.config.ts` habilita el plugin de Vite.
- `src/routes/tooling.tsx` junta notas de tooling.

Regla clave: inspecciona estado antes de inventar teorias.

## TanStack CLI

La CLI sirve para iniciar proyectos y explorar caminos oficiales de setup.

No es una decisión de arquitectura en runtime. Ayuda a bootstrappear apps Start y Router, templates y add-ons.

Regla clave: usa la CLI para empezar mas rapido, despues juzga la arquitectura por el codigo que mantenes.

## Guía rápida de comparaciones

Start vs Router:

- `Router` controla routing y estado de URL.
- `Start` envuelve Router con capacidades full-stack.

Router vs Query:

- `Router` responde donde esta el usuario y que estado de URL esta activo.
- `Query` responde que datos de servidor pertenecen a ese estado.

Query vs DB:

- `Query` cachea server state.
- `DB` modela colecciones cliente mas ricas y vistas derivadas live.

Form vs Query:

- `Form` posee input no guardado.
- `Query` posee datos remotos persistidos.

Table vs Virtual:

- `Table` modela comportamiento tabular.
- `Virtual` reduce trabajo del DOM.

## Qué aprender primero

El orden que recomiendo para este repo:

1. Start
2. Router
3. Query
4. Form
5. Table
6. Virtual
7. DB
8. Pacer
9. Devtools
10. CLI

Ese orden coincide con la dependencia conceptual entre las piezas.

## Documentación oficial

- TanStack Start: https://tanstack.com/start
- TanStack Router: https://tanstack.com/router
- TanStack Query: https://tanstack.com/query
- TanStack Form: https://tanstack.com/form
- TanStack Table: https://tanstack.com/table
- TanStack Virtual: https://tanstack.com/virtual
- TanStack DB: https://tanstack.com/db
- TanStack Pacer: https://tanstack.com/pacer
- TanStack Devtools: https://tanstack.com/devtools
- TanStack CLI: https://tanstack.com/cli
