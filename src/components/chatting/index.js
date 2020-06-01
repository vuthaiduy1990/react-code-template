import React, { memo, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import { Popover, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGhost } from '@fortawesome/free-solid-svg-icons';

import WebSocketWrapper from '@@components/websocket';

import css from './styles.module.scss';

const hint = 'Type "disconnect" to test closing socket.\nType "error" to test socket error and reconnect';
const ChatForm = ({ inputRef, textRef, onSending }) => {
  return (
    <>
      <Input ref={inputRef} placeholder="Type something here" onKeyDown={onSending} className={css.sender} />
      <textarea ref={textRef} placeholder={hint} rows="4" readOnly className={css.receiver} />
    </>
  );
};
ChatForm.propTypes = {
  inputRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  textRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  onSending: PropTypes.func.isRequired,
};

/**
 * Chatting compoment
 */
const Chatting = ({ iconCss, iconSize = '2x', placement }) => {
  const socketRef = useRef();
  const inputRef = useRef();
  const textRef = useRef();
  const [visible, setVisible] = useState(false);

  /**
   * Listener for socket error
   */
  const onSocketOpen = useCallback(
    event => {
      writeMessage(event);
    },
    [writeMessage]
  );

  /**
   * Listen for socket close
   */
  const onSocketClose = useCallback(
    event => {
      if (event.code === 1000) {
        // Error code 1000 means that the connection was closed normally.
        writeMessage('Closed ...');
      } else {
        // The onerror event is fired when something wrong occurs between the communications.
        // The event onerror is followed by a connection termination, which is a close event.
        // Try to reconnect.
        // But note that, useWebSocket alreadt handle reconnect action
        writeMessage('Reconnect ...');
      }
    },
    [writeMessage]
  );

  /**
   * Listener for socket error
   */
  const onSocketError = useCallback(
    event => {
      writeMessage(`Error ... ${event.code}`);
    },
    [writeMessage]
  );

  /**
   * Trigger when user
   */
  const onSending = useCallback(
    e => {
      const message = e.target.value;
      const keyCode = e.which || e.keyCode;
      if (keyCode === 13) {
        // user press enter
        // send value here to server
        inputRef.current.setValue(''); // empty input

        // socket already closed
        if (socketRef.current.instance().readyState === WebSocket.CLOSED) {
          writeMessage('Socket already closed');
          return;
        }

        writeMessage(`Sending: ${message}`);

        // send disconect or error for demoing purpose
        if (message === 'disconnect') {
          socketRef.current.disconnectSocket();
        } else if (message === 'error') {
          // Not norma disconnect -> The socket will auto reconnect
          socketRef.current.instance().close(4000);
        } else {
          socketRef.current.send(message);
        }
      }
    },
    [socketRef, writeMessage]
  );

  /**
   * Listen for messages
   */
  const onSocketMessage = useCallback(
    event => {
      writeMessage(`Receiving: ${event.data} - ${event.timeStamp} - ${visible}`);
    },
    [visible, writeMessage]
  );

  /**
   * Write message
   */
  const writeMessage = useCallback(message => {
    const textEl = textRef.current;
    if (textEl) {
      textEl.append(`${message}\n`);
      textEl.scrollTop = textEl.scrollHeight;
    }
  }, []);

  /**
   * Trigger when user click on ghost icon to show chat form
   */
  const toggleChatForm = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <>
      <Popover
        content={<ChatForm inputRef={inputRef} textRef={textRef} onSending={onSending} />}
        title="Ask your ass."
        placement={placement}
        visible={visible}
      >
        <FontAwesomeIcon icon={faGhost} size={iconSize} className={cls(iconCss)} onClick={toggleChatForm} />
      </Popover>
      <WebSocketWrapper
        ref={socketRef}
        url={process.env.GATSBY_DUMMY_WS_URL}
        onOpen={onSocketOpen}
        onMessage={onSocketMessage}
        onError={onSocketError}
        onClose={onSocketClose}
      />
    </>
  );
};

Chatting.propTypes = {
  iconCss: PropTypes.string,
  iconSize: PropTypes.string,
  placement: PropTypes.string,
};
export default memo(Chatting);
