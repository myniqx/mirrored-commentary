import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/icon.png")} // Logonuzun yolunu buraya ekleyin
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
        />
      </View>

      <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
        <Title style={{ marginBottom: 20 }}>İçerik</Title>

        <ScrollView
          style={{
            minHeight: 300,
            flexGrow: 1,
          }}
        >
          <Button
            style={{ marginBottom: 10 }}
            onPress={() => router.push("/quran")}
          >
            <Text style={{ color: "#007bff" }}>Quran Arabic</Text>
          </Button>
        </ScrollView>

        <Card style={{ marginVertical: 20 }}>
          <Card.Content>
            <Paragraph style={{ fontStyle: "italic", textAlign: "center" }}>
              "Başarı, her zaman büyük bir çabanın sonucudur."
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

export default HomeScreen;
