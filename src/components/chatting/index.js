import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import { Popover, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGhost } from '@fortawesome/free-solid-svg-icons';

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

const Chatting = ({ iconCss, iconSize = '2x', placement }) => {
  const inputRef = useRef();
  const textRef = useRef();
  const socketRef = useRef(); // use ref to keep reference to socket instance.
  const [visible, setVisible] = useState(false);

  // on component did mount
  useEffect(() => {
    initWebSocket();

    // on component will un-mount
    return () => {
      disconnectSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Init web socket
   */
  const initWebSocket = useCallback(() => {
    const ws = new WebSocket(process.env.GATSBY_DUMMY_WS_URL);
    socketRef.current = ws;
    ws.onopen = () => {
      // Listen for messages
      socketRef.current.onmessage = onMessageReceiving;

      // listen the error
      socketRef.current.onerror = onSocketError;

      // Listen for socket closes
      socketRef.current.onclose = onSocketClose;
    };
  }, [onMessageReceiving, onSocketClose, onSocketError]);

  /**
   * Disconnect socket normally
   */
  const disconnectSocket = useCallback(() => {
    // close normally
    // https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
    if (socketRef.current) {
      socketRef.current.close(1000);
    }
  }, []);

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
        writeMessage('Reconnect ...');
        initWebSocket();
      }
    },
    [initWebSocket, writeMessage]
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
        writeMessage(`Sending: ${message}`);
        socketRef.current.send(message);

        // send disconect or error for demoing purpose
        if (message === 'disconnect') {
          disconnectSocket();
        } else if (message === 'error') {
          socketRef.current.close();
          socketRef.current.send('trigger errror');
        }
      }
    },
    [disconnectSocket, writeMessage]
  );

  /**
   * Listen for messages
   */
  const onMessageReceiving = useCallback(
    event => {
      writeMessage(`Receiving: ${event.data} - ${event.timeStamp}`);
    },
    [writeMessage]
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
    </>
  );
};

Chatting.propTypes = {
  iconCss: PropTypes.string,
  iconSize: PropTypes.string,
  placement: PropTypes.string,
};
export default memo(Chatting);
