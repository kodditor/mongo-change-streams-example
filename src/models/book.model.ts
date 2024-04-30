import { Schema, SchemaTypes, model } from "mongoose";
import { ActionTypesEnum, ActionsEnum } from ".";

export const BookSchema = new Schema({
    _id: {
        type: SchemaTypes.ObjectId,
    },
    title: {
        type: SchemaTypes.String,
        required: true,
    },
    publisher: {
        type: SchemaTypes.String,
        required: true,
    },
    author: {
        type: SchemaTypes.String,
        required: true,
        ref: 'authors'
    },
    createdAt: {
        type: SchemaTypes.Date,
        required: true,
    },
    lastUpdatedData: new Schema({
        user: {
            type: SchemaTypes.ObjectId,
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
        userAddress: {
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
export const BookModel = model('books', BookSchema);