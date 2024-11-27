import { TSchedules } from "./offeredCourse.interface";

export const hasTimeConflict = (assignedSchedules: TSchedules[], newSchedule: TSchedules) => {

    for(const schedule of assignedSchedules){
        const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
        const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
        const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
        const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);

        if(newStartTime < existingEndTime && newEndTime > existingStartTime){
            return true;
        }
    }

    return false;

}