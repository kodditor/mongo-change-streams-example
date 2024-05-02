import { Schema, SchemaTypes, model } from "mongoose";
import { ActionTypesEnum, ActionsEnum } from ".";

export const LogSchema = new Schema({
    _id: {
        type: SchemaTypes.ObjectId,
    },
    item: {
        type: SchemaTypes.ObjectId,
        required: true,     
    },
    itemType: {
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
    operationType: {
        type: SchemaTypes.String,
        required: true,
    },
    user: {
        type: SchemaTypes.ObjectId,
        required: true,
    },
    changes: {
        type: SchemaTypes.Mixed,
        default: null
    },
    createdAt: {
      type: SchemaTypes.Date,
    },
    description: {
        type: SchemaTypes.String,
        required: true,
    },
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
        },
        resumeToken: {
            type: SchemaTypes.Mixed,
            required: true,
        },
    })
})

export const LogModel = model('logs', LogSchema);
