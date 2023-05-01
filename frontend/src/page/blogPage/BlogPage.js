import {useEffect} from "react";

import {Blog, Top} from "../../component";

const BlogPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div className={'blog-page'}>
        <Top title={'blog'}/>
        <Blog/>
      </div>
  );
};

export {BlogPage}