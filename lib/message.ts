import * as v from "valibot";

export const MESSAGE_LIMITS = {
  name: 150,
  email: 150,
  message: 500,
} as const;

export const MessageSchema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(3, "Name must be at least 3 characters."),
    v.maxLength(
      MESSAGE_LIMITS.name,
      `Name must be at most ${MESSAGE_LIMITS.name} characters.`,
    ),
  ),
  email: v.pipe(
    v.string(),
    v.email("Invalid email address"),
    v.maxLength(
      MESSAGE_LIMITS.email,
      `Email must be at most ${MESSAGE_LIMITS.email} characters.`,
    ),
  ),
  message: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(3, "Message must be at least 3 characters."),
    v.maxLength(
      MESSAGE_LIMITS.message,
      `Message must be at most ${MESSAGE_LIMITS.message} characters.`,
    ),
  ),
});

export type Message = v.InferOutput<typeof MessageSchema>;
