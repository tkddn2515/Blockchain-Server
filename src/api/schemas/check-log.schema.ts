import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CheckLogDocument = CheckLog & Document;

@Schema()
export class CheckLog {
  @Prop({ type: Object})
  body: object;
}

export const CheckLogSchema = SchemaFactory.createForClass(CheckLog);