import { PipelineStage } from 'mongoose';
import { TCourse, TTag } from './course.interface';
import CourseModel from './course.model';
import ReviewModel from '../review/review.model';
import AppError from '../../error/AppError';
import { UserModel } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createCourse = async (payload: Partial<TCourse>) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getAllCourses = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(CourseModel.find(), query)
    .search(['title'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  const meta = await courseQuery.countTotal();

  return {
    meta,
    result,
  };
};

const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const { tags, startDate, endDate, details, ...courseRemains } = payload;

  const modifiedData: Record<string, unknown> = {
    startDate,
    endDate,
    ...courseRemains,
  };
  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedData[`details.${key}`] = value;
    }
  }
  // modifiedData.durationInWeeks = calculateCourseDuration(
  //   startDate as string,
  //   endDate as string,
  // );

  const updatedCoursewithOutTags = await CourseModel.findByIdAndUpdate(
    id,
    modifiedData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (tags && tags.length > 0) {
    // Get Deleted payload tag names in array.
    const deletedTagsInPayload = tags
      .filter((tag: TTag) => tag?.isDeleted === true)
      ?.map((tag: TTag) => tag.name);

    // Filter new added tags from payload tags
    const newTagsInPayload = tags.filter(
      (tag: TTag) => tag.isDeleted === false,
    );

    // Existing tags in db after filtering not deleted tags in payload
    const existTagsInDb = (updatedCoursewithOutTags as TCourse)?.tags?.filter(
      (tag: TTag) =>
        !deletedTagsInPayload?.find(
          (tagName: string) => tag.name === tagName,
        ) && tag,
    );
    const newModifiedData = {
      tags: [...existTagsInDb, ...newTagsInPayload],
    };

    const fullUpdatedCourse = await CourseModel.findByIdAndUpdate(
      id,
      newModifiedData,
      {
        new: true,
        runValidators: true,
      },
    ).populate('createdBy', '-password');

    return fullUpdatedCourse;
  }

  return updatedCoursewithOutTags;
};

const getSingleCourseWithReviews = async (courseId: string) => {
  const retrievedCourse = await CourseModel.findOne({ _id: courseId });
  if (!retrievedCourse) {
    throw new AppError(404, 'Course not Found !!!');
  }
  const retrievedReviews = await ReviewModel.find({ courseId });

  if (!retrievedReviews) {
    throw new Error('Failed to retrieved Course with reviews');
  }

  return {
    course: retrievedCourse,
    reviews: retrievedReviews,
  };
};

const getBestCourseBasedOnReviews = async () => {
  // const retrievedCourse = await CourseModel.find({});
  const bestCourseReview = await ReviewModel.aggregate([
    // stage-1
    {
      $group: {
        _id: '$courseId',
        sumOfRatings: { $sum: '$rating' },
        numOfRatings: { $sum: 1 },
      },
    },
    //stage-2 : average Rating calculation and output format
    // averageRating calculation: sum of all ratings divided by number of ratings/reviews.
    {
      $project: {
        averageRating: {
          $divide: ['$sumOfRatings', '$numOfRatings'],
        },
        reviewCount: '$numOfRatings',
      },
    },

    // stage-3 : sort data based on average rating and number of reviews.
    {
      $sort: {
        averageRating: -1,
        reviewCount: -1,
      },
    },

    // stage-4 : get first course, which average rating and number of reviews is maximum.
    // {
    //   $limit: 1,
    // },

    {
      $lookup: {
        from: 'User',
        localField: 'createdBy',
        foreignField: '_id',
        as: 'createdBy',
      },
    },

    // Stage-6: Unwind 'createdByUser' array created by $lookup
    {
      $unwind: {
        path: '$createdBy',
      },
    },
  ]);
  if (!bestCourseReview) {
    throw new AppError(400, 'Failed to retrieved Course with reviews');
  }
  const retrievedCourse = await CourseModel.findOne({
    _id: bestCourseReview[0]?._id,
  });

  if (!retrievedCourse) {
    throw new AppError(400, 'Failed to retrieved Course with reviews');
  }

  return {
    course: retrievedCourse,
    averageRating: bestCourseReview[0]?.averageRating,
    reviewCount: bestCourseReview[0]?.reviewCount,
  };
};

export const courseServices = {
  createCourse,
  getAllCourses,
  updateCourse,
  getSingleCourseWithReviews,
  getBestCourseBasedOnReviews,
};
