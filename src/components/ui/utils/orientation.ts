import {useEffect, useState} from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

/**
 * Provides real-time screen orientation information and orientation lock status.
 *
 * ## Usage
 *
 * Basic usage:
 * ```tsx
 * import * as ScreenOrientation from 'expo-screen-orientation';
 *
 * // Both values start as undefined and are populated once the initial orientation is determined
 * const { orientation, orientationLock } = useOrientation();
 *
 * const isLandscape = orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
 *                    orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT;
 *
 * const isPortraitLocked = orientationLock === ScreenOrientation.OrientationLock.PORTRAIT_UP;
 * ```
 *
 * @returns Object containing current orientation and orientation lock information
 */
export function useOrientation() {
  const [orientation, setOrientation] = useState<{
    orientation: ScreenOrientation.Orientation | undefined;
    orientationLock: ScreenOrientation.OrientationLock | undefined;
  }>({
    orientation: undefined,
    orientationLock: undefined,
  });

  useEffect(() => {
    // Get initial orientation and lock
    Promise.all([
      ScreenOrientation.getOrientationAsync(),
      ScreenOrientation.getOrientationLockAsync(),
    ]).then(([initialOrientation, initialOrientationLock]) => {
      setOrientation({
        orientation: initialOrientation,
        orientationLock: initialOrientationLock,
      });
    });

    // Subscribe to orientation change
    const subscription = ScreenOrientation.addOrientationChangeListener(
      (event: ScreenOrientation.OrientationChangeEvent) => {
        setOrientation({
          orientation: event.orientationInfo.orientation,
          orientationLock: event.orientationLock,
        });
      }
    );

    return () => subscription.remove();
  }, []);

  return orientation;
}
