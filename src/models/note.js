import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: false,
      trim: true,
      default: '',
    },
    tag: {
      type: String,
      required: false,
      trim: true,
      enum: TAGS,
      index: true,
      default: 'Todo',
    },
  },
  { timestamps: true },
);

export const Note = model('Note', noteSchema, 'notes');
