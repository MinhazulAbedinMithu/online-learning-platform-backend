import { Types } from 'mongoose';

export type TTag = {
  name: string;
  isDeleted: boolean;
};
export type TDetails = { level: string; description: string };
export type TInstructor = {
  photo: string;
  name: string;
  designation: string;
  organization: string;
};

export type TModuleType =
  | 'Live Class'
  | 'Assignment'
  | 'Test'
  | 'Support Class';

export type TModule = {
  title: string;
  type: TModuleType;
  src: string;
};
export type TMilestone = {
  title: string;
  modules: TModule[];
};

export type TCourse = {
  title: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: TTag[];
  startDate: string;
  endDate: string;
  schedule: string;
  details: TDetails;
  thumbnail: string;
  sits?: number;
  promo?: string;
  instructor: TInstructor[];
  requirements: string[];
  benifits: string[];
  studyPlan: TMilestone[];
  createdBy: Types.ObjectId;
  isDeleted: boolean;
};
