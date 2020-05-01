import React, { useCallback } from 'react';
import { Row, Col } from 'antd';
import { useNavigate } from '@reach/router';

import { Routes } from 'routes';
import dataset from '@@datas/dashboard';
import GridView from '@@components/grid-view';

import css from './styles.module.scss';

const Dashboard = () => {
  const navigate = useNavigate();

  /**
   * Trigger when user click on an thumbnail
   */
  const onItemClick = useCallback(data => {
    if (!data.route || data.route.trim().length === '') return;
    navigate(Routes[data.route].path);
  });

  return (
    <div className={css.dasboard}>
      <Row style={{ height: '100%', alignItems: 'center' }}>
        <Col span={16} offset={4}>
          <GridView dataset={dataset} col={2} onItemClick={onItemClick} />
        </Col>
      </Row>
    </div>
  );
};
export default Dashboard;
