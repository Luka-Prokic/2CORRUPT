import React, { useMemo } from "react";
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  ScrollView,
  type StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import {
  Edge,
  type Edges,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import * as ScreenOrientation from "expo-screen-orientation";
import { useOrientation } from "./orientation";

export type ScreenContentProps = {
  /**
   * Safe area edges to apply padding for. Controls which screen edges get safe area insets.
   */
  edges?: Edges;

  /**
   * Whether to wrap content in a ScrollView for scrollable content.
   * @default true
   */
  scroll?: boolean;

  /**
   * If true, ScreenContent will include top padding equal to header height.
   *
   * This is useful when header is transparent.
   *
   * @default false
   */
  headerTopPadding?: boolean;

  /**
   * Configuration for KeyboardAvoidingView behavior. Disabled by default.
   *
   * ```tsx
   * <ScreenContent
   *   keyboardAvoidingView={{
   *     enabled: true,
   *     keyboardVerticalOffset: 130,
   *   }}
   * >
   * ```
   */
  keyboardAvoidingView?: KeyboardAvoidingViewProps;

  /**
   * Style applied to the root container View.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Style applied to ScrollView's contentContainerStyle. Only used when scroll = true.
   */
  contentContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Optional header component rendered at the top of the screen content.
   */
  HeaderComponent?: React.ReactNode;

  /**
   * Optional footer component rendered at the bottom of the screen content.
   */
  FooterComponent?: React.ReactNode;

  children?: React.ReactNode;
};

/**
 * A comprehensive screen wrapper component that handles safe areas, scrolling, and keyboard avoidance.
 *
 * ## Usage
 *
 * ```
 * <ScreenContent
 *   scroll={true}
 *   edges={['bottom']}
 *   keyboardAvoidingView={{
 *     enabled: true,
 *     keyboardVerticalOffset: 130,
 *   }}
 * ```
 *
 * @todo Create prop: BgComponent
 * @returns A memoized screen wrapper component
 */
export const ScreenContent = React.memo(function ScreenContent({
  children,
  style,
  contentContainerStyle,
  edges = [],
  scroll = true,
  headerTopPadding = false,
  keyboardAvoidingView,
  HeaderComponent,
  FooterComponent,
}: ScreenContentProps) {
  const { orientation } = useOrientation();
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets(); // Different per orientation

  // WARNING: SafeAreaView was not used because its buggy with Expo Router
  const safeStyle = useMemo(() => {
    const rval: ViewStyle = {};

    if (includesEdge(edges, "top")) rval.paddingTop = insets.top;
    if (includesEdge(edges, "bottom")) rval.paddingBottom = insets.bottom;
    if (includesEdge(edges, "left")) {
      if (orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
        rval.paddingLeft = insets.left;
      }
    }
    if (includesEdge(edges, "right")) {
      if (orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT) {
        rval.paddingRight = insets.right;
      }
    }

    if (headerTopPadding) rval.paddingTop = headerHeight;

    return rval;
  }, [
    edges,
    orientation,
    headerHeight,
    headerTopPadding,
    insets.bottom,
    insets.left,
    insets.right,
    insets.top,
  ]);

  return (
    <View style={[styles.flex, safeStyle, style]}>
      <KeyboardAvoidingView
        enabled={false}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={headerHeight}
        style={styles.flex}
        {...keyboardAvoidingView}
      >
        {HeaderComponent}
        {scroll ? (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={[
              styles.scrollContentStyle,
              contentContainerStyle,
            ]}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          children
        )}
        {FooterComponent}
      </KeyboardAvoidingView>
    </View>
  );
});

function includesEdge(edgesArray: Edges, edge: Edge): boolean {
  return (edgesArray as string[]).includes(edge);
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContentStyle: {
    // padding: 15,
    gap: 16,
  },
});
