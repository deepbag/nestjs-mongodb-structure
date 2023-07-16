import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type user_document = HydratedDocument<auth>;

@Schema({ timestamps: true })
export class auth {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const authschema = SchemaFactory.createForClass(auth);
