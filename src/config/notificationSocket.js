import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import getAuthInfo from "./getAuthInfo";
import { useSelector } from "react-redux";
import commonApi from "../common/api";

const useNotificationSocket = (onNewNotification) => {
  const clientRef = useRef(null);

  const user = useSelector((state) => state?.user?.user);
  const { token } = getAuthInfo();

  useEffect(() => {
    if (!user?.username) return;

    const socket = new SockJS(`${commonApi.default.url}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      onConnect: () => {
        client.subscribe(`/user/queue/notifications`, (msg) => {
          const notif = JSON.parse(msg.body);
          onNewNotification?.(notif);
        });
      },
      onStompError: (frame) => {
        console.error("STOMP error", frame);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      clientRef.current?.deactivate();
    };
    // eslint-disable-next-line
  }, [user?.username, token]);
};

export default useNotificationSocket;
