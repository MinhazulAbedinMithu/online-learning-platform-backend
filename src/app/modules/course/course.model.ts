import { Schema, model } from 'mongoose';
import { TCourse, TDetails, TTag } from './course.interface';

const tagSchema = new Schema<TTag>({
  name: {
    type: String,
    unique: true,
    requied: [true, 'tag name is Required'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
const detailSchema = new Schema<TDetails>({
  level: {
    type: String,
    required: [true, 'course level is Requied'],
  },
  description: {
    type: String,
    required: [true, 'course description is Required'],
  },
});
const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'title is Required'],
    },
    instructor: {
      type: String,
      required: [true, 'instructor is Required'],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: [true, 'categoryId is Required'],
      ref: 'Category',
    },
    price: {
      type: Number,
      required: [true, 'price is Required'],
    },
    tags: {
      type: [tagSchema],
    },
    startDate: {
      type: String,
      required: [true, 'startDate is Required'],
    },
    endDate: {
      type: String,
      required: [true, 'endDate is Required'],
    },
    language: {
      type: String,
    },
    provider: {
      type: String,
      required: [true, 'provider is Required'],
    },
    durationInWeeks: {
      type: Number,
    },
    details: {
      type: detailSchema,
      required: [true, 'course details is Required'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const CourseModel = model<TCourse>('Course', courseSchema);
export default CourseModel;
