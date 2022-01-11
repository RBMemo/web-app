function timeDifference(date1, date2) {
  // Discard the time and time-zone information.
  const utc1 = new Date(date1.toISOString());
  const utc2 = new Date(date2.toISOString());

  let diff = utc1.getTime() - utc2.getTime();
  const hours = Math.floor(diff / (3600000));
  diff -= hours * 3600000;
  const minutes = Math.floor(diff / (60000));
  diff -= minutes * 60000;
  const seconds = Math.floor(diff / 1000);
  diff -= seconds * 1000;
  const ms = diff;

  return { hours, minutes, seconds, ms };
}

export {
  timeDifference
}
