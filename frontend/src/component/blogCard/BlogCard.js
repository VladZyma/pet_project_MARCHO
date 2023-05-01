import {Link} from "react-router-dom";

import './blogCard.scss';

const BlogCard = ({cardImg}) => {

  return (
      <div className={'blog-card'}>
        <div className={'blog-card__img-wrapper'}>
          <img className={'blog-card__img'} src={cardImg} alt="card"/>
        </div>
        <div className={'blog-card__content'}>
          <div className={'blog-card__info'}>
            <div className={'blog-card__info-author'}>By Admin</div>
            <div className={'blog-card__info-date'}>10 January, 2020</div>
          </div>
          <h4 className={'blog-card__title'}>
            Our Apps User Use Mobile On His Mobile
          </h4>
          <Link className={'blog-card__link'} to={'/blog'}>
            <span>
              Read More
            </span>
            <svg width={10} height={8}>
              <path fill="#8d8d8d" fillRule="evenodd" d="M9.836 3.62 6.227.15a.574.574 0 0 0-.774 0l-.327.32a.511.511 0 0 0-.16.37.534.534 0 0 0 .16.38l2.105 2.03H.542a.518.518 0 0 0-.54.51v.45a.543.543 0 0 0 .54.54h6.713L5.126 6.79a.508.508 0 0 0 0 .74l.327.32A.6.6 0 0 0 5.84 8a.556.556 0 0 0 .387-.16l3.609-3.47A.507.507 0 0 0 10 4a.53.53 0 0 0-.16-.38"/>
            </svg>
          </Link>
        </div>
      </div>
  );
};

export {BlogCard}
