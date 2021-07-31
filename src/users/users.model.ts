import { Document, Schema } from "mongoose";

export const UserSchema = new Schema({
    username: { type: String, required: true, uinique: true },
    password: { type: String, required: true }
})
export interface User extends Document {
    id: string,
    username: string,
    password: string
}