import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import {useState} from "react";
import {DefaultPlayer} from 'react-html5video';


import './video.scss';
import videoImg from '../../image/video.jpg';
import 'react-html5video/dist/styles.css';
import video from '../../image/pexels-polina-tankilevitch-6939282.mp4';

const Video = () => {

  const {isLoggedIn} = useSelector(state => state.oauthReducer);

  const [isShowVideo, setIsShowVideo] = useState(false);

  return (
      <section className={'video'}>
        <div className={'container'}>
          <div className={'video__inner'}>
            <div className={'video__img-wrapper'}>
              <img className={'video__img'} src={videoImg} alt="video"/>
              <Link className={'video__play-button'} to={'#'} onClick={() => setIsShowVideo(true)}>
                <svg width={130} height={130}>
                  <circle cx={65} cy={65} r={65} style={{opacity: 0.2, fill: "#fe3e57",}}/>
                  <circle cx={65} cy={65} r={55} style={{opacity: 0.6, fill: "#fe3e57",}}/>
                  <circle cx={65} cy={65} r={45} style={{fill: "#fe3e57",}}/>
                  <path d="m649.816 2630.14-11.824-7.6a2.934 2.934 0 0 0-1.554-.54 1.507 1.507 0 0 0-1.431 1.78v16.44a1.507 1.507 0 0 0 1.429 1.78 3 3 0 0 0 1.546-.54l11.83-7.6a2.056 2.056 0 0 0 0-3.72"
                      transform="translate(-578 -2567)"
                      style={{fill: "#fff", fillRule: "evenodd",}}
                  />
                </svg>
              </Link>
              <div className={'video__player-wrapper'} >
                <span className={isShowVideo ? 'video__player-close--show' : 'video__player-close'}
                      onClick={() => setIsShowVideo(false)}
                >
                   <svg viewBox="0 0 384 512">
                    <path fill="#fff" width="30px" height="30px"
                      d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256l105.3-105.4z"
                    />
                   </svg>
                </span>
                <DefaultPlayer className={isShowVideo ? 'video__player--show' : 'video__player'} autoPlay>
                  <source src={video} type={'video/webm'}/>
                </DefaultPlayer>
              </div>
            </div>
            <div className={'video__content'}>
              <p className={'video__subtitle'}>
                Winter Collection 20% Off
              </p>
              <h3 className={'video__title title'}>
                TRENDING FASHION
              </h3>
              <p className={'video__text'}>
                Lorem ipsum dolor sit amet, consectetur apiscing elit, sed do eiusmod temp incididunt
                ut labore et dolore magna aliqua consectetur adipiscing elit, sedu do eiusmod temp
                indidunt ut labore et dolore magna aliqua.. Quis ipsum de ultcesm. Risus commodo viverra
                maecenas.
              </p>
              <Link className={'video__button'} to={isLoggedIn ? '/shop' : '/login'}>
                View Now
              </Link>
            </div>
          </div>
        </div>
      </section>
  );
};

export {Video}
