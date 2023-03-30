import './blogList.scss';
import cardImg from '../../image/blog/blog-card-1.jpg';
import cardImg2 from '../../image/blog/blog-card-2.jpg';
import cardImg3 from '../../image/blog/blog-card-3.jpg';

import {BlogCard} from "../blogCard/BlogCard";

const BlogList = () => {
  const cardImages = [cardImg, cardImg2, cardImg3];

  return (
      <section className={'blog-list'}>
        <div className={'container'}>
          <h3 className={'title blog-list__title'}>
            From Our Blog
          </h3>
          <p className={'blog-list__text'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodmoe tempor
            incididunt ut labore et dolore aliqua.
          </p>
          <div className={'blog-list__cards'}>
            {cardImages.map((img, index) => <BlogCard cardImg={img} key={index}/>)}
          </div>
        </div>
      </section>
  );
};

export {BlogList}
