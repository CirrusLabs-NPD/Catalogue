import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

/* { "Employees" : 
    { "name" : "string",
      "email" : "farhan.soomro@cirruslabs.io",
     "Picture" "url_string",
     "Title" : "string",
     "Tech Stack" : "[array]",
    "Projects" : [resume mining, cirrusinsights],
     } */

@Schema()
export class MemberClass extends Document {
    @Prop({ required: true})
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    title: string;

    @Prop({ type: [String], required: true }) 
    techStack: string[];

    @Prop({ type: [String], required: true }) 
    projects: string[];
}

export const MemberSchema = SchemaFactory.createForClass(MemberClass);
