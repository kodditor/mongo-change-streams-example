import { Schema, SchemaTypes, model } from "mongoose";
import { ActionTypesEnum, ActionsEnum } from ".";

export const AuthorSchema = new Schema({
    _id: {
        type: SchemaTypes.ObjectId,
    },
    authorName: {
        type: SchemaTypes.String,
        required: true,
    },
    createdAt: {
        type: SchemaTypes.Date,
        required: true,
    },
    lastUpdatedData: new Schema({
        user: {
            type: SchemaTypes.String,
            required: true,
        },
        action: {
            type: SchemaTypes.String,
            enum: ActionsEnum,
        },
        actionType: {
            type: SchemaTypes.String,
            enum: ActionTypesEnum,
            required: true,
        },
        description: {
            type: SchemaTypes.String,
            required: true,
        },
    }),
    lastUpdatedMeta: new Schema({
        ipAddress: {
            type: SchemaTypes.String,
            required: true,
        },
        userAgent: {
            type: SchemaTypes.String,
            required: true,
        },
        origin: {
            type: SchemaTypes.String,
            required: true,
        },
        timestamp: {
            type: SchemaTypes.Date,
            required: true,
        }
    })
})
export const AuthorModel = model('authors', AuthorSchema);