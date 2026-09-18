"use client";

import { ParticipantEvent, Track } from "livekit-client";
import { useRoomContext } from "@livekit/components-react";
import { useEffect, useRef } from "react";
import { uploadRecording } from "@/lib/api";
import { recorderMimeType } from "./utils";

type CallRecorderProps = {
  callId: string;
};

export function CallRecorder({ callId }: CallRecorderProps) {
  const room = useRoomContext();
  const chunksRef = useRef<Blob[]>([]);
  const mimeRef = useRef("audio/webm");

  useEffect(() => {
    let recorder: MediaRecorder | null = null;
    chunksRef.current = [];

    function startFromTrack(track: MediaStreamTrack) {
      if (recorder || typeof MediaRecorder === "undefined") return;
      const mime = recorderMimeType();
      mimeRef.current = mime || "audio/webm";
      try {
        recorder = mime
          ? new MediaRecorder(new MediaStream([track]), { mimeType: mime })
          : new MediaRecorder(new MediaStream([track]));
      } catch {
        return;
      }
      recorder.ondataavailable = (event) => {
        if (event.data.size) chunksRef.current.push(event.data);
      };
      recorder.start(1000);
    }

    const existing = room.localParticipant.getTrackPublication(Track.Source.Microphone)?.track?.mediaStreamTrack;
    if (existing) startFromTrack(existing);

    const onPublished = (publication: { source?: Track.Source; track?: { mediaStreamTrack?: MediaStreamTrack } }) => {
      const track = publication.track?.mediaStreamTrack;
      if (track && publication.source === Track.Source.Microphone) startFromTrack(track);
    };
    room.localParticipant.on(ParticipantEvent.LocalTrackPublished, onPublished);

    return () => {
      room.localParticipant.off(ParticipantEvent.LocalTrackPublished, onPublished);
      const active = recorder;
      if (!active || active.state === "inactive") return;
      active.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeRef.current });
        if (blob.size > 0) {
          void uploadRecording(callId, blob, mimeRef.current.includes("ogg") ? "call.ogg" : "call.webm");
        }
      };
      active.stop();
    };
  }, [callId, room]);

  return null;
}
