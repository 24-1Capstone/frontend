'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import {
  AudioVideoFacade,
  VoiceFocusTransformDevice,
} from 'amazon-chime-sdk-js'
import {
  useToggleLocalMute,
  useAudioVideo,
  useAudioInputs,
  useLogger,
  useMeetingManager,
  useVoiceFocus,
  isOptionActive,
} from 'amazon-chime-sdk-component-library-react'
import { ChevronUpIcon, LoaderIcon, MicIcon, MicOffIcon } from 'lucide-react'

import useMemoCompare from '@/lib/use-memo-compare'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

function AudioInputVFControl() {
  const logger = useLogger()
  const audioVideo = useAudioVideo()
  const meetingManager = useMeetingManager()
  const [isLoading, setIsLoading] = useState(false)
  const [isVoiceFocusChecked, setIsVoiceFocusChecked] = useState(false)
  const [isVoiceFocusEnabled, setIsVoiceFocusEnabled] = useState(false)
  const [dropdownWithVFOptions, setDropdownWithVFOptions] = useState<
    ReactNode[] | null
  >(null)
  const { muted, toggleMute } = useToggleLocalMute()
  const { isVoiceFocusSupported, addVoiceFocus } = useVoiceFocus()
  const { devices, selectedDevice } = useAudioInputs()

  const audioInputDevices: {
    deviceId: string
    label: string
  }[] = useMemoCompare(devices, (prev, next) => {
    return JSON.stringify(prev) === JSON.stringify(next)
  })

  useEffect(() => {
    logger.info(
      `Amazon Voice Focus is ${isVoiceFocusEnabled ? 'enabled' : 'disabled'}.`,
    )
  }, [isVoiceFocusEnabled])

  useEffect(() => {
    if (selectedDevice instanceof VoiceFocusTransformDevice) {
      setIsVoiceFocusEnabled(true)
    } else {
      setIsVoiceFocusEnabled(false)
    }
    return () => {
      if (selectedDevice instanceof VoiceFocusTransformDevice) {
        selectedDevice.stop()
      }
    }
  }, [selectedDevice])

  useEffect(() => {
    if (!audioVideo) {
      return
    }
    if (
      selectedDevice instanceof VoiceFocusTransformDevice &&
      isVoiceFocusEnabled
    ) {
      selectedDevice.observeMeetingAudio(audioVideo as AudioVideoFacade)
    }
  }, [audioVideo, isVoiceFocusEnabled, selectedDevice])

  useEffect(() => {
    const handleClick = async (deviceId: string): Promise<void> => {
      try {
        if (isVoiceFocusChecked && !isLoading) {
          setIsLoading(true)
          const receivedDevice = deviceId
          const currentDevice = await addVoiceFocus(receivedDevice)
          await meetingManager.startAudioInputDevice(currentDevice)
        } else {
          await meetingManager.startAudioInputDevice(deviceId)
        }
      } catch (error) {
        logger.error('AudioInputVFControl failed to select audio input device')
      } finally {
        setIsLoading(false)
      }
    }

    const getDropdownWithVFOptions = async (): Promise<void> => {
      const dropdownOptions: ReactNode[] = await Promise.all(
        audioInputDevices.map(async (device) => (
          <DropdownMenuCheckboxItem
            key={device.deviceId}
            checked={await isOptionActive(selectedDevice, device.deviceId)}
            onClick={async () => await handleClick(device.deviceId)}
          >
            <span>{device.label}</span>
          </DropdownMenuCheckboxItem>
        )),
      )

      if (isVoiceFocusSupported) {
        const vfOption: ReactNode = (
          <DropdownMenuCheckboxItem
            key="voicefocus"
            checked={isVoiceFocusEnabled}
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true)
              setIsVoiceFocusChecked((current) => !current)
            }}
          >
            <>
              {isLoading && <LoaderIcon className="h-6 w-6 animate-spin" />}
              배경 소음 억제
            </>
          </DropdownMenuCheckboxItem>
        )
        dropdownOptions?.push(<DropdownMenuSeparator key="separator" />)
        dropdownOptions?.push(vfOption)
      }

      setDropdownWithVFOptions(dropdownOptions)
    }

    getDropdownWithVFOptions()
  }, [
    addVoiceFocus,
    meetingManager,
    meetingManager.startAudioInputDevice,
    audioInputDevices,
    isLoading,
    isVoiceFocusEnabled,
    isVoiceFocusChecked,
    isVoiceFocusSupported,
    selectedDevice,
  ])

  useEffect(() => {
    const onVFCheckboxChange = async (): Promise<void> => {
      if (!selectedDevice) {
        return
      }

      try {
        let current = selectedDevice
        if (isVoiceFocusChecked) {
          logger.info('User turned on Amazon Voice Focus.')
          if (typeof selectedDevice === 'string') {
            current = await addVoiceFocus(selectedDevice)
          }
        } else {
          logger.info(
            'Amazon Voice Focus is off by default or user turned off Amazon Voice Focus.',
          )
          if (selectedDevice instanceof VoiceFocusTransformDevice) {
            current = selectedDevice.getInnerDevice()
          }
        }
        await meetingManager.startAudioInputDevice(current)
      } catch (error) {
        logger.error(
          'AudioInputVFControl failed to select audio input device onVFCheckboxChange change',
        )
      }
      setIsLoading(false)
    }

    onVFCheckboxChange()
  }, [isVoiceFocusChecked])

  return (
    <div>
      <Button
        aria-label={muted ? 'Unmute' : 'Mute'}
        onClick={toggleMute}
        size="icon"
        className="rounded-full"
      >
        {muted ? <MicOffIcon /> : <MicIcon />}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronUpIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>{dropdownWithVFOptions}</DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export { AudioInputVFControl }
