'use client'

import { useEffect, useState } from 'react'
import {
  getDeviceId,
  useLogger,
  useMeetingManager,
  useVideoInputs,
} from 'amazon-chime-sdk-component-library-react'

import { DeviceSelection } from '@/components/chime/device-selection'

function CameraSelection() {
  const logger = useLogger()
  const { devices, selectedDevice } = useVideoInputs()
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
      await meetingManager.startVideoInputDevice(value)
    } catch (error) {
      logger.error('CameraSelection failed to select camera')
    }
  }

  return (
    <DeviceSelection
      onValueChange={handleSelect}
      devices={devices}
      placeholder={selectedDeviceLabel || '카메라를 선택해주세요.'}
    />
  )
}

export { CameraSelection }
