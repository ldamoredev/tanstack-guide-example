import type React from 'react'
import { useForm } from '@tanstack/react-form'
import {
  isProductFormValid,
  PRODUCT_FORM_CATEGORY_OPTIONS,
  PRODUCT_FORM_SUPPLIER_OPTIONS,
  toProductFormSubmitValue,
  type ProductFormValues,
  validateProductFormValue,
} from '../model/form'

interface ProductFormProps {
  defaultValues: ProductFormValues
  submitLabel: string
  onSubmit: (input: ReturnType<typeof toProductFormSubmitValue>) => Promise<void>
}

export function ProductForm({
  defaultValues,
  submitLabel,
  onSubmit,
}: ProductFormProps) {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      await onSubmit(toProductFormSubmitValue(value))
    },
  })

  return (
    <form
      className="grid gap-5"
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        void form.handleSubmit()
      }}
    >
      <FieldGroup
        title="Identity"
        description="Define the record name and the SKU that anchors this product in the inspection grid."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ProductTextField form={form} name="name" label="Name" />
          <ProductTextField form={form} name="sku" label="SKU" />
        </div>
      </FieldGroup>

      <FieldGroup
        title="Inventory"
        description="Control the price and stock values that surface in the control room."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ProductTextField
            form={form}
            name="price"
            label="Price"
            type="number"
            inputMode="decimal"
          />
          <ProductTextField
            form={form}
            name="stock"
            label="Stock"
            type="number"
            inputMode="numeric"
          />
        </div>
      </FieldGroup>

      <FieldGroup
        title="Relationships"
        description="Attach the product to the category and supplier context used across the detail route."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ProductSelectField
            form={form}
            name="categoryId"
            label="Category"
            options={PRODUCT_FORM_CATEGORY_OPTIONS}
          />
          <ProductSelectField
            form={form}
            name="supplierId"
            label="Supplier"
            options={PRODUCT_FORM_SUPPLIER_OPTIONS}
          />
        </div>
      </FieldGroup>

      <form.Subscribe
        selector={(state) => [
          isProductFormValid(state.values),
          state.isSubmitting,
          state.isPristine,
        ]}
        children={([isValid, isSubmitting, isPristine]) => (
          <div className="island-shell rounded-2xl p-5">
            <p className="island-kicker mb-2">Mutation status</p>
            <p className="mb-4 text-sm leading-7 text-[var(--sea-ink-soft)]">
              Validation runs in TanStack Form before the mutation is allowed to
              leave this workspace.
            </p>
            <button
              type="submit"
              disabled={!isValid || isPristine || isSubmitting}
              className="lab-button disabled:pointer-events-none disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : submitLabel}
            </button>
          </div>
        )}
      />
    </form>
  )
}

function FieldGroup({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="feature-card rounded-2xl p-5">
      <p className="island-kicker mb-2">{title}</p>
      <h2 className="mt-0 mb-2 text-lg font-semibold text-[var(--sea-ink)]">
        {title}
      </h2>
      <p className="mt-0 mb-4 text-sm leading-7 text-[var(--sea-ink-soft)]">
        {description}
      </p>
      {children}
    </section>
  )
}

function ProductTextField({
  form,
  name,
  label,
  type = 'text',
  inputMode,
}: {
  form: any
  name: 'name' | 'sku' | 'price' | 'stock'
  label: string
  type?: React.HTMLInputTypeAttribute
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
}) {
  return (
    <form.Field
      name={name}
      children={(field: any) => (
        <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--sea-ink)]">
          {label}
          <input
            aria-label={label}
            type={type}
            inputMode={inputMode}
            value={String(field.state.value ?? '')}
            onBlur={() => {
              field.handleBlur()
              field.handleChange(field.state.value)
            }}
            onChange={(event) => field.handleChange(event.target.value)}
            className="rounded-xl border border-[var(--line)] bg-white/70 px-4 py-3 text-sm font-normal text-[var(--sea-ink)] outline-none"
          />
          <FieldErrors
            error={validateProductFormValue(name, String(field.state.value ?? ''))}
            touched={field.state.meta.isTouched}
          />
        </label>
      )}
    />
  )
}

function ProductSelectField({
  form,
  name,
  label,
  options,
}: {
  form: any
  name: 'categoryId' | 'supplierId'
  label: string
  options: ReadonlyArray<{ value: string; label: string }>
}) {
  return (
    <form.Field
      name={name}
      children={(field: any) => (
        <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--sea-ink)]">
          {label}
          <select
            aria-label={label}
            value={String(field.state.value ?? '')}
            onBlur={() => {
              field.handleBlur()
              field.handleChange(field.state.value)
            }}
            onChange={(event) => field.handleChange(event.target.value)}
            className="rounded-xl border border-[var(--line)] bg-white/70 px-4 py-3 text-sm font-normal text-[var(--sea-ink)] outline-none"
          >
            <option value="">Select {label.toLowerCase()}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldErrors
            error={validateProductFormValue(name, String(field.state.value ?? ''))}
            touched={field.state.meta.isTouched}
          />
        </label>
      )}
    />
  )
}

function FieldErrors({
  error,
  touched,
}: {
  error?: string
  touched?: boolean
}) {
  if (!touched || !error) {
    return null
  }

  return <span className="text-xs text-[var(--signal-danger)]">{error}</span>
}
