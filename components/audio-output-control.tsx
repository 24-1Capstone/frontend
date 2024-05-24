'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { DefaultBrowserBehavior } from 'amazon-chime-sdk-js'
import {
  useAudioOutputs,
  useLocalAudioOutput,
  useLogger,
  useMeetingManager,
  isOptionActive,
} from 'amazon-chime-sdk-component-library-react'
import { ChevronUpIcon, Volume2Icon, VolumeXIcon } from 'lucide-react'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

function AudioOutputControl() {
  const logger = useLogger()
  const meetingManager = useMeetingManager()
  const { devices, selectedDevice } = useAudioOutputs()
  const { isAudioOn, toggleAudio } = useLocalAudioOutput()
  const [dropdownWithAudioOutputOptions, setDropdownWithAudioOutputOptions] =
    useState<ReactNode[] | null>(null)

  useEffect(() => {
    const handleClick = async (deviceId: string): Promise<void> => {
      try {
        if (new DefaultBrowserBehavior().supportsSetSinkId()) {
          await meetingManager.startAudioOutputDevice(deviceId)
        } else {
          logger.error(
            'AudioOutputControl cannot select audio output device because browser does not support setSinkId operation.',
          )
        }
      } catch (error) {
        logger.error('AudioOutputControl failed to select audio output device')
      }
    }

    const getDropdownOptions = async (): Promise<void> => {
      const dropdownOptions = await Promise.all(
        devices.map(async (device) => (
          <DropdownMenuCheckboxItem
            key={device.deviceId}
            checked={await isOptionActive(selectedDevice, device.deviceId)}
            onClick={async () => await handleClick(device.deviceId)}
          >
            <span>{device.label}</span>
          </DropdownMenuCheckboxItem>
        )),
      )
      setDropdownWithAudioOutputOptions(dropdownOptions)
    }

    getDropdownOptions()
  }, [
    devices,
    selectedDevice,
    meetingManager,
    meetingManager.startAudioOutputDevice,
  ])

  return (
    <div>
      <Button
        aria-label="Speaker"
        onClick={toggleAudio}
        size="icon"
        className="rounded-full"
      >
        {isAudioOn ? <Volume2Icon /> : <VolumeXIcon />}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronUpIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {dropdownWithAudioOutputOptions}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export { AudioOutputControl }
