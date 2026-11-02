// Small helpers shared by the admin Server Actions.

export type FormState = { message: string; ok?: boolean };

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const datePattern = /^\d{4}-\d{2}-\d{2}$/;

export const text = (formData: FormData, name: string) => String(formData.get(name) ?? "").trim();

export const order = (formData: FormData) => {
  const n = Number.parseFloat(text(formData, "order"));
  return Number.isFinite(n) ? n : 999;
};

// An uploaded file from the form, or null when the field was left empty
export const file = (formData: FormData, name: string) => {
  const value = formData.get(name);
  return value instanceof File && value.size > 0 ? value : null;
};

export function failure(error: unknown): FormState {
  return { message: error instanceof Error ? error.message : "Could not save. Please try again." };
}
