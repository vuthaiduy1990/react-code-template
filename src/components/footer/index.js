import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useStaticQuery, graphql } from 'gatsby';
import { Tooltip, Dropdown, Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';

import dependencies from '@@datas/dependencies.json';
import * as css from './styles.module.scss';

function Footer() {
  const { t } = useTranslation();
  const { siteMetadata } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            git
            repo
            version
            license
          }
        }
      }
    `
  ).site;

  const dependenciesItems = dependencies.map((item) => {
    return {
      label: (
        <a target="blank" href={item.url}>
          {item.name}
        </a>
      ),
      key: item.name,
    };
  });

  return (
    <div className={css.footer}>
      <span className={css.copyright}>
        {t('copyright')}
        &nbsp;&nbsp;
        <a href={siteMetadata.git} target="blank">
          {siteMetadata.repo}
        </a>
      </span>
      <div className={css.info}>
        <span>{`${t('version')} ${siteMetadata.version}`}</span>
        <span attr="divider">|</span>
        <a href="https://en.wikipedia.org/wiki/MIT_License" target="blank">
          {siteMetadata.license}
        </a>
        &nbsp;&nbsp;
        <Tooltip placement="topRight" title={t('dependencies')}>
          <Dropdown menu={{ items: dependenciesItems }} placement="topRight" trigger={['click']}>
            <i attr="bug">
              <FontAwesomeIcon icon={faBug} spin />
            </i>
          </Dropdown>
        </Tooltip>
      </div>
    </div>
  );
}

export default memo(Footer);
