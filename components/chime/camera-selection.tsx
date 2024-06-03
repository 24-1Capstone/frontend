import {
  useLogger,
  useMeetingManager,
  useVideoInputs,
} from 'amazon-chime-sdk-component-library-react'

import { DeviceSelection } from '@/components/chime/device-selection'

function CameraSelection() {
  const logger = useLogger()
  const { devices, selectedDevice } = useVideoInputs()
  const meetingManager = useMeetingManager()

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
      placeholder={selectedDevice?.toString() || '카메라를 선택해주세요.'}
    />
  )
}

export { CameraSelection }
