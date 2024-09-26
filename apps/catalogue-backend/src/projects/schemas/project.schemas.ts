import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MemberClass } from '../../members/schemas/member.schema';

@Schema()
export class ProjectClass extends Document {
    @Prop({ required: true })
    projectName: string;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    gitHubLinks: string;

    @Prop({ type: [String], required: true })
    technology: string[];

    @Prop({ type: [String] })
    resources: string[];

    @Prop({ required: true })
    projectStatus: string;

    @Prop({ required: true })
    projectManager: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'MemberClass' }] })
    members: MemberClass[];

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    progressPercent: number;

    @Prop({ required: true })
    demoURL: string;

    @Prop()
    completionDate?: Date;

    @Prop({ default: null })
    deletionRequestedDate?: Date;

    @Prop({ required: true, default: 'Active' })  
    status: string;

    @Prop({ type: String, required: false })
    readmeFile?: string;  
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectClass);
