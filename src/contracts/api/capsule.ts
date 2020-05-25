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
