/* eslint-disable @typescript-eslint/no-explicit-any */
import vine from "@vinejs/vine";
import type { SchemaTypes, Infer } from "@vinejs/vine/types";

import type { Request, Response, NextFunction } from "express";

export async function validateBody<T extends SchemaTypes>(
  schema: T,
  validate: any,
): Promise<{
  data?: Infer<T>;
  error: string[];
}> {
  try {
    const validator = vine.compile(schema);
    const payload = await validator.validate(validate);
    return { data: payload, error: [] };
  } catch (error: any) {
    return {
      error: error.messages.map((e: any) => {
        return e.message;
      }),
    };
  }
}

export function bodyValidator<T extends SchemaTypes>(schema: T) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request<unknown, unknown, Infer<T>>,
      res: Response,
      next: NextFunction,
    ) {
      const { error, data } = await validateBody(schema, req.body);
      if (error.length > 0) console.log(error);
      if (!data || error.length > 0) {
        return res.status(422).json({ message: error });
      }

      req.body = data as typeof data; // Make req.body type-safe
      return originalMethod.apply(this, [req, res, next]);
    };

    return descriptor;
  };
}
export function paramsValidator(schema: SchemaTypes) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      const { error, data } = await validateBody(schema, req.params);
      if (!data || error.length > 0)
        return res.status(422).json({ message: error });
      req.params = data as typeof data; // Make req.body type-safe
      return originalMethod.apply(this, [req, res, next]);
    };

    return descriptor;
  };
}

export function queryValidator(schema: SchemaTypes) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      const { error, data } = await validateBody(schema, req.query);
      if (!data || error.length > 0)
        return res.status(422).json({ message: error });
      req.query = data as typeof data; // Make req.body type-safe
      return originalMethod.apply(this, [req, res, next]);
    };

    return descriptor;
  };
}
