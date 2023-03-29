import {Link} from "react-router-dom";
import {useState, useEffect} from "react";

import './promo.scss';

const Promo = () => {

  const [timerSeconds, setTimerSeconds] = useState('');
  const [timerMinutes, setTimerMinutes] = useState('');
  const [timerHours, setTimerHours] = useState('');
  const [timerDays, setTimerDays] = useState(0);

  useEffect(() => {
    initializeClock('2023-09-03');
  }, []);

  function getTimeRemaining(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }

  function initializeClock(endTime) {

    function updateClock() {
      const t = getTimeRemaining(endTime);
      setTimerDays(t.days)
      setTimerHours(('0' + t.hours).slice(-2))
      setTimerMinutes(('0' + t.minutes).slice(-2));
      setTimerSeconds(('0' + t.seconds).slice(-2));

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }

    updateClock();
    const timeInterval = setInterval(updateClock, 1000);
  }

  return (
      <section className={'promo'}>
        <div className={'container'}>
          <div className={'promo__inner'}>
            <p className={'promo__subtitle'}>
              Style Fashion
            </p>
            <h3 className={'title promo__title'}>
              DEAL OF THE DAY
            </h3>
            <div className={'promo__timer'}>
              <div className={'promo__timer-item'}>
                <div className={'promo__timer-days'}>{timerDays}</div>
                <span className={'promo__timer-text'}>Days</span>
              </div>
              <div className={'promo__timer-item'}>
                <div className={'promo__timer-days'}>{timerHours}</div>
                <span className={'promo__timer-text'}>Hours</span>
              </div>
              <div className={'promo__timer-item'}>
                <div className={'promo__timer-days'}>{timerMinutes}</div>
                <span className={'promo__timer-text'}>Minutes</span>
              </div>
              <div className={'promo__timer-item'}>
                <div className={'promo__timer-days'}>{timerSeconds}</div>
                <span className={'promo__timer-text'}>Seconds</span>
              </div>
            </div>
            <Link className={'promo__link'} href={'#'}>
              shop now
            </Link>
          </div>
        </div>
      </section>
  );
};

export {Promo}
