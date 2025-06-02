import relativePlugin from 'dayjs/plugin/relativeTime';
import updateLocal from 'dayjs/plugin/updateLocale';
import dayjs from 'dayjs';

dayjs.extend(relativePlugin);
dayjs.extend(updateLocal);
dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'now',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1M',
    MM: '%dM',
    y: '1y',
    yy: '%dy',
  },
});

export const relativeTime = (date: string) => dayjs(date).fromNow(true);

export default relativeTime;
