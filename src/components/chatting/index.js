import React, { memo, useState, useCallback } from 'react';
import Proptypes from 'prop-types';
import cls from 'classnames';

import { Popover, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGhost } from '@fortawesome/free-solid-svg-icons';

import css from './styles.module.scss';

const { TextArea } = Input;

const ChatForm = ({ onSending }) => {
  return (
    <>
      <Input placeholder="Type something here" onKeyDown={onSending} className={css.sender} />
      <TextArea
        placeholder="Autosize height with minimum and maximum number of lines"
        autoSize={{ minRows: 3, maxRows: 6 }}
        disabled
      />
    </>
  );
};
ChatForm.propTypes = {
  onSending: Proptypes.func.isRequired,
};

const Chatting = ({ iconCss, iconSize = '2x', placement }) => {
  const [visible, setVisible] = useState(false);

  /**
   * Trigger when user click on ghost icon to show chat form
   */
  const toggleChatForm = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  /**
   * Trigger when user
   */
  const onSending = useCallback(e => {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13) {
      // user press enter
      // send value here to server
    }
  }, []);

  return (
    <>
      <Popover
        content={<ChatForm onSending={onSending} />}
        title="Ask your ass."
        placement={placement}
        visible={visible}
      >
        <FontAwesomeIcon icon={faGhost} size={iconSize} className={cls(iconCss)} onClick={toggleChatForm} />
      </Popover>
    </>
  );
};

Chatting.propTypes = {
  iconCss: Proptypes.string,
  iconSize: Proptypes.string,
  placement: Proptypes.string,
};
export default memo(Chatting);
