import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ProjectStatus extends Document {
    @Prop({ unique: true, required: true })
    projectStatus: string;
}

export const ProjectStatusSchema = SchemaFactory.createForClass(ProjectStatus);
