import { formOptions } from "@tanstack/react-form-nextjs";

export const MESSAGE_LIMITS = {
  name: 150,
  email: 150,
  message: 500,
} as const;

const MIN_LENGTH = 3;

const EMAIL_PATTERN =
  /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;

export const messageFormOptions = formOptions({
  defaultValues: {
    name: "",
    email: "",
    message: "",
  },
});

export function validateName(value: string): string | undefined {
  const name = value.trim();
  if (name.length < MIN_LENGTH) return "Name must be at least 3 characters.";
  if (name.length > MESSAGE_LIMITS.name)
    return `Name must be at most ${MESSAGE_LIMITS.name} characters.`;
  return undefined;
}

export function validateEmail(value: string): string | undefined {
  if (!EMAIL_PATTERN.test(value)) return "Invalid email address";
  if (value.length > MESSAGE_LIMITS.email)
    return `Email must be at most ${MESSAGE_LIMITS.email} characters.`;
  return undefined;
}

export function validateMessage(value: string): string | undefined {
  const message = value.trim();
  if (message.length < MIN_LENGTH)
    return "Message must be at least 3 characters.";
  if (message.length > MESSAGE_LIMITS.message)
    return `Message must be at most ${MESSAGE_LIMITS.message} characters.`;
  return undefined;
}
