'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import {
  isVideoTransformDevice,
  VideoInputDevice,
  VideoTransformDevice,
} from 'amazon-chime-sdk-js'
import {
  useBackgroundBlur,
  useBackgroundReplacement,
  useVideoInputs,
  useLocalVideo,
  useMeetingManager,
  isOptionActive,
  useLogger,
} from 'amazon-chime-sdk-component-library-react'
import {
  CameraIcon,
  CameraOffIcon,
  ChevronUpIcon,
  LoaderIcon,
} from 'lucide-react'

import useMemoCompare from '@/lib/use-memo-compare'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'

export const VideoTransformOptions = {
  None: 'None',
  Blur: 'Background Blur',
  Replacement: 'Background Replacement',
}

function VideoInputTransformControl() {
  const meetingManager = useMeetingManager()
  const logger = useLogger()
  const { devices, selectedDevice } = useVideoInputs()
  const { isVideoEnabled, toggleVideo } = useLocalVideo()
  const { isBackgroundBlurSupported, createBackgroundBlurDevice } =
    useBackgroundBlur()
  const {
    isBackgroundReplacementSupported,
    createBackgroundReplacementDevice,
  } = useBackgroundReplacement()
  const [isLoading, setIsLoading] = useState(false)
  const [
    dropdownWithVideoTransformOptions,
    setDropdownWithVideoTransformOptions,
  ] = useState<ReactNode[] | null>(null)
  const [activeVideoTransformOption, setActiveVideoTransformOption] =
    useState<string>(VideoTransformOptions.None)
  const videoDevices: {
    deviceId: string
    label: string
  }[] = useMemoCompare(
    devices,
    (prev, next) => JSON.stringify(prev) === JSON.stringify(next),
  )

  useEffect(() => {
    resetDeviceToIntrinsic()
  }, [])

  const resetDeviceToIntrinsic = async () => {
    try {
      if (isVideoTransformDevice(selectedDevice)) {
        const intrinsicDevice = await selectedDevice.intrinsicDevice()
        await meetingManager.selectVideoInputDevice(intrinsicDevice)
      }
    } catch (error) {
      logger.error('Failed to reset Device to intrinsic device')
    }
  }

  const toggleBackgroundBlur = async () => {
    let current = selectedDevice
    if (isLoading || current === undefined) {
      return
    }
    try {
      setIsLoading(true)

      if (!isVideoTransformDevice(current)) {
        current = (await createBackgroundBlurDevice(
          current,
        )) as VideoTransformDevice
        logger.info(
          `Video filter turned on - selecting video transform device: ${JSON.stringify(current)}`,
        )
      } else {
        const intrinsicDevice = await current.intrinsicDevice()
        await current.stop()
        current = intrinsicDevice
        if (activeVideoTransformOption === VideoTransformOptions.Replacement) {
          current = (await createBackgroundBlurDevice(
            current,
          )) as VideoTransformDevice
          logger.info(
            `Video filter was turned on - video transform device: ${JSON.stringify(current)}`,
          )
        } else {
          logger.info(
            `Video filter was turned off - selecting inner device: ${JSON.stringify(current)}`,
          )
        }
      }

      if (isVideoEnabled) {
        await meetingManager.startVideoInputDevice(current)
      } else {
        await meetingManager.selectVideoInputDevice(current)
      }

      setActiveVideoTransformOption((activeVideoTransformOption) =>
        activeVideoTransformOption === VideoTransformOptions.Blur
          ? VideoTransformOptions.None
          : VideoTransformOptions.Blur,
      )
    } catch (e) {
      logger.error(`Error trying to toggle background blur ${e}`)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleBackgroundReplacement = async () => {
    let current = selectedDevice
    if (isLoading || current === undefined) {
      return
    }
    try {
      setIsLoading(true)
      if (!isVideoTransformDevice(current)) {
        current = (await createBackgroundReplacementDevice(
          current,
        )) as VideoTransformDevice
        logger.info(
          `Video filter turned on - selecting video transform device: ${JSON.stringify(current)}`,
        )
      } else {
        const intrinsicDevice = await current.intrinsicDevice()
        await current.stop()
        current = intrinsicDevice
        if (activeVideoTransformOption === VideoTransformOptions.Blur) {
          current = (await createBackgroundReplacementDevice(
            current,
          )) as VideoTransformDevice
          logger.info(
            `Video filter turned on - selecting video transform device: ${JSON.stringify(current)}`,
          )
        } else {
          logger.info(
            `Video filter was turned off - selecting inner device: ${JSON.stringify(current)}`,
          )
        }
      }

      if (isVideoEnabled) {
        await meetingManager.startVideoInputDevice(current)
      } else {
        await meetingManager.selectVideoInputDevice(current)
      }

      setActiveVideoTransformOption((activeVideoTransformOption) =>
        activeVideoTransformOption === VideoTransformOptions.Replacement
          ? VideoTransformOptions.None
          : VideoTransformOptions.Replacement,
      )
    } catch (e) {
      logger.error(`Error trying to toggle background replacement ${e}`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const handleClick = async (deviceId: string): Promise<void> => {
      try {
        let newDevice: VideoInputDevice = deviceId
        if (isVideoTransformDevice(selectedDevice) && !isLoading) {
          setIsLoading(true)
          if ('chooseNewInnerDevice' in selectedDevice) {
            // @ts-ignore
            newDevice = selectedDevice.chooseNewInnerDevice(deviceId)
          } else {
            logger.error('Transform device cannot choose new inner device')
            return
          }
        }
        if (isVideoEnabled) {
          await meetingManager.startVideoInputDevice(newDevice)
        } else {
          meetingManager.selectVideoInputDevice(newDevice)
        }
      } catch (error) {
        logger.error(
          'VideoInputTransformControl failed to select video input device',
        )
      } finally {
        setIsLoading(false)
      }
    }

    const getDropdownWithVideoTransformOptions = async (): Promise<void> => {
      const deviceOptions: ReactNode[] = await Promise.all(
        videoDevices.map(async (option) => (
          <DropdownMenuCheckboxItem
            key={option.deviceId}
            checked={await isOptionActive(selectedDevice, option.deviceId)}
            onClick={async () => await handleClick(option.deviceId)}
          >
            <span>{option.label}</span>
          </DropdownMenuCheckboxItem>
        )),
      )

      if (isBackgroundBlurSupported) {
        const videoTransformOptions: ReactNode = (
          <DropdownMenuCheckboxItem
            key="backgroundBlurFilter"
            checked={activeVideoTransformOption === VideoTransformOptions.Blur}
            disabled={isLoading}
            onClick={toggleBackgroundBlur}
          >
            <>
              {isLoading && <LoaderIcon className="h-6 w-6 animate-spin" />}
              Enable Background Blur
            </>
          </DropdownMenuCheckboxItem>
        )
        deviceOptions.push(<DropdownMenuSeparator key="separator1" />)
        deviceOptions.push(videoTransformOptions)
      }

      if (isBackgroundReplacementSupported) {
        const videoTransformOptions: ReactNode = (
          <DropdownMenuCheckboxItem
            key="backgroundReplacementFilter"
            checked={
              activeVideoTransformOption === VideoTransformOptions.Replacement
            }
            disabled={isLoading}
            onClick={toggleBackgroundReplacement}
          >
            <>
              {isLoading && <LoaderIcon className="h-6 w-6 animate-spin" />}
              Enable Background Replacement
            </>
          </DropdownMenuCheckboxItem>
        )
        deviceOptions.push(<DropdownMenuSeparator key="separator2" />)
        deviceOptions.push(videoTransformOptions)
      }

      setDropdownWithVideoTransformOptions(deviceOptions)
    }

    getDropdownWithVideoTransformOptions()
  }, [
    createBackgroundBlurDevice,
    createBackgroundReplacementDevice,
    meetingManager,
    meetingManager.startVideoInputDevice,
    videoDevices,
    isLoading,
    isVideoEnabled,
    selectedDevice,
    isBackgroundBlurSupported,
    isBackgroundReplacementSupported,
  ])

  return (
    <>
      <Button onClick={toggleVideo} size="icon" className="rounded-full">
        {isVideoEnabled ? <CameraIcon /> : <CameraOffIcon />}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronUpIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {dropdownWithVideoTransformOptions}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export { VideoInputTransformControl }
