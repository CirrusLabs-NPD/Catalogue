import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ProjectClass extends Document {
    @Prop({unique : true, required : true})
    name : string;
    
    @Prop({required : true})
    owner: string;
    
    @Prop({required : true})
    url: string;
    
    @Prop({required : true})
    status: string;

    @Prop({required : true})
    duration: string;
    
    @Prop({required : true})
    members: string[];
    
    @Prop({required : true})
    description: string;
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectClass);