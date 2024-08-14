import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class UserClass extends Document {
    @Prop({ required: true })
    email: string;

    @Prop({ default: 'member' })
    role: string;

    @Prop({ required: true })
    name: string;

    @Prop({ default: 'active'})
    status: string
}

export const UserSchema = SchemaFactory.createForClass(UserClass);
