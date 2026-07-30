"use client"

import {
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,

  MediaAirplayButton,
  MediaCaptionsButton,
  MediaCastButton,
  MediaChromeButton,
  MediaChromeDialog,
  MediaChromeRange,
  MediaContainer,
  MediaDurationDisplay,
  MediaErrorDialog,
  MediaFullscreenButton,
  MediaGestureReceiver,
  MediaKeyboardShortcutsDialog,
  MediaLiveButton,
  MediaLoopButton,
  MediaPipButton,
  MediaLoadingIndicator,
  MediaPosterImage,
  MediaPreviewChapterDisplay,
  MediaPreviewThumbnail,
  MediaPlaybackRateButton,
  MediaTooltip,
  MediaTextDisplay,
  MediaPreviewTimeDisplay
} from "media-chrome/react"
import type {
  ComponentProps,
  CSSProperties,
  MouseEvent as ReactMouseEvent,
} from "react"
import { cn } from "@/lib/utils"

export type VideoPlayerProps = ComponentProps<typeof MediaController>

const variables = {
  "--media-primary-color": "var(--primary)",
  "--media-secondary-color": "var(--background)",
  "--media-text-color": "var(--foreground)",
  "--media-background-color": "var(--background)",
  "--media-control-hover-background": "var(--accent)",
  "--media-font-family": "var(--font-sans)",
  "--media-live-button-icon-color": "var(--muted-foreground)",
  "--media-live-button-indicator-color": "var(--destructive)",
  "--media-range-track-background": "var(--border)",
} as CSSProperties

export function VideoPlayer({
  className,
  style,
  ...props
}: VideoPlayerProps) {
  return (
    <MediaController
      className={cn(
        "relative flex aspect-video w-full items-center justify-center overflow-hidden bg-black",
        "[&_[slot=media]]:m-0 [&_[slot=media]]:block [&_[slot=media]]:max-h-full [&_[slot=media]]:w-full [&_[slot=media]]:object-contain",
        "fullscreen:fixed fullscreen:inset-0 fullscreen:h-screen fullscreen:max-h-none fullscreen:w-screen fullscreen:max-w-none fullscreen:rounded-none fullscreen:border-0 fullscreen:ring-0",
        className,
      )}
      style={{
        ...variables,
        ...style,
      }}
      {...(props as any)}
    />
  )
}

export type VideoPlayerControlBarProps = ComponentProps<typeof MediaControlBar>

export const VideoPlayerControlBar = (props: VideoPlayerControlBarProps) => (
  <MediaControlBar {...(props as any)} />
)

export type VideoPlayerTimeRangeProps = ComponentProps<typeof MediaTimeRange>

export const VideoPlayerTimeRange = ({ className, ...props }: VideoPlayerTimeRangeProps) => (
  <MediaTimeRange className={cn("p-2.5", className)} {...(props as any)} />
)

export type VideoPlayerTimeDisplayProps = ComponentProps<typeof MediaTimeDisplay>

export const VideoPlayerTimeDisplay = ({ className, ...props }: VideoPlayerTimeDisplayProps) => (
  <MediaTimeDisplay className={cn("p-2.5", className)} {...(props as any)} />
)

export type VideoPlayerVolumeRangeProps = ComponentProps<typeof MediaVolumeRange>

export const VideoPlayerVolumeRange = ({ className, ...props }: VideoPlayerVolumeRangeProps) => (
  <MediaVolumeRange className={cn("p-2.5", className)} {...(props as any)} />
)

export type VideoPlayerPlayButtonProps = ComponentProps<typeof MediaPlayButton>

export const VideoPlayerPlayButton = ({ className, ...props }: VideoPlayerPlayButtonProps) => (
  <MediaPlayButton className={cn("p-2.5", className)} {...(props as any)} />
)

export type VideoPlayerSeekBackwardButtonProps = ComponentProps<typeof MediaSeekBackwardButton>

export const VideoPlayerSeekBackwardButton = ({
  className,
  ...props
}: VideoPlayerSeekBackwardButtonProps) => (
  <MediaSeekBackwardButton className={cn("p-2.5", className)} {...(props as any)} />
)

export type VideoPlayerSeekForwardButtonProps = ComponentProps<typeof MediaSeekForwardButton>

export const VideoPlayerSeekForwardButton = ({
  className,
  ...props
}: VideoPlayerSeekForwardButtonProps) => (
  <MediaSeekForwardButton className={cn("p-2.5", className)} {...(props as any)} />
)

