import type React from 'react'
import { useForm } from '@tanstack/react-form'
import {
  getLocalizedCategoryLabel,
  getLocalizedProductFormError,
  getLocalizedSupplierLabel,
  useI18n,
} from '#/lib/i18n'
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
  const { copy } = useI18n()
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
        title={copy.products.form.sections.identity}
        description={copy.products.form.sections.identityDescription}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ProductTextField form={form} name="name" label={copy.products.form.labels.name} />
          <ProductTextField form={form} name="sku" label="SKU" />
        </div>
      </FieldGroup>

      <FieldGroup
        title={copy.products.form.sections.inventory}
        description={copy.products.form.sections.inventoryDescription}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ProductTextField
            form={form}
            name="price"
            label={copy.products.form.labels.price}
            type="number"
            inputMode="decimal"
          />
          <ProductTextField
            form={form}
            name="stock"
            label={copy.products.form.labels.stock}
            type="number"
            inputMode="numeric"
          />
        </div>
      </FieldGroup>

      <FieldGroup
        title={copy.products.form.sections.relationships}
        description={copy.products.form.sections.relationshipsDescription}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <ProductSelectField
            form={form}
            name="categoryId"
            label={copy.products.form.labels.category}
            options={PRODUCT_FORM_CATEGORY_OPTIONS}
          />
          <ProductSelectField
            form={form}
            name="supplierId"
            label={copy.products.form.labels.supplier}
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
            <p className="island-kicker mb-2">{copy.products.form.mutationStatus}</p>
            <p className="mb-4 text-sm leading-7 text-[var(--sea-ink-soft)]">
              {copy.products.form.mutationDescription}
            </p>
            <button
              type="submit"
              disabled={!isValid || isPristine || isSubmitting}
              className="lab-button disabled:pointer-events-none disabled:opacity-50"
            >
              {isSubmitting ? copy.products.form.saving : submitLabel}
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
  const { locale } = useI18n()
  return (
    <form.Field
      name={name}
      children={(field: any) => (
        <label className="lab-field-label">
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
            className="lab-field"
          />
          <FieldErrors
            error={getLocalizedProductFormError(
              validateProductFormValue(name, String(field.state.value ?? '')),
              locale,
            )}
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
  const { copy, locale } = useI18n()
  return (
    <form.Field
      name={name}
      children={(field: any) => (
        <label className="lab-field-label">
          {label}
          <div className="lab-select-wrap">
            <select
              aria-label={label}
              value={String(field.state.value ?? '')}
              onBlur={() => {
                field.handleBlur()
                field.handleChange(field.state.value)
              }}
              onChange={(event) => field.handleChange(event.target.value)}
              className="lab-field lab-field--select"
            >
              <option value="">{copy.products.form.selectPrompt(label)}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {name === 'categoryId'
                    ? getLocalizedCategoryLabel(option.value, locale)
                    : getLocalizedSupplierLabel(option.value)}
                </option>
              ))}
            </select>
          </div>
          <FieldErrors
            error={getLocalizedProductFormError(
              validateProductFormValue(name, String(field.state.value ?? '')),
              locale,
            )}
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
