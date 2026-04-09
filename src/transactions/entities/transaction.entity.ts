import { Decimal } from '@prisma/client/runtime/client';
import type { Type } from '../../../generated/prisma/enums';

export class Transaction {
  id: number;
  user_id: number;
  type: Type;
  value: Decimal;
  category: string;
  date: Date;
  description?: string;
}
