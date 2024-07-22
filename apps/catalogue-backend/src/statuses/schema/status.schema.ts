import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class StatusClass extends Document {
    @Prop({ unique: true, required: true })
    projectStatus: string;
}

export const StatusSchema = SchemaFactory.createForClass(StatusClass);
