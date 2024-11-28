import { z } from 'zod';
import { days } from './offeredCourse.constant';

const createOfferedCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string({
      required_error: 'Registered semester is required.',
    }),

    academicFaculty: z.string({
      required_error: 'Academic faculty is required.',
    }),

    academicDepartment: z.string({
      required_error: 'Academic department is required.',
    }),

    course: z.string({
      required_error: 'Course is required.',
    }),

    faculty: z.string({
      required_error: 'Faculty is required.',
    }),

    section: z
      .string({
        required_error: 'Section is required.',
      })
      .min(1, { message: 'Section cannot be empty.' })
      .trim(),

    studentCapacity: z
      .number({
        required_error: 'Student capacity is required.',
      })
      .min(20, { message: 'Student capacity must be at least 20.' }),

    classSchedule: z.array(
      z.enum([...days] as [string, ...string[]], {
        message: 'Class schedule is required.',
      }),
    ),

    startTime: z
      .string({
        required_error: 'Start time is required.',
      })
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Start time must be in HH:mm format.',
      }),

    endTime: z
      .string({
        required_error: 'End time is required.',
      })
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'End time must be in HH:mm format.',
      }),
  }).refine(
    (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
    },
    {
        message: 'Start time should be before End time!'
    }
  ),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string().optional(),

    section: z.string().optional(),

    studentCapacity: z.number().optional(),

    classSchedule: z.array(
      z.enum([...days] as [string, ...string[]], {
        message: 'Class schedule is required.',
      }),
    ).optional(),

    startTime: z
      .string({
        required_error: 'Start time is required.',
      })
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Start time must be in HH:mm format.',
      }).optional(),

    endTime: z
      .string({
        required_error: 'End time is required.',
      })
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'End time must be in HH:mm format.',
      }).optional(),
  }).refine(
    (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
    },
    {
        message: 'Start time should be before End time!'
    }
  )
});

export const OfferedCourseValidation = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
