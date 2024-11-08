import vine from "@vinejs/vine";

export const validateSignup = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(8),
});

export const validateSignupVerify = vine.object({
  email: vine.string().email(),
  otp: vine.string().maxLength(6).minLength(6),
});

export const validateLogin = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(8),
});
