/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, forwardRef, useImperativeHandle, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Modal, Input, Button } from 'antd';

// inline css for register button using emotion
const registerBtnCss = css`
  background-color: #5ac18e;
`;

const RegisterModal = forwardRef(({ onSubmit, onClose }, ref) => {
  const [visible, setVisible] = useState(false);
  const [originData, setOriginData] = useState(null);
  const [formData, setFormData] = useState({});

  useImperativeHandle(ref, () => ({
    // show modal with given data
    show(data) {
      setOriginData(data);
      if (data == null) {
        setFormData({}); // default data
      } else {
        setFormData({ ...data }); // clone of original data
      }
      setVisible(true);
    },

    // hide modal
    hide() {
      setVisible(false);
    },
  }));

  /**
   * clode modal dialog
   */
  const toggleClose = useCallback(() => {
    setVisible(false);
  }, []);

  /**
   * Reset form
   */
  const resetFormData = useCallback(() => {
    setFormData({});
    setOriginData(null);
  }, []);

  /**
   * Trigger when modal is closed
   */
  const onModalClosed = useCallback(() => {
    resetFormData();
    if (onClose) onClose();
  }, [onClose, resetFormData]);

  /**
   * On form submit
   *
   * @param {Object} e event
   */
  const onRegisterHandler = useCallback(() => {
    if (onSubmit) onSubmit(originData, formData);
    toggleClose();
  }, [onSubmit, originData, formData, toggleClose]);

  /**
   * On username input changed
   */
  const onUsernameChange = useCallback(
    (e) => {
      setFormData({
        ...formData,
        username: e.target.value,
      });
    },
    [formData]
  );

  return (
    <Modal
      title="Register Account"
      centered
      maskClosable={false}
      open={visible}
      onCancel={toggleClose}
      afterClose={onModalClosed}
      footer={[
        <Button key="close" onClick={toggleClose}>
          Close
        </Button>,
        <Button key="Register" onClick={onRegisterHandler} css={registerBtnCss}>
          Register
        </Button>,
      ]}
    >
      <div>
        <Input placeholder="input username" value={formData.username} onChange={onUsernameChange} />
      </div>
    </Modal>
  );
});

RegisterModal.propTypes = {
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};
export default memo(RegisterModal);
