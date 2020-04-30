/* eslint-disable comma-dangle */
import React, { memo } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { useLocation } from '@reach/router';
import PropTypes from 'prop-types';
import { Breadcrumb, PageHeader } from 'antd';

import { createBreadcrumb } from '@@utils/url';

import css from './styles.module.scss';

const Header = ({ routes }) => {
  const { siteMetadata } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            git
          }
        }
      }
    `
  ).site;
  const location = useLocation();
  const breadcrumbs = createBreadcrumb(location, routes);
  const bread = breadcrumbs && breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].route : null;

  return (
    <>
      <div className={css.header}>
        {breadcrumbs.length > 1 ? (
          <Breadcrumb className={css.breadcrumbs}>
            {breadcrumbs.map((item, idx) => (
              <Breadcrumb.Item key={item.link}>
                {idx === breadcrumbs.length - 1 ? item.route.title : <Link to={item.link}>{item.route.title}</Link>}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        ) : null}
        {bread ? <PageHeader title={bread.title} subTitle={bread.subTitle} /> : null}
      </div>
      <a className={css.ribbon} href={siteMetadata.git} target="blank">
        <img src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub" />
      </a>
    </>
  );
};

Header.propTypes = {
  routes: PropTypes.shape({
    title: PropTypes.string,
    subTitle: PropTypes.string,
    path: PropTypes.string,
  }).isRequired,
};
export default memo(Header);
