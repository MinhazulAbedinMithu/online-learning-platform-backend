# Level 2: Assignment 2 >>> Course Review

- #### Live Link: https://a3-course-review.vercel.app/

- #### Postman Collection: https://api.postman.com/collections/15158515-aa60cf63-0533-4fed-8931-adf7dbbccf77?access_key=PMAT-01HHJ3BJ8380ZQDP5QB29CWWSY

## Application routes:

base_url: https://a3-course-review.vercel.app

- 1. Create Course [POST]: base_url/api/create
- 2. Get all Courses [GET]: base_url/api/courses

  - filter: minPrice, maxPrice, tags, startDate, endDate, language, provider, durationInWeeks, and level
  - sort: sortBy: [
    'title',
    'price',
    'startDate',
    'endDate',
    'language',
    'durationInWeeks',
    ],
    sortOrder: 'asc || 'desc',
  - pagination.

- 3. Create Category [POST]: base_url/api/categories
- 4. Get All Category [GET]: base_url/api/categories
- 5. Create Review [POST]: base_url/api/reviews

- 6. Update Course. partial and dynamic [PATCH]: base_url/api/courses/courseId

- 7. Get Course by ID with Reviews [GET]: base_url/api/courses/:courseId/reviews
- 8. Get Best Course [GET]: base_url/api/course/best

## Instruction: Run application locally:

- download this project.
- install dependencies: npm install
- build application: npm run build
- run server: npm start
- Development server: npm run dev
