import {
  useAudioOutputs,
  useLogger,
  useMeetingManager,
} from 'amazon-chime-sdk-component-library-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

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
    <Select onValueChange={handleSelect}>
      <SelectTrigger>
        <SelectValue placeholder={selectedDevice?.toString()} />
      </SelectTrigger>
      <SelectContent>
        {devices.map((device) => (
          <SelectItem key={device.deviceId} value={device.deviceId}>
            {device.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { SpeakerSelection }
