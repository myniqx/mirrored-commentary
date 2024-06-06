import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";

const HomeScreen = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Proje 1" },
    { id: 2, name: "Proje 2" },
    { id: 3, name: "Proje 3" },
    { id: 4, name: "Proje 4" },
    { id: 5, name: "Proje 5" },
    { id: 6, name: "Proje 6" },
    { id: 7, name: "Proje 7" },
    { id: 8, name: "Proje 8" },
    { id: 9, name: "Proje 9" },
    { id: 10, name: "Proje 10" },
    { id: 11, name: "Proje 11" },
    { id: 12, name: "Proje 12" },
  ]);

  const handleProjectPress = (projectId) => {
    // Proje detaylarına gitmek için navigation kullanın
    console.log(`Proje ${projectId} seçildi`);
  };

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
        <Title style={{ marginBottom: 20 }}>Projeler</Title>

        <ScrollView style={{ maxHeight: 200 }}>
          {projects.map((project) => (
            <Button
              key={project.id}
              style={{ marginBottom: 10 }}
              onPress={() => handleProjectPress(project.id)}
            >
              <Text style={{ color: "#007bff" }}>{project.name}</Text>
            </Button>
          ))}
        </ScrollView>

        <Card style={{ marginTop: 20 }}>
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
