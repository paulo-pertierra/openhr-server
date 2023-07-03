import cronJob from 'node-cron';
import { createTime } from '../modules/time/time.service';

const EVERY_DAY_7AM = '0 7 * * *';

export const createDailyTimeRecord = () => {
  cronJob
    .schedule(EVERY_DAY_7AM, async () => {
      await createTime();
      console.log('New day started: Created daily-time-records for all users.');
    })
    .start();
};
