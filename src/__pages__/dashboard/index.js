import React, { useCallback, useState } from 'react';
import { Row, Col } from 'antd';
import { useNavigate } from '@reach/router';

import { Routes } from 'routes';
import dataset from '@@datas/dashboard';
import GridView from '@@components/grid-view';
import Chatting from '@@components/chatting';
import GalleryDialog from '@@dialogs/gallery';

import css from './styles.module.scss';

const Dashboard = () => {
  const navigate = useNavigate();
  const [galleryDialogOpen, setGalleryDialogOpen] = useState(false);
  const [selected, setSelected] = useState();

  /**
   * Trigger when user click on an thumbnail
   */
  const onItemClick = useCallback(
    data => {
      if (data.title === 'Fubuki Group') {
        setSelected(data);
        setGalleryDialogOpen(true);
        return;
      }

      if (!data.route || data.route.trim().length === '') return;
      navigate(Routes[data.route].path);
    },
    [navigate]
  );

  /**
   * Toggle gallery dialog
   */
  const toggleGalleryDialog = useCallback(() => {
    setGalleryDialogOpen(!galleryDialogOpen);
  }, [galleryDialogOpen]);

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
          height="calc(100vh * 0.6)"
        />
      ) : null}
      <Chatting iconCss={css['chatting-icon']} iconSize="3x" placement="leftBottom" />
    </>
  );
};
export default Dashboard;
