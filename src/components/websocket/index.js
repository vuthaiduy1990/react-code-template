import React, { useEffect, useRef, useCallback, memo, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const WebSocketWrapper = forwardRef(({ url, onOpen, onMessage, onError, onClose }, ref) => {
  const socketRef = useRef(); // use ref to keep reference to socket instance.
  const onOpenRef = useRef();
  const onMessageRef = useRef();
  const onErrorRef = useRef();
  const onCloseRef = useRef();

  useImperativeHandle(ref, () => ({
    /**
     * Get WebSocket instances
     */
    instance() {
      return socketRef.current;
    },

    /**
     * Reconnect web socket
     */
    reconnect() {
      initWebSocket();
    },

    /*
     * Disconnect socket normally
     * https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
     */
    disconnectSocket() {
      closeWebSocket(1000);
    },

    /**
     * Send message
     */
    send(message) {
      if (socketRef.current) {
        socketRef.current.send(message);
      }
    },
  }));

  // on component did mount
  useEffect(() => {
    initWebSocket();

    // on component will un-mount
    return () => {
      // close normally
      // https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
      if (socketRef.current) {
        socketRef.current.close(1000);
      }
    };
  }, [initWebSocket, ref]);

  /**
   * Keep reference to new onOpen function
   */
  useEffect(() => {
    onOpenRef.current = onOpen;
  }, [onOpen]);

  /**
   * * Keep reference to new onMessage function
   */
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  /**
   * Keep reference to new onError function
   */
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  /**
   * Keep reference to new onClose function
   */
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  /**
   * Init web socket
   */
  const initWebSocket = useCallback(() => {
    const ws = new WebSocket(url);
    socketRef.current = ws;
    ws.onopen = event => {
      // open event
      if (onOpenRef.current) onOpenRef.current(event);

      // Listen for messages
      socketRef.current.onmessage = onSocketMessage;

      // listen the error
      socketRef.current.onerror = onSocketError;

      // Listen for socket close
      socketRef.current.onclose = onSocketClose;
    };
  }, [url, onSocketMessage, onSocketClose, onSocketError]);

  /**
   * Close web socket
   * @see https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
   */
  const closeWebSocket = useCallback(code => {
    if (socketRef.current) {
      socketRef.current.close(code);
    }
  }, []);

  /**
   * Listen for socket message
   */
  const onSocketMessage = useCallback(event => {
    if (onMessageRef.current) onMessageRef.current(event);
  }, []);

  /**
   * Listen for socket error
   */
  const onSocketError = useCallback(event => {
    if (onErrorRef.current) onErrorRef.current(event);
  }, []);

  /**
   * Listen for socket close
   */
  const onSocketClose = useCallback(
    event => {
      if (onCloseRef.current) onCloseRef.current(event);
      if (event.code !== 1000) {
        // The onerror event is fired when something wrong occurs between the communications.
        // The event onerror is followed by a connection termination, which is a close event.
        // Try to reconnect.
        initWebSocket();
      }
    },
    [initWebSocket]
  );

  return <></>;
});

WebSocketWrapper.propTypes = {
  url: PropTypes.string.isRequired,
  onOpen: PropTypes.func,
  onMessage: PropTypes.func,
  onError: PropTypes.func,
  onClose: PropTypes.func,
};
export default memo(WebSocketWrapper);
