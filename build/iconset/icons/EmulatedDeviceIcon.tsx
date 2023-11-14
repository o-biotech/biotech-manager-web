import { Icon, IconProps } from "./icon.deps.ts"

export function EmulatedDeviceIcon(props: IconProps) {
  return <Icon {...props} src="/./iconset/icons" icon="emulated-device" />;
}