export type VideoPlayerMuteButtonProps = ComponentProps<typeof MediaMuteButton>

export const VideoPlayerMuteButton = ({ className, ...props }: VideoPlayerMuteButtonProps) => (
  <MediaMuteButton className={cn("p-2.5", className)} {...(props as any)} />
)

//

export type VideoPlayerAirplayButtonProps = ComponentProps<typeof MediaAirplayButton>

export const VideoPlayerAirplayButton = ({ className, ...props }: VideoPlayerAirplayButtonProps) => (
  <MediaAirplayButton className={cn("p-2.5", className)} {...(props as any)} />
)

export type VideoPlayerCaptionsButtonProps = ComponentProps<typeof MediaCaptionsButton>

export const VideoPlayerCaptionsButton = ({ className, ...props }: VideoPlayerCaptionsButtonProps) => (
  <MediaCaptionsButton className={cn("p-2.5", className)} {...(props as any)} />
)

export type VideoPlayerCastButtonProps = ComponentProps<typeof MediaCastButton>

export const VideoPlayerCastButton = ({ className, ...props }: VideoPlayerCastButtonProps) => (
  <MediaCastButton className={cn("p-2.5", className)} {...(props as any)} />
)

export type VideoPlayerChromeButtonProps = ComponentProps<typeof MediaChromeButton>

export const VideoPlayerChromeButton = ({ className, ...props }: VideoPlayerChromeButtonProps) => (
  <MediaChromeButton className={cn("p-2.5", className)} {...(props as any)} />
)

export type VideoPlayerChromeDialogProps = ComponentProps<typeof MediaChromeDialog>

export const VideoPlayerChromeDialog = ({ className, ...props }: VideoPlayerChromeDialogProps) => (
  <MediaChromeDialog className={className} {...(props as any)} />
)

export type VideoPlayerChromeRangeProps = ComponentProps<typeof MediaChromeRange>

export const VideoPlayerChromeRange = ({ className, ...props }: VideoPlayerChromeRangeProps) => (
  <MediaChromeRange className={cn("p-2.5", className)} {...(props as any)} />
)

export type VideoPlayerContainerProps = ComponentProps<typeof MediaContainer>

export const VideoPlayerContainer = ({ className, ...props }: VideoPlayerContainerProps) => (
  <MediaContainer className={className} {...(props as any)} />
)

export type VideoPlayerDurationDisplayProps = ComponentProps<typeof MediaDurationDisplay>

export const VideoPlayerDurationDisplay = ({ className, ...props }: VideoPlayerDurationDisplayProps) => (
  <MediaDurationDisplay className={cn("p-2.5", className)} {...(props as any)} />
)

export type VideoPlayerErrorDialogProps = ComponentProps<typeof MediaErrorDialog>

export const VideoPlayerErrorDialog = ({ className, ...props }: VideoPlayerErrorDialogProps) => (
  <MediaErrorDialog className={className} {...(props as any)} />
)

export type VideoPlayerFullscreenButtonProps = ComponentProps<typeof MediaFullscreenButton>

interface WebkitFullscreenVideo extends HTMLVideoElement {
  webkitEnterFullscreen?: () => void
  webkitSupportsFullscreen?: boolean
}

export function VideoPlayerFullscreenButton({
  className,
  onClick,
  ...props
}: VideoPlayerFullscreenButtonProps) {
  function handleClick(event: ReactMouseEvent<HTMLElement>) {
    onClick?.(event as never)

    if (event.defaultPrevented || document.fullscreenEnabled) {
      return
    }

    const controller = event.currentTarget.closest("media-controller")
    const video = controller?.querySelector<WebkitFullscreenVideo>(
      'video[slot="media"]',
    )

    if (
      video?.webkitEnterFullscreen &&
      video.webkitSupportsFullscreen !== false
    ) {
      video.webkitEnterFullscreen()
    }
  }

  return (
    <MediaFullscreenButton
      className={cn("p-2.5", className)}
      onClick={handleClick}
      {...(props as any)}
    />
  )
}

export type VideoPlayerGestureReceiverProps = ComponentProps<typeof MediaGestureReceiver>

export const VideoPlayerGestureReceiver = ({ className, ...props }: VideoPlayerGestureReceiverProps) => (
  <MediaGestureReceiver className={className} {...(props as any)} />
)

export type VideoPlayerKeyboardShortcutsDialogProps = ComponentProps<typeof MediaKeyboardShortcutsDialog>

