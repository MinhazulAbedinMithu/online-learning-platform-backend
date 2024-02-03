import { Schema, model } from 'mongoose';
import {
  TCourse,
  TDetails,
  TInstructor,
  TMilestone,
  TModule,
  TTag,
} from './course.interface';

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
const instructorSchema = new Schema<TInstructor>({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  designation: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
  },
});
const moduleSchema = new Schema<TModule>({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Live Class', 'Assignment', 'Test', 'Support Class'],
    required: true,
  },
});
const milestoneSchema = new Schema<TMilestone>({
  title: {
    type: String,
    required: true,
  },
  modules: {
    type: [moduleSchema],
    required: true,
  },
});
const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'title is Required'],
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
    },
    details: {
      type: detailSchema,
      required: [true, 'course details is Required'],
    },
    thumbnail: {
      type: String,
      required: true,
    },
    sits: {
      type: Number,
      required: true,
    },
    promo: {
      type: String,
    },
    instructor: {
      type: [instructorSchema],
      required: true,
    },
    requirements: [String],
    benifits: [String],
    studyPlan: {
      type: [milestoneSchema],
      required: true,
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
