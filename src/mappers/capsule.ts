import { Capsule, SpaceXCapsule } from '../contracts';

/* eslint-disable @typescript-eslint/camelcase */
export const mapSpaceXCapsuleToCapsule = (capsule: SpaceXCapsule): Capsule => {
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
/* eslint-enable @typescript-eslint/camelcase */
