'use client'

import { useEffect, useState } from 'react'
import {
  useAudioOutputs,
  useLogger,
  useMeetingManager,
  getDeviceId,
} from 'amazon-chime-sdk-component-library-react'

import { DeviceSelection } from '@/components/chime/device-selection'

function SpeakerSelection() {
  const logger = useLogger()
  const { devices, selectedDevice } = useAudioOutputs()
  const meetingManager = useMeetingManager()

  const [selectedDeviceLabel, setSelectedDeviceLabel] = useState<string>('')

  useEffect(() => {
    const getSelectedDeviceLabel = async () => {
      const selectedDeviceId = await getDeviceId(selectedDevice)

      const index = devices.findIndex(
        (device) => device.deviceId === selectedDeviceId,
      )

      setSelectedDeviceLabel(devices[index]?.label)
    }

    getSelectedDeviceLabel()
  }, [selectedDevice])

  const handleSelect = async (value: string) => {
    try {
      await meetingManager.startAudioOutputDevice(value)
    } catch (error) {
      logger.error('SpeakerSelection failed to select speaker')
    }
  }

  return (
    <DeviceSelection
      onValueChange={handleSelect}
      devices={devices}
      placeholder={selectedDeviceLabel || '스피커를 선택해주세요.'}
    />
  )
}

export { SpeakerSelection }
