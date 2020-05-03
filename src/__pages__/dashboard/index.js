import React, { useCallback, useState } from 'react';
import { Row, Col } from 'antd';
import { useNavigate } from '@reach/router';

import { Routes } from 'routes';
import dataset from '@@datas/dashboard';
import GridView from '@@components/grid-view';
import GalleryDialog from '@@dialogs/gallery';

import css from './styles.module.scss';

const Dashboard = () => {
  const navigate = useNavigate();
  const [galleryDialogOpen, setGalleryDialogOpen] = useState(false);
  const [selected, setSelected] = useState();

  /**
   * Trigger when user click on an thumbnail
   */
  const onItemClick = useCallback(data => {
    if (data.title === 'Fubuki Group') {
      setSelected(data);
      setGalleryDialogOpen(true);
      return;
    }

    if (!data.route || data.route.trim().length === '') return;
    navigate(Routes[data.route].path);
  });

  /**
   * Toggle gallery dialog
   */
  const toggleGalleryDialog = useCallback(() => {
    setGalleryDialogOpen(!galleryDialogOpen);
  });

  return (
    <>
      <div className={css.dasboard}>
        <Row style={{ height: '100%', alignItems: 'center' }}>
          <Col span={16} offset={4}>
            <GridView dataset={dataset} col={2} onItemClick={onItemClick} />
          </Col>
        </Row>
      </div>
      {selected ? (
        <GalleryDialog
          title={selected.title}
          photos={selected.gallery}
          isOpen={galleryDialogOpen}
          toggleClose={toggleGalleryDialog}
          height={500}
        />
      ) : null}
    </>
  );
};
export default Dashboard;
