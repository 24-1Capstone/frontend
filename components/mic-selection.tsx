import {
  useAudioInputs,
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

export { MicSelection }
