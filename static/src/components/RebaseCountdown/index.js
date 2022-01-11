import Countdown from 'react-countdown';
import CronParser from 'cron-parser';
import { Text } from 'theme-ui';
import { timeDifference } from '../../lib/DateHelper';

function timeString(hours, minutes, seconds) {
  const showSeconds = hours <= 0 && minutes < 5;
  const minuteAmount = hours > 0 ? `${minutes || 0}` : minutes > 0 ? `${minutes}` : '';
  const minuteUnit = minuteAmount !== '' ? ` Min${minutes !== 1 ? 's' : ''}` : '';

  return `
    ${hours > 0 ? `${hours} Hour${hours > 1 ? 's' : ''},` : ''}
    ${`${minuteAmount}${minuteUnit}${showSeconds ? ', ' : ``}`}
    ${showSeconds ? `${seconds} Seconds` : ''} to Next Rebase
  `;
}

function RebaseCountdown({ rebaseCron, variant }) {
  const rebaseInterval = CronParser.parseExpression(rebaseCron || '0 6,14,22 * * *');
  const nextRebaseTime = rebaseInterval.next();

  const timeDiff = timeDifference(nextRebaseTime, new Date());
  let countdown;
  if(timeDiff.hours > 0 || timeDiff.minutes > 5)
    countdown = (
      <Text variant={variant}>
        {timeString(timeDiff.hours, timeDiff.minutes, timeDiff.seconds)}
      </Text>
    );
  else
    countdown = <Countdown renderer={props => <CountdownRenderer {...props} variant={variant} />} date={nextRebaseTime.toDate()} />;
  
  return countdown;
}


function CountdownRenderer({ hours, minutes, seconds, variant }) {
  return (
    <Text variant={variant}>{timeString(hours, minutes, seconds)}</Text>
  );
}

export default RebaseCountdown;
