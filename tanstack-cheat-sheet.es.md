# Guía de Estudio TanStack Para Este Proyecto

Este documento responde cuatro preguntas para cada librería de TanStack:

1. ¿Qué problema resuelve?
2. ¿Cuándo debería usarla?
3. ¿Cómo funciona a alto nivel?
4. ¿Cuáles son los bloques principales que necesito aprender?

No es una referencia completa de APIs. Es el modelo mental que conviene tener si estás aprendiendo TanStack a través de este repo.

## La Imagen General

En este proyecto, el stack se divide así:

- `TanStack Start` nos da el shell full-stack de la app.
- `TanStack Router` controla rutas de página y estado en la URL.
- `TanStack Query` controla fetching, cache y sincronización de datos del backend.
- `TanStack Form` controla estado y validación de formularios.
- `TanStack Table` controla el comportamiento de tablas.
- `TanStack Virtual` controla performance de render para listas grandes.
- `TanStack DB` controla colecciones cliente más ricas y flujos optimistas.
- `TanStack Pacer` controla el timing de acciones repetidas.
- `TanStack Devtools` ayuda a inspeccionar lo que hace la app.
- `TanStack CLI` ayuda a crear y scaffoldear proyectos TanStack.

El flujo en este repo es:

1. El navegador entra a una ruta
2. Router matchea la página
3. Start ejecuta el shell de la app y la lógica web del servidor
4. Query carga datos del backend
5. Form edita datos
6. Table presenta datos
7. Virtual reduce trabajo del DOM para listas grandes
8. DB da colecciones cliente reactivas cuando hace falta
9. Pacer retrasa o encola acciones cuando el timing importa
10. Devtools ayuda a inspeccionar todo lo anterior

## TanStack Start

### Razón principal para usarlo

Usa TanStack Start cuando quieres más que una SPA del lado cliente. Start es el framework full-stack del stack. Está construido sobre TanStack Router y Vite, y agrega SSR de documento completo, streaming, server routes, server functions, middleware y bundling full-stack.

### Cuándo usarlo

Usa Start cuando necesitas una o más de estas cosas:

- SSR o streaming
- API routes o server routes dentro de la app
- server functions
- middleware y contexto de request
- un proyecto que maneje browser y servidor
- una capa BFF delante de otro backend

Si solo quieres una app cliente con routing fuerte, TanStack Router solo puede alcanzar.

### Cómo funciona

Start se apoya en TanStack Router. Router maneja el árbol de rutas y el matching de páginas. Start agrega la capa full-stack alrededor:

- renderizado del documento
- integración con runtime de servidor
- API/server routes
- server functions
- output de build para cliente y servidor

En este repo, Start está habilitado en `vite.config.ts`, y el router se crea en `src/app/router.tsx`.

### Bloques principales para aprender

- `src/routes`
  Donde viven las rutas file-based.
- `__root.tsx`
  La ruta raíz y el document shell.
- `getRouter()`
  Crea la instancia del router.
- route loaders
  Cargan datos para rutas.
- server routes / API routes
  Endpoints dentro de la app.
- server functions
  Llamadas cliente-servidor tipadas.
- middleware y contexto
  Inyectan datos transversales de request.

### Start y Nitro en este repo

Este proyecto también usa `nitro()` en `vite.config.ts`. La forma limpia de pensarlo es:

- `TanStack Router` maneja routing de páginas
- `TanStack Start` es el framework full-stack
- `Nitro` es la capa de runtime/servidor usada en esta configuración

Si alguien dice “routing de Nitro”, normalmente habla de routing del servidor/runtime, no del routing de páginas.

### En este repo

- shell de app: `src/routes/__root.tsx`
- creación del router: `src/app/router.tsx`
- API routes server-facing: `src/routes/api`

### Mini ejemplo

Abres `/products/prod-mouse-wireless`.

- Start recibe el request
- puede renderizar la ruta en el servidor
- puede ejecutar loaders antes de mostrar la página
- también puede exponer `/api/products/prod-mouse-wireless` como ruta interna de servidor

Start es el framework que permite que una sola app maneje renderizado de páginas y lógica web del servidor.

## TanStack Router

### Razón principal para usarlo

Usa Router cuando quieres que la URL sea una parte real del estado de la app. Router maneja matching de páginas, layouts anidados, params, search params, route loaders, navegación y APIs de ruta tipadas.

### Cuándo usarlo

Usa Router para:

- navegación entre páginas
- layouts y rutas anidadas
- URL params como `/products/$productId`
- search params como `?q=ssd&sort=price-desc`
- loading y preloading por ruta
- error boundaries y flujos not-found

