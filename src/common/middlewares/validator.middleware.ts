import { Request, Response, NextFunction } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

export const validate = (validationParams: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    await Promise.all(validationParams.map(validation => validation.run(req)));

    const errorsValidations = validationResult(req);
    const error = (errorsValidations.array() as [])
      .map(({ msg }) => (msg));

    if (!errorsValidations.isEmpty()) {
      return res.status(422).json({
        message: 'Información inválida',
        error
      });
    }

    next();
  };
};
