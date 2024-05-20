import {
  useLogger,
  useMeetingManager,
  useVideoInputs,
} from 'amazon-chime-sdk-component-library-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

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

export { CameraSelection }
