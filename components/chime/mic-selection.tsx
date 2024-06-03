import {
  useAudioInputs,
  useLogger,
  useMeetingManager,
} from 'amazon-chime-sdk-component-library-react'

import { DeviceSelection } from '@/components/chime/device-selection'

function MicSelection() {
  const logger = useLogger()
  const { devices, selectedDevice } = useAudioInputs()
  const meetingManager = useMeetingManager()

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
      placeholder={selectedDevice?.toString() || '마이크를 선택해주세요.'}
    />
  )
}

export { MicSelection }
