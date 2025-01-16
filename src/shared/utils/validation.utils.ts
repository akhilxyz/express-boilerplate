import { ResponseUtil } from "./response.util";
import { validate } from 'class-validator';

// validationUtils.ts
export async function validateErrors(dto: any, res: any) {
    const errors: any = await validate(dto);
    if (errors.length > 0) {
      ResponseUtil.error(res, errors);
      return true; // Indicating that errors were found and handled
    }
    return false; // No errors found
  }
  