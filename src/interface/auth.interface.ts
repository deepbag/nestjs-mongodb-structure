import { Document } from 'mongoose';

export interface _Iauthinterface extends Document {
  readonly email: string;
  readonly password: string;
}
