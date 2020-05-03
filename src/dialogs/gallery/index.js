/**
 * Kind of declartive dialog
 */
import React, { memo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Carousel, Space } from 'antd';
import LazyLoad from 'react-lazyload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

import css from './styles.module.scss';

const GalleryDialog = ({ title, photos, isOpen, toggleClose, height }) => {
  const carouselRef = useRef();

  /**
   * slide next image
   */
  const slideNext = useCallback(() => {
    carouselRef.current.prev();
  });

  /**
   * slide preivous image
   */
  const slidePre = useCallback(() => {
    carouselRef.current.next();
  });

  return (
    <Modal
      visible={isOpen}
      title={title}
      onCancel={toggleClose}
      footer={[
        <Space size="middle" key="footer-group">
          <FontAwesomeIcon icon={faChevronCircleLeft} size="2x" className={css.icon} onClick={slidePre} />
          <FontAwesomeIcon icon={faChevronCircleRight} size="2x" className={css.icon} onClick={slideNext} />
          <Button key="close" onClick={toggleClose}>
            Close
          </Button>
        </Space>,
      ]}
    >
      <Carousel effect="fade" autoplay ref={carouselRef}>
        {photos.map(item => (
          <LazyLoad key={item}>
            <div className={css.img}>
              <img src={item} alt="" style={{ maxWidth: '100%', maxHeight: height }} />
            </div>
          </LazyLoad>
        ))}
      </Carousel>
    </Modal>
  );
};

GalleryDialog.propTypes = {
  title: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.string),
  isOpen: PropTypes.bool.isRequired,
  toggleClose: PropTypes.func.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

// default props
GalleryDialog.defaultProps = {
  photos: [],
};
export default memo(GalleryDialog);
