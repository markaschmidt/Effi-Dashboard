"use client";

import { useEffect, useRef } from "react";
import { wsUrl } from "./api";
import type { RealtimeEvent } from "./types";

export function useRealtime(
  onEvent: (event: RealtimeEvent) => void,
  onConnected?: () => void,
) {
  const onEventRef = useRef(onEvent);
  const onConnectedRef = useRef(onConnected);
  onEventRef.current = onEvent;
  onConnectedRef.current = onConnected;

  useEffect(() => {
    let closed = false;
    let socket: WebSocket | undefined;
    let retry: ReturnType<typeof setTimeout> | undefined;

    const connect = async () => {
      const tokenResponse = await fetch("/api/ws-token");
      if (!tokenResponse.ok) return;
      const { token } = (await tokenResponse.json()) as { token?: string };
      if (!token || closed) return;
      socket = new WebSocket(wsUrl(token));
      socket.onopen = () => onConnectedRef.current?.();
      socket.onmessage = (message) => {
        try {
          onEventRef.current(JSON.parse(message.data) as RealtimeEvent);
        } catch {
          // ignore malformed frames
        }
      };
      socket.onclose = () => {
        if (!closed) retry = setTimeout(() => void connect(), 1500);
      };
    };

    void connect();
    return () => {
      closed = true;
      if (retry) clearTimeout(retry);
      socket?.close();
    };
  }, []);
}
