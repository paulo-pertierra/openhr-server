import * as dateFns from 'date-fns';
import { TimeSchemaDataObj } from './time.types';

export function timingEngine(timeOverride: Date): string {
  const currentTime = timeOverride;

  const timeInAmWindow = {
    start: new Date().setHours(7),
    end: new Date().setHours(9)
  };
  if (dateFns.isWithinInterval(currentTime, timeInAmWindow)) {
    return 'timeInAm'
  }

  const timeOutAmWindow = {
    start: new Date().setHours(9, 1),
    end: new Date().setHours(12, 15)
  };
  if (dateFns.isWithinInterval(currentTime, timeOutAmWindow)) {
    return 'timeOutAm'
  }

  const timeInPmWindow = {
    start: new Date().setHours(12, 30),
    end: new Date().setHours(13, 30)
  };
  if (dateFns.isWithinInterval(currentTime, timeInPmWindow)) {
    return 'timeInPm'
  }

  const timeOutPmWindow = {
    start: new Date().setHours(13, 31),
    end: new Date().setHours(17)
  };
  if (dateFns.isWithinInterval(currentTime, timeOutPmWindow)) {
    return 'timeOutPm'
  }

  throw new Error('Invalid time input. Reason: out of range.');
}

// AM
// 7:00 - 9:00 Time In window
// 9:01 - 12:00 Time Out window

// PM
//12:30 - 1:30 Time In Window
//1:31 - 5:00 Time Out Window
