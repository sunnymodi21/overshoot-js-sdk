/**
 * LiveKit transport — connects to a server-created LiveKit room
 * and publishes a local video track.
 */

export interface LiveKitTransportHandle {
  disconnect(): Promise<void>;
  updateToken(token: string): void;
}

export async function connectAndPublish(options: {
  url: string;
  token: string;
  videoTrack: MediaStreamTrack;
  onReconnecting?: () => void;
  onReconnected?: () => void;
  onDisconnected?: (reason?: string) => void;
}): Promise<LiveKitTransportHandle> {
  const { Room, RoomEvent, Track } = await import("livekit-client");

  let latestToken = options.token;

  const room = new Room({
    adaptiveStream: false,
    dynacast: false,
  });

  room.on(RoomEvent.Reconnecting, () => {
    options.onReconnecting?.();
  });

  room.on(RoomEvent.Reconnected, () => {
    options.onReconnected?.();
  });

  room.on(RoomEvent.Disconnected, (reason?: unknown) => {
    options.onDisconnected?.(reason !== undefined ? String(reason) : undefined);
  });

  await room.connect(options.url, latestToken);

  await room.localParticipant.publishTrack(options.videoTrack, {
    source: Track.Source.Camera,
    simulcast: false,
  });

  return {
    async disconnect() {
      await room.disconnect();
    },
    updateToken(token: string) {
      latestToken = token;
    },
  };
}
