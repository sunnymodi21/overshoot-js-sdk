/**
 * Server-safe entry point for Node.js / server-side environments.
 *
 * Exports StreamClient, types, and errors WITHOUT importing RealtimeVision,
 * which depends on browser APIs (document, HTMLVideoElement, Canvas, etc.).
 *
 * Usage:
 *   import { StreamClient } from 'overshoot/server';
 *
 * For browser environments, use the default entry point:
 *   import { RealtimeVision, StreamClient } from 'overshoot';
 */

export { StreamClient } from "./client/client";
export { DEFAULT_API_URL } from "./client/constants";
export type {
  StreamSource,
  WebRtcOffer,
  WebRtcAnswer,
  WebRTCSourceConfig,
  LiveKitSourceConfig,
  SourceConfig,
  StreamMode,
  ClipProcessingConfig,
  FrameProcessingConfig,
  StreamProcessingConfig,
  ModelBackend,
  StreamInferenceConfig,
  StreamClientMeta,
  StreamCreateRequest,
  StreamCreateResponse,
  StreamInferenceResult,
  StreamConfigResponse,
  KeepaliveResponse,
  StatusResponse,
  ErrorResponse,
  ModelStatus,
  ModelInfo,
  StreamStopReason,
  FinishReason,
} from "./client/types";
export {
  ApiError,
  UnauthorizedError,
  ValidationError,
  NotFoundError,
  NetworkError,
  ServerError,
} from "./client/errors";