### Cómo funciona

Router construye un árbol de rutas y compara la URL actual contra ese árbol. Cada ruta matcheada puede aportar:

- component
- loader
- validación de search params
- contexto de ruta
- manejo de errores

Una idea clave es que los search params no son solo strings: son estado de aplicación que debería ser tipado, validado, compartible y bookmarkeable.

### Bloques principales para aprender

- `createFileRoute`
  Define una ruta desde un archivo.
- route tree
  La estructura generada de todas las rutas.
- params
  Valores del path como ids y slugs.
- search params
  Estado de URL para filtros, orden, paginación y tabs.
- loaders
  Carga de datos asociada a una ruta.
- `Link` y `navigate`
  APIs de navegación type-safe.
- route context
  Dependencias tipadas compartidas entre rutas.
- nested routes y outlets
  Composición padre-hijo de páginas.

### Mejor caso de uso en este repo

Router es dueño de:

- `/products`
- `/products/$productId`
- `/products/$productId/edit`
- estado URL como `q`, `category`, `sort`, `page`

Puedes verlo en `src/routes/products`.

### Regla más importante

Si un estado debería sobrevivir refresh, ser linkeable o compartible, normalmente pertenece a la URL y por lo tanto a Router.

### Mini ejemplo

Esta URL:

```txt
/products?q=ssd&category=storage&sort=price-desc&page=2
```

pertenece a Router porque:

- `q` es texto de búsqueda
- `category` es un filtro
- `sort` define el orden
- `page` define la paginación

La pantalla puede refrescarse, guardarse o compartirse y volver al mismo estado.

## TanStack Query

### Razón principal para usarlo

Usa Query para `server state`: datos que vienen de un backend, pueden quedar stale, se comparten entre pantallas y necesitan cache, retries, loading/error state o invalidación.

### Cuándo usarlo

Usa Query cuando los datos:

- vienen de una API o backend
- pueden quedar stale
- pueden compartirse entre pantallas
- necesitan loading/error/success state
- necesitan retries, cache, invalidación u optimistic updates

Ejemplos:

- lista de productos
- detalle de producto
- métricas de dashboard
- mutaciones create/update/delete

### Cómo funciona

Query modela datos remotos como algo con ciclo de vida:

- fetch
- cache
- fresh/stale
- refetch
- mutate
- invalidate o update de entradas relacionadas

En lugar de escribir `useEffect + fetch + loading + error + refetch`, declaras un `queryKey`, un `queryFn` y opciones de frescura/refetch.

### Bloques principales para aprender

- `QueryClient`
  El dueño global del cache.
- `QueryClientProvider`
  Expone el cliente a React.
- `queryKey`
  Identidad estable de una consulta.
- `queryFn`
  Función que trae datos.
- `useQuery`
  Hook para leer server state.
- `useMutation`
  Hook para escribir/cambiar server state.
- `invalidateQueries`
  Marca datos como stale para recargarlos.
- `prefetchQuery`
  Carga datos antes de que se necesiten.
- `dehydrate` / `hydrate`
  Puente entre datos SSR/loader y cliente.

### Mejor caso de uso en este repo

Query maneja:

- listados de productos
- detalle de producto
- create/update de productos
- cache compartida entre loader, lista y detalle

### Regla más importante

Query no es para cualquier estado. Es para server state. Si el estado solo vive en la UI, no lo metas en Query.

### Mini ejemplo

La key de productos puede incluir los search params:

```ts
;['products', { q, category, sort, page }]
```

Cuando cambia `page`, cambia la key. Query entiende que necesita otro resultado y puede cachear cada ventana por separado.

## TanStack Form

### Razón principal para usarlo

Usa Form para estado de formularios: valores, touched, dirty, errores, validación y submit. Su trabajo termina antes de la mutación; Query se encarga de hablar con el backend.

### Cuándo usarlo

Usa Form cuando necesitas:

- formularios con varios campos
- validación por campo o por formulario
- submit controlado
- estados como dirty/touched/submitting
- formularios reutilizables para crear y editar

### Cómo funciona

Form crea una instancia de formulario que conoce valores, errores y estado. Cada campo se conecta al formulario y puede validar su propio valor. Al enviar, produces un payload limpio para la mutación.

### Bloques principales para aprender

- `useForm`
  Crea la instancia del form.
- `form.Field`
  Conecta un input al estado del formulario.
- validators
  Reglas de validación.
- `handleSubmit`
  Coordina el envío.
