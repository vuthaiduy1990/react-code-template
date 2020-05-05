import React, { useCallback } from 'react';
import { Row, Col, message } from 'antd';

import dataset from '@@datas/hero-association';
import GridView from '@@components/grid-view';

import css from './styles.module.scss';

const HeroAssociation = () => {
  /**
   * Trigger when user click on an thumbnail
   */
  const onItemClick = useCallback(data => {
    message.info(data.title, 1);
  }, []);

  return (
    <>
      <div className={css.layout}>
        <Row style={{ height: '100%', alignItems: 'center' }}>
          <Col span={16} offset={4}>
            <GridView dataset={dataset} col={6} onItemClick={onItemClick} />
          </Col>
        </Row>
      </div>
    </>
  );
};
export default HeroAssociation;
