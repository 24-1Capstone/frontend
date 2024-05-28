import {
  useAudioOutputs,
  useLogger,
  useMeetingManager,
} from 'amazon-chime-sdk-component-library-react'
import { DeviceSelection } from '@/components/chime/device-selection'

function SpeakerSelection() {
  const logger = useLogger()
  const { devices, selectedDevice } = useAudioOutputs()
  const meetingManager = useMeetingManager()

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
      placeholder={selectedDevice?.toString() || 'Select a speaker'}
    />
  )
}

export { SpeakerSelection }
