import React from "react";
import { Text, View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { useSettingsStore } from "../stores/settingsStore";
import IList from "../components/ui/containers/IList";
import OptionButton from "../components/ui/buttons/OptionButton";
import BounceButton from "../components/ui/buttons/BounceButton";
import IButton from "../components/ui/buttons/IButton";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const widgetSize = (width - 40) / 2; // 2 columns with padding

export default function StashScreen() {
  const { theme } = useSettingsStore();

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      <ScrollView
        style={[styles.container]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          <Text
            style={{
              color: theme.text,
              fontSize: 36,
              fontWeight: "bold",
              marginBottom: 16,
            }}
          >
            Workout #22
          </Text>
          <IList
            label="exercises"
            background={theme.primaryBackground}
            hrStart="Standard"
          >
            <OptionButton title="Barbell Row" onPress={() => {}} height={44} />
            <OptionButton title="Chest Press" onPress={() => {}} height={44} />
            <OptionButton title="Chest Fly" onPress={() => {}} height={44} />
            <OptionButton title="Push Press" onPress={() => {}} height={44} />
            <OptionButton
              title="Overhead Press"
              onPress={() => {}}
              height={44}
            />
            <OptionButton title="Pull Up" onPress={() => {}} height={44} />
          </IList>
          <BounceButton
            title="Add Exercise"
            onPress={() => {}}
            style={{
              width: width - 32,
              height: 44,
              borderRadius: 22,
              marginTop: 16,
            }}
            color={theme.primaryBackground}
            textColor={theme.text}
          />

          <View
            style={{
              flexDirection: "row",
              gap: 16,
              marginTop: 16,
              width: "100%",
            }}
          >
            <IButton
              title="Add Superset"
              onPress={() => {}}
              style={{ width: width / 2 - 24, height: 44, borderRadius: 22 }}
              color={theme.primaryBackground}
              textColor={theme.text}
            />
            <IButton
              title="Add Exercise"
              onPress={() => {}}
              style={{ width: width / 2 - 24, height: 44, borderRadius: 22 }}
              color={theme.tint}
              textColor={theme.secondaryText}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  widget: {
    marginBottom: 8,
  },
  lilWidget: {
    marginBottom: 8,
    borderRadius: 24,
  },
  fullWidth: {
    width: "100%",
  },
  compactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  miniRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  achievementRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
});
