import type { DeviceType } from 'amazon-chime-sdk-component-library-react/lib/types'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function DeviceSelection({
  onValueChange,
  devices,
  placeholder,
}: {
  onValueChange: (value: string) => void
  devices: DeviceType[]
  placeholder: string
}) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {devices.map((device) => (
          <SelectItem
            key={device.deviceId}
            value={device.deviceId || 'no available device'}
          >
            {device.label ?? 'No available device'}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { DeviceSelection }
