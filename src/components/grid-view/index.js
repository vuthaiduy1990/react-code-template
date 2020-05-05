import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Typography } from 'antd';
import LazyLoad from 'react-lazyload';

import css from './styles.module.scss';

const { Title } = Typography;
const GridView = ({ dataset, col, onItemClick }) => {
  const GRID_COLS = [...Array(col).keys()];
  const GRID_ROWS = [...Array(Math.ceil(dataset.length / GRID_COLS.length)).keys()];

  /**
   * Trigger when user click on thumbnail or title
   */
  const onClick = useCallback(
    data => () => {
      if (onItemClick) onItemClick(data);
    },
    [onItemClick]
  );

  return (
    <>
      <LazyLoad>
        {GRID_ROWS.map((row, rIdx) => (
          <Row gutter={[48, 16]} key={row}>
            {GRID_COLS.map((_, cIdx) => {
              const data = dataset[rIdx * GRID_COLS.length + cIdx];
              return data ? (
                <Col span={24 / col} key={data.title} className={css.cell}>
                  <LazyLoad>
                    <img src={data.thumbnail} alt="" style={{ width: '100%' }} onClick={onClick(data)} />
                  </LazyLoad>
                  <Title level={4} className={css.title}>
                    {data.title}
                  </Title>
                </Col>
              ) : null;
            })}
          </Row>
        ))}
      </LazyLoad>
    </>
  );
};

GridView.propTypes = {
  dataset: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      thumbnail: PropTypes.string,
    })
  ),
  col: PropTypes.number.isRequired,
  onItemClick: PropTypes.func,
};
export default memo(GridView);
