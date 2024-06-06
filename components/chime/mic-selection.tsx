'use client'

import { useEffect, useState } from 'react'
import {
  getDeviceId,
  useAudioInputs,
  useLogger,
  useMeetingManager,
} from 'amazon-chime-sdk-component-library-react'

import { DeviceSelection } from '@/components/chime/device-selection'

function MicSelection() {
  const logger = useLogger()
  const { devices, selectedDevice } = useAudioInputs()
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
      await meetingManager.startAudioInputDevice(value)
    } catch (error) {
      logger.error('MicSelection failed to select mic')
    }
  }

  return (
    <DeviceSelection
      onValueChange={handleSelect}
      devices={devices}
      placeholder={selectedDeviceLabel || '마이크를 선택해주세요.'}
    />
  )
}

export { MicSelection }
