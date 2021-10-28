import mongoose, { Schema, Document } from "mongoose";


// Role 0 = User, 100 = Admin
export interface IUser extends Document {
    name: string,
    email: string,
    role: number,
    salt: string,
    password: string,
    token: string,
    is_active: boolean,

    updatedAt: mongoose.Schema.Types.Date,
    createdAt: mongoose.Schema.Types.Date,

    isAdmin: () => boolean,
}

const userSchema = new Schema({
    name: { type: String, unique: true, required: true},
    email: {type: String, required: true, unique: true},
    role: {type: Number, default: 0},
    salt: {type: String, required: true, select: false},
    password: { type: String, required: true, select: false },
    token: { type: String, unique: true, required: true, select: false},
    is_active: { type: Boolean, select: false, default: false},
},
{
    timestamps: true
});

userSchema.methods.isAdmin = function(this: IUser): boolean {
    return this.role == 100;
}

export const User = mongoose.model<IUser>("user", userSchema);