export const VideoPlayerKeyboardShortcutsDialog = ({
  className,
  ...props
}: VideoPlayerKeyboardShortcutsDialogProps) => (
  <MediaKeyboardShortcutsDialog className={className} {...(props as any)} />
)

export type VideoPlayerLiveButtonProps = ComponentProps<typeof MediaLiveButton>

export const VideoPlayerLiveButton = ({ className, ...props }: VideoPlayerLiveButtonProps) => (
  <MediaLiveButton className={cn("p-2.5", className)} {...(props as any)} />
)

export type VideoPlayerLoopButtonProps = ComponentProps<typeof MediaLoopButton>

export const VideoPlayerLoopButton = ({ className, ...props }: VideoPlayerLoopButtonProps) => (
  <MediaLoopButton className={cn("p-2.5", className)} {...(props as any)} />
)

export type VideoPlayerPipButtonProps = ComponentProps<typeof MediaPipButton>

export const VideoPlayerPipButton = ({ className, ...props }: VideoPlayerPipButtonProps) => (
  <MediaPipButton className={cn("p-2.5", className)} {...(props as any)} />
)

export type VideoPlayerLoadingIndicatorProps = ComponentProps<typeof MediaLoadingIndicator>

export const VideoPlayerLoadingIndicator = ({
  className,
  ...props
}: VideoPlayerLoadingIndicatorProps) => (
  <MediaLoadingIndicator className={className} {...(props as any)} />
)

export type VideoPlayerPosterImageProps = ComponentProps<typeof MediaPosterImage>

export const VideoPlayerPosterImage = ({ className, ...props }: VideoPlayerPosterImageProps) => (
  <MediaPosterImage className={className} {...(props as any)} />
)

export type VideoPlayerPreviewChapterDisplayProps = ComponentProps<typeof MediaPreviewChapterDisplay>

export const VideoPlayerPreviewChapterDisplay = ({
  className,
  ...props
}: VideoPlayerPreviewChapterDisplayProps) => (
  <MediaPreviewChapterDisplay className={className} {...(props as any)} />
)

export type VideoPlayerPreviewThumbnailProps = ComponentProps<typeof MediaPreviewThumbnail>

export const VideoPlayerPreviewThumbnail = ({
  className,
  ...props
}: VideoPlayerPreviewThumbnailProps) => (
  <MediaPreviewThumbnail className={className} {...(props as any)} />
)

export type VideoPlayerPlaybackRateButtonProps = ComponentProps<typeof MediaPlaybackRateButton>

export const VideoPlayerPlaybackRateButton = ({
  className,
  ...props
}: VideoPlayerPlaybackRateButtonProps) => (
  <MediaPlaybackRateButton className={cn("p-2.5", className)} {...(props as any)} />
)

export type VideoPlayerTooltipProps = ComponentProps<typeof MediaTooltip>

export const VideoPlayerTooltip = ({ className, ...props }: VideoPlayerTooltipProps) => (
  <MediaTooltip className={className} {...(props as any)} />
)

export type VideoPlayerTextDisplayProps = ComponentProps<typeof MediaTextDisplay>

export const VideoPlayerTextDisplay = ({ className, ...props }: VideoPlayerTextDisplayProps) => (
  <MediaTextDisplay className={cn("p-2.5", className)} {...(props as any)} />
)

export type VideoPlayerPreviewTimeDisplayProps = ComponentProps<typeof MediaPreviewTimeDisplay>

export const VideoPlayerPreviewTimeDisplay = ({
  className,
  ...props
}: VideoPlayerPreviewTimeDisplayProps) => (
  <MediaPreviewTimeDisplay className={cn("p-2.5", className)} {...(props as any)} />
)

export type VideoPlayerContentProps = ComponentProps<"video">

export function VideoPlayerContent({
  className,
  ...props
}: VideoPlayerContentProps) {
  return (
    <video
      slot="media"
      playsInline
      className={cn("m-0 block size-full object-contain", className)}
      {...props}
    />
  )
}

// Demo
export function Demo() {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <VideoPlayer className="rounded-lg overflow-hidden border">
          {/* biome-ignore lint/a11y/useMediaCaption: demo video */}
          <video
            slot="media"
            src="https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/high.mp4"
            poster="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=0"
            suppressHydrationWarning
          />
          <VideoPlayerControlBar>
            <VideoPlayerPlayButton />
            <VideoPlayerTimeRange />
            <VideoPlayerTimeDisplay showDuration />
            <VideoPlayerMuteButton />
            <VideoPlayerVolumeRange />
          </VideoPlayerControlBar>
        </VideoPlayer>
      </div>
    </div>
  )
}
