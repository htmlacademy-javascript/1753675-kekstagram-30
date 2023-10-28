const isMeetingWithinWorkingTime = (startTime, endTime, meetingStart, meetingDuration) => {
  // Создаем объекты Date на основе строк времени
  const start = new Date(1970, 1, 1, ...startTime.split(':'));
  const end = new Date(1970, 1, 1, ...endTime.split(':'));
  const meeting = new Date(1970, 1, 1, ...meetingStart.split(':'));

  // Вычисляем время окончания встречи
  const meetingEnd = new Date(meeting.getTime() + meetingDuration * 60000);

  // Проверяем попадает ли время начала и окончания встречи в рамки рабочего дня
  return (meeting >= start && meetingEnd <= end);
};

isMeetingWithinWorkingTime('08:00', '17:30', '14:00', 90);
isMeetingWithinWorkingTime('8:0', '10:0', '8:0', 120);
isMeetingWithinWorkingTime('08:00', '14:30', '14:00', 90);
isMeetingWithinWorkingTime('14:00', '17:30', '08:0', 90);
isMeetingWithinWorkingTime('8:00', '17:30', '08:00', 900);