- field state
  Errores, touched, dirty y value por campo.
- form state
  Estado global del formulario.

### Mejor caso de uso en este repo

El flujo `new/edit product` usa Form para controlar campos y validación antes de llamar a mutaciones de Query.

### Regla más importante

Form owns form state. Query owns backend data. No mezcles esas responsabilidades.

### Mini ejemplo

1. Form valida `name`, `sku`, `price`, `stock`, `categoryId`, `supplierId`
2. Query mutation manda el payload al backend
3. Query invalida o actualiza queries relacionadas
4. Router navega al siguiente estado

## TanStack Table

### Razón principal para usarlo

Usa Table para el comportamiento de tablas: columnas, headers, rows, sorting, filtering, selección, paginación y render flexible.

### Cuándo usarlo

Úsalo cuando tienes datos tabulares que necesitan:

- columnas declarativas
- headers clickeables
- sorting/filtering
- paginación
- cells custom
- estado de tabla controlado

### Cómo funciona

Table no impone markup. Te da un modelo de tabla: columnas, header groups, row model y helpers para renderizar. Tú decides cómo se ve.

### Bloques principales para aprender

- column definitions
- row model
- header groups
- cell renderers
- sorting/filtering state
- pagination state

### Mejor caso de uso en este repo

La tabla de productos muestra records backend-backed y mantiene las señales de sort cerca del header.

### Regla más importante

Table debería controlar comportamiento de tabla, no ser dueño de datos remotos. Query trae los datos; Table los presenta.

### Mini ejemplo

Query devuelve productos. Table define columnas `product`, `category`, `price`, `stock`, `actions`. Router/URL puede seguir siendo dueño de sort y page.

## TanStack Virtual

### Razón principal para usarlo

Usa Virtual cuando tienes listas grandes y no quieres renderizar miles de nodos DOM. Renderiza solo lo visible y simula el espacio total.

### Cuándo usarlo

Úsalo cuando:

- hay cientos o miles de filas
- scroll se siente lento
- cada row cuesta renderizar
- necesitas mantener la UI fluida

### Cómo funciona

Virtual calcula qué items deberían estar visibles según el scroll, el tamaño estimado y el viewport. Tú renderizas esa ventana, no toda la lista.

### Bloques principales para aprender

- virtualizer
- scroll element
- estimated size
- virtual items
- total size
- absolute positioning o transform

### Mejor caso de uso en este repo

`/products/virtual` expande productos reales a una lista grande y deja que Virtual renderice solo las filas visibles.

### Regla más importante

Virtual no mejora datos pequeños. Úsalo cuando el costo DOM realmente importa.

### Mini ejemplo

Una lista de 1.000 productos puede mostrar unas 20 filas visibles. Virtual mantiene el scroll completo, pero React solo renderiza la ventana visible.

## TanStack DB

### Razón principal para usarlo

Usa TanStack DB para colecciones cliente reactivas, vistas derivadas y flujos optimistas más ricos. No es tu base de datos backend.

### Cuándo usarlo

Úsalo cuando necesitas:

- colecciones cliente con estado vivo
- queries derivadas sobre datos locales
- optimistic updates complejas
- sincronización con backend después de cambios locales

### Cómo funciona

DB mantiene colecciones en el cliente y permite que la UI derive vistas reactivas. El backend sigue siendo la fuente persistente; DB ayuda a modelar la experiencia cliente.

### Bloques principales para aprender

- collections
- live queries
- optimistic mutations
- sync strategy
- derived views

### Mejor caso de uso en este repo

`/products/db` muestra una colección cliente con actualizaciones optimistas de stock.

### Regla más importante

TanStack DB es una capa de datos cliente. No es Prisma, Postgres ni tu persistencia backend.

### Mini ejemplo

1. El usuario suma stock
2. La UI se actualiza al instante
3. El backend confirma después
4. Si falla, el estado puede reconciliarse

## TanStack Pacer

### Razón principal para usarlo

Usa Pacer para controlar timing de ejecución: debounce, throttle, rate limiting, queueing y batching.

### Cuándo usarlo

Úsalo cuando una función:

- se dispara demasiado seguido
- debe esperar a que el usuario deje de escribir
- debe limitar requests
- debe agrupar trabajo
- debe ejecutarse con una cadencia controlada

### Cómo funciona

Pacer envuelve o coordina funciones para que no corran en cada evento bruto. Es la capa de ritmo entre eventos frecuentes y acciones reales.

### Bloques principales para aprender

