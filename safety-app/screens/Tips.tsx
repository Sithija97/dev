import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Card } from "../components/";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { SafetyTip, safetyTips } from "../data/safetyTips";

export const Tips = () => {
  return (
    <>
      <View
        style={{ marginHorizontal: 22, marginTop: 15, marginVertical: -35 }}
      >
        {/* <Text style={styles.headerTitle}>
          "Traveling alone as a woman can be a wonderful and empowering
          experience, but it's important to prioritize safety. Here are some
          safety tips to consider:"
        </Text> */}
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={safetyTips}
          keyExtractor={(item: SafetyTip, index: number) => {
            return item.id.toString();
          }}
          renderItem={({ item, index }: { item: SafetyTip; index: number }) => {
            return <Card safetyTip={item} />;
          }}
          ListHeaderComponentStyle={{ backgroundColor: "#ccc" }}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#DDD",
  },
  header: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1DA1F2",
  },
  footer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  footerTitle: {
    padding: 8,
    borderRadius: 12,
    fontSize: 12,
  },
  emptyComponentTitle: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  emptyComponentSubtitle: {
    color: "#808080",
    padding: 8,
    fontSize: 14,
    textAlign: "center",
  },
  emptyComponent: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
