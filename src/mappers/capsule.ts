/* eslint-disable @typescript-eslint/camelcase */
import { APICapsule, SpaceXCapsule } from '../contracts';

export const mapSpaceXCapsuleToAPICapsule = (
  capsule: SpaceXCapsule,
): APICapsule => {
  const {
    capsule_serial,
    capsule_id,
    status,
    original_launch,
    original_launch_unix,
    landings,
    type,
    details,
    reuse_count,
  } = capsule;
  return {
    id: capsule_serial,
    capsuleId: capsule_id,
    status,
    originalLaunch: original_launch,
    originalLaunchUnix: original_launch_unix,
    landings,
    type,
    details,
    reuseCount: reuse_count,
  };
};