- debouncing
- throttling
- rate limiting
- queueing
- batching
- execution state

### Mejor caso de uso en este repo

La búsqueda de productos puede esperar un poco antes de actualizar la URL o disparar una nueva carga.

### Regla más importante

Pacer no decide qué datos traer. Solo decide cuándo ejecutar una acción.

### Mini ejemplo

El usuario escribe `keyboard`. Sin pacing podrías disparar muchos updates. Con debounce, solo actúas cuando el usuario pausa.

## TanStack Devtools

### Razón principal para usarlo

Usa Devtools para ver el sistema en vez de adivinarlo: rutas matcheadas, params, query keys, cache, stale state, refetches y mutaciones.

### Cuándo usarlo

Úsalo mientras desarrollas:

- cuando una ruta no matchea
- cuando search params no son lo esperado
- cuando una query no refresca
- cuando una mutación no invalida lo correcto
- cuando quieres inspeccionar cache y timing

### Cómo funciona

Devtools se conecta a Router y Query para exponer su estado interno en una UI de inspección.

### Bloques principales para aprender

- Router Devtools
- Query Devtools
- route tree
- matched routes
- query cache
- stale/fresh state
- mutations

### Mejor caso de uso en este repo

Abre Devtools mientras navegas entre `/products`, detalle, edit, virtual y DB. Mira cómo cambian rutas, search params y query keys.

### Regla más importante

No depures a ciegas. Si Router o Query ya pueden mostrarte el estado, mira ese estado primero.

### Mini ejemplo

Después de crear un producto, Query Devtools debería mostrar qué queries se invalidaron o refrescaron.

## TanStack CLI

### Razón principal para usarlo

Usa TanStack CLI para iniciar proyectos, scaffoldear piezas y mantener el setup alineado con el ecosistema.

### Cuándo usarlo

Úsalo cuando:

- creas una app nueva
- agregas tooling recomendado
- quieres partir de una plantilla oficial
- quieres reducir setup manual

### Cómo funciona

La CLI ejecuta comandos que generan estructura inicial o conectan herramientas del ecosistema.

### Bloques principales para aprender

- project creation
- templates
- integration scripts
- generated route tree
- dev/build commands

### Mejor caso de uso en este repo

Este repo sirve como playground ya armado. La CLI importa más cuando quieres crear otro proyecto desde cero.

### Regla más importante

La CLI ayuda a empezar, pero el aprendizaje real está en entender Router, Query, Form y el flujo de datos.

### Mini ejemplo

Cuando crees otro proyecto, usa la CLI para iniciar con el stack correcto y después compara su estructura con este playground.

## Guía Rápida de Comparación

### Start vs Router

- `Start` = framework full-stack
- `Router` = routing y estado URL
- Start usa Router, pero agrega servidor, SSR y bundling full-stack

### Router vs Query

- `Router` = dónde estoy y qué representa la URL
- `Query` = qué datos del backend debo traer y cachear para esta ruta

### Query vs DB

- `Query` = cache de server state
- `DB` = colecciones cliente reactivas y vistas optimistas más ricas

### Form vs Query

- `Form` = valores, validación y estado del formulario
- `Query` = mutaciones y cache de datos remotos

### Table vs Virtual

- `Table` = comportamiento tabular
- `Virtual` = performance de render para listas grandes

### Start/Nitro vs backend

- `Start` = framework de la app web
- `Nitro` = runtime/server layer usado por Start
- `backend/` = servicio real de lógica de negocio en este repo

```txt
Browser -> Start -> backend
```

## Qué Aprender Primero

Si estás aprendiendo con este proyecto, sigue este orden:

1. `Router`
   Entiende rutas, links, params y search params.
2. `Query`
   Entiende query keys, cache, loading/error y mutations.
3. `Form`
   Entiende validación y submit.
4. `Table`
   Entiende columnas y row models.
5. `Virtual`
   Entiende performance para listas grandes.
6. `DB`
   Entiende colecciones cliente y optimistic workflows.
7. `Pacer`
   Entiende timing y control de frecuencia.
8. `Start`
   Vuelve a Start para conectar todo con SSR, server routes y runtime.

## Docs Oficiales

- TanStack Start: https://tanstack.com/start
- TanStack Router: https://tanstack.com/router
- TanStack Query: https://tanstack.com/query
- TanStack Form: https://tanstack.com/form
- TanStack Table: https://tanstack.com/table
- TanStack Virtual: https://tanstack.com/virtual
- TanStack DB: https://tanstack.com/db
- TanStack Pacer: https://tanstack.com/pacer
