export interface SpaceXCapsule {
  capsule_serial: string;
  capsule_id: string;
  status: string;
  original_launch: string;
  original_launch_unix: number;
  landings: number;
  type: string;
  details: string;
  reuse_count: number;
}

export interface Capsule {
  id: string;
  capsuleId: string;
  status: string;
  originalLaunch: string;
  originalLaunchUnix: number;
  landings: number;
  type: string;
  details: string;
  reuseCount: number;
}
