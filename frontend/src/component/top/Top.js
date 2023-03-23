import {NavLink} from 'react-router-dom';

import './top.scss';

const Top = ({title}) => {

    return (
        <section className={'top'}>
            <div className={'top-container'}>
                <div className={'container'}>
                    <h2 className={'top__title'}>
                        {title}
                    </h2>
                    <div className={'breadcrumbs'}>
                        <ul className={'breadcrumbs__list'}>
                            <li className={'breadcrumbs__list-item'}>
                                <NavLink className={'breadcrumbs__list-link'} to={'/home'}>Home</NavLink>
                            </li>
                            <li className={'breadcrumbs__list-item'}>
                                <NavLink className={'breadcrumbs__list-link'} to={`/${title.toLowerCase()}`}>{title}</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export {Top}