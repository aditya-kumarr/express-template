import vine from "@vinejs/vine";

export const validateSignup = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(8),
});

export const validateLogin = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(8),
});
