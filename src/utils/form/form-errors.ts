import { z } from "zod";

export const zodFieldValidator =
  <T extends z.ZodTypeAny>(schema: T) =>
  ({ value }: { value: z.input<T> }) => {
    const result = schema.safeParse(value);
    return result.success ? undefined : result.error.issues[0]?.message;
  };

export function getFormErrorMessage(error: unknown): string | undefined {
  if (typeof error === "string") return error;

  if (error && typeof error === "object" && "message" in error) {
    const message = error.message;
    if (typeof message === "string") {
      return message;
    }
  }

  return undefined;
}

type FieldMetaLike = {
  isBlurred?: boolean;
  isDirty?: boolean;
  errorMap?: {
    onChange?: unknown;
    onChangeAsync?: unknown;
    onBlur?: unknown;
    onBlurAsync?: unknown;
    onSubmit?: unknown;
    onServer?: unknown;
  };
};

type DisplayedFieldErrorOptions = {
  initiallyFilled: boolean;
};

export function getDisplayedFieldError(
  meta: FieldMetaLike,
  options: DisplayedFieldErrorOptions,
): string | undefined {
  const changeError =
    getFormErrorMessage(meta.errorMap?.onChange) ??
    getFormErrorMessage(meta.errorMap?.onChangeAsync);

  const blurError =
    getFormErrorMessage(meta.errorMap?.onBlur) ??
    getFormErrorMessage(meta.errorMap?.onBlurAsync);

  const submitError =
    getFormErrorMessage(meta.errorMap?.onSubmit) ??
    getFormErrorMessage(meta.errorMap?.onServer);

  if (options.initiallyFilled) {
    if (meta.isDirty) {
      return changeError;
    }

    if (meta.isBlurred) {
      return blurError ?? changeError;
    }

    return submitError;
  }

  if (meta.isDirty) {
    return changeError;
  }

  if (!meta.isBlurred) {
    return submitError;
  }

  return blurError ?? changeError;
}
