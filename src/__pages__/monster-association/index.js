import React from 'react';
import { Row, Col } from 'antd';

import dataset from '@@datas/monster-association';
import GridView from '@@components/grid-view';

import css from './styles.module.scss';

const MonsterAssociation = () => {
  return (
    <>
      <div className={css.layout}>
        <Row style={{ height: '100%', alignItems: 'center' }}>
          <Col span={16} offset={4}>
            <GridView dataset={dataset} col={6} />
          </Col>
        </Row>
      </div>
    </>
  );
};
export default MonsterAssociation;
