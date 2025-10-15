import {useEffect} from 'react';
import {useNavigationContainerRef} from 'expo-router';
import {log} from '../../lib/logger';
import isEmpty from 'lodash/isEmpty';

/**
 * Logs to console route path change in dev environment.
 *
 * ## Usage
 *
 * Add hook to root layout.
 *
 * ```
 * useLogRouteChange();
 * ```
 */
export function useLogRouteChange() {
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    if (__DEV__) {
      const unsubscribe = navigationRef.addListener('state', () => {
        const navigationState = navigationRef.getState();
        const deepestRoute = getDeepestRoute(navigationState);

        if (deepestRoute) {
          isEmpty(deepestRoute.params)
            ? log.info(`ROUTE CHANGED : ${deepestRoute.name}`)
            : log.info(
                `ROUTE CHANGED : ${deepestRoute.name}`,
                deepestRoute.params
              );
        }
      });

      return unsubscribe;
    }
  }, [navigationRef]);
}

function getDeepestRoute(state: any): {name: string; params?: any} | null {
  if (!state) return null;

  // If this state has routes, find the active one
  if (state.routes && state.routes.length > 0) {
    const activeRouteIndex = state.index ?? 0;
    const activeRoute = state.routes[activeRouteIndex];

    if (!activeRoute) return null;

    // If the active route has its own state (nested navigator), recurse
    if (activeRoute.state) {
      const deeperRoute = getDeepestRoute(activeRoute.state);
      if (deeperRoute) {
        return deeperRoute;
      }
    }

    // Return the current active route
    return {
      name: activeRoute.name,
      params: activeRoute.params,
    };
  }

  return null;
}
