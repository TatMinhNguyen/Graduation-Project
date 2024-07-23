import moment from 'moment';
import React from 'react';

export const timeAgo = (createdAt) => {
    const now = moment();
    const postTime = moment(createdAt);
    const duration = moment.duration(now.diff(postTime));
  
    const years = duration.years();
    const months = duration.months();
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
  
    if (years > 0) {
      return `${years} năm trước`;
    } else if (months > 0) {
      return `${months} tháng trước`;
    } else if (days > 0) {
      return `${days} ngày trước`;
    } else if (hours > 0) {
      return `${hours} giờ trước`;
    } else {
      return `${minutes} phút trước`;
    }
};

export const timeAgoShort = (createdAt) => {
  const now = moment();
  const postTime = moment(createdAt);
  const duration = moment.duration(now.diff(postTime));

  const years = duration.years();
  const months = duration.months();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  if (years > 0) {
    return `${years}y`;
  } else if (months > 0) {
    return `${months}mon`;
  } else if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${minutes}m`;
  }
};

export const convertNewlinesToBreaks = (text) => {
    return text.split('\n').map((str, index) => (
        <React.Fragment key={index}>
            {str}
            <br />
        </React.Fragment>
    ));
};

