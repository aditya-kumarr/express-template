import vine from "@vinejs/vine";

export const forgotPasswordRequestValidation = vine.object({
  email: vine.string().email().trim().toLowerCase(),
});

export const forgotPasswordVerificationValidation = vine.object({
  email: vine.string().email().trim().toLowerCase(),
  otp: vine.string().maxLength(6).minLength(6),
});

export const forgotPasswordChangeValidation = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(8),
});
