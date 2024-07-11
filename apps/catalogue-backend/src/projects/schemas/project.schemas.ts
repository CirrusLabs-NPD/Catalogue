import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProjectStatus } from './project-status.enum';

@Schema()
export class ProjectClass extends Document {
    @Prop({ unique: true, required: true })
    projectName: string;
    
    @Prop({ required: true })
    duration: string;
    
    @Prop({ required: true })
    gitHubLinks: string;
    
    @Prop({ required: true })
    technology: string;
    
    @Prop({ required: true })
    otherTechnology: string;
    
    @Prop({ required: true, enum: ProjectStatus })
    projectStatus: string;
    
    @Prop({ required: true })
    members: string[];
    
    @Prop({ required: true })
    description: string;

    @Prop({ required: true, min: 0, max: 100 })
    progressPercent: number;

    @Prop({ required: false })
    completionDate: string;
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectClass);
