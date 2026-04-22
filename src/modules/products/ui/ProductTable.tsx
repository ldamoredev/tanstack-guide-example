import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Link } from '@tanstack/react-router'
import {
  formatUsdCurrency,
  getLocalizedCategoryLabel,
  useI18n,
} from '#/lib/i18n'
import type { Product, ProductSortValue } from '../model/types'

interface ProductTableProps {
  data: Product[]
  activeSort: ProductSortValue
  onSortToggle: (key: 'name' | 'price' | 'stock') => void
}

export function ProductTable({
  data,
  activeSort,
  onSortToggle,
}: ProductTableProps) {
  const { copy, locale } = useI18n()
  const columns = [
    {
      accessorKey: 'name',
      header: () => (
        <SortHeader
          label={copy.products.table.header.product}
          sortKey="name"
          activeSort={activeSort}
          onToggle={() => onSortToggle('name')}
        />
      ),
      cell: ({ row }: { row: { original: Product } }) => (
        <Link
          to="/products/$productId"
          params={{ productId: row.original.id }}
          search={(prev) => prev}
          className="font-semibold text-[var(--sea-ink)] no-underline hover:text-[var(--lagoon-deep)]"
        >
          {row.original.name}
        </Link>
      ),
    },
    {
      accessorKey: 'sku',
      header: 'SKU',
    },
    {
      accessorKey: 'categoryId',
      header: copy.products.table.header.category,
      cell: ({ getValue }: { getValue: () => string }) =>
        getLocalizedCategoryLabel(getValue(), locale),
    },
    {
      accessorKey: 'price',
      header: () => (
        <SortHeader
          label={copy.products.table.header.price}
          sortKey="price"
          activeSort={activeSort}
          onToggle={() => onSortToggle('price')}
        />
      ),
      cell: ({ getValue }: { getValue: () => number }) =>
        formatUsdCurrency(getValue(), locale),
    },
    {
      accessorKey: 'stock',
      header: () => (
        <SortHeader
          label={copy.products.table.header.stock}
          sortKey="stock"
          activeSort={activeSort}
          onToggle={() => onSortToggle('stock')}
        />
      ),
      cell: ({ getValue }: { getValue: () => number }) => getValue(),
    },
    {
      id: 'actions',
      header: copy.products.table.header.actions,
      cell: ({ row }: { row: { original: Product } }) => (
        <Link
          to="/products/$productId"
          params={{ productId: row.original.id }}
          search={(prev) => prev}
          className="text-sm font-semibold text-[var(--lagoon-deep)] no-underline"
        >
          {copy.products.table.inspect}
        </Link>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <section className="island-shell mt-8 overflow-hidden rounded-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-4 py-4">
        <div>
          <p className="island-kicker mb-2">{copy.products.table.kicker}</p>
          <h2 className="m-0 text-lg font-semibold text-[var(--sea-ink)]">
            {copy.products.table.title}
          </h2>
        </div>
        <p className="lab-note m-0">{copy.products.table.note}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-[color-mix(in_oklab,var(--lagoon)_11%,var(--surface-strong))]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-b border-[var(--line)] px-4 py-3 text-left text-sm font-semibold text-[var(--sea-ink)]"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="odd:bg-[color-mix(in_oklab,var(--surface-strong)_92%,var(--lagoon)_8%)]
           even:bg-[color-mix(in_oklab,var(--surface)_95%,var(--lagoon)_5%)]"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-b border-[var(--line)] px-4 py-3 text-sm text-[var(--sea-ink-soft)]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="px-4 py-5 text-sm text-[var(--sea-ink-soft)]">
          {copy.products.table.empty}
        </div>
      )}
    </section>
  )
}

function SortHeader({
  label,
  sortKey,
  activeSort,
  onToggle,
}: {
  label: string
  sortKey: 'name' | 'price' | 'stock'
  activeSort: ProductSortValue
  onToggle: () => void
}) {
  const indicator = getSortIndicator(sortKey, activeSort)

  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-full border border-transparent bg-transparent px-1.5 py-1 text-left text-sm font-semibold text-[var(--sea-ink)] hover:border-[var(--line)]"
    >
      {label}
      <span className="text-xs text-[var(--sea-ink-soft)]">{indicator}</span>
    </button>
  )
}

function getSortIndicator(
  key: 'name' | 'price' | 'stock',
  currentSort: ProductSortValue,
) {
  if (currentSort === `${key}-asc`) {
    return '↑'
  }

  if (currentSort === `${key}-desc`) {
    return '↓'
  }

  return '↕'
}
