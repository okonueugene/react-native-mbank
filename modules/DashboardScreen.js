import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  DrawerLayoutAndroid
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MenuScreen from "./MenuScreen";
import ApiManager from "../api/ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DashboardScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dashboardStats, setDashboardStats] = useState(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    // Fetch dashboard stats when component mounts
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch api token
      const token = await AsyncStorage.getItem("token");
      console.log(token);

      // Fetch dashboard stats
      const response = await ApiManager.get("/dashboard-stats", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Set dashboard stats
    //   {
    //     "attendance": 0,
    //     "tasks": 0,
    //     "incidents": 0,
    //     "icas": 0,
    //     "sors": 0,
    //     "supervisor": "No Supervisor Assigned",
    //     "personells": 0,
    //     "fire_marshal": "No Fire Marshal Assigned",
    //     "first_aider": "No First Aider Assigned"
    // }

      setDashboardStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    if (!isDrawerOpen) {
      drawerRef.current.openDrawer();
    } else {
      drawerRef.current.closeDrawer();
    }
  };

  const handleOutsideTouch = () => {
    closeDrawer(); // Close the drawer when touched outside
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    drawerRef.current.closeDrawer();
  };

  const navigationView = () => <MenuScreen closeDrawer={closeDrawer} />;

  return (
    <View style={{ flex: 1 }}>
      <DrawerLayoutAndroid
        ref={drawerRef}
        drawerWidth={200}
        drawerPosition="left"
        renderNavigationView={navigationView}
      >
        {/* Wrap the content in a ScrollView */}
        <ScrollView
          contentContainerStyle={styles.container}
          onTouchStart={handleOutsideTouch} // Handle touch outside drawer
          onScrollBeginDrag={handleOutsideTouch} // Handle scroll outside drawer
        >
          <TouchableOpacity style={styles.menu} onPress={toggleDrawer}>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
          {/* Content */}
          <View style={styles.content}>
            {/* First Row */}
            <View style={styles.row}>
              <View style={styles.card}>
                <Text style={styles.cardHeader}>Site Name</Text>
                <View style={styles.cardBody}>
                  <Text style={styles.cardContent}>Test</Text>
                </View>
                <Text style={styles.cardFooter}></Text>
              </View>
              {/* Add other cards here */}
              <View style={styles.card}>
                <Text style={styles.cardHeader}>Supervisor’s Detail</Text>
                <View style={styles.cardBody}>
                  <Text style={styles.cardContent}>{dashboardStats?.supervisor}</Text>
                </View>
                <Text style={styles.cardFooter}></Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardHeader}>Fire Martial’s Detail</Text>
                <View style={styles.cardBody}>
                  <Text style={styles.cardContent}>{dashboardStats?.fire_marshal}</Text>
                </View>
                <Text style={styles.cardFooter}></Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardHeader}>First Aider’s Detail</Text>
                <View style={styles.cardBody}>
                  <Text style={styles.cardContent}>{dashboardStats?.first_aider}</Text>
                </View>
                <Text style={styles.cardFooter}></Text>
              </View>
            </View>
            {/* Second Row */}
            <View style={styles.row}>
              <View style={styles.card}>
                <Text style={styles.cardHeader}>
                  Live Number Of People On Site
                </Text>
                <View style={styles.cardBody}>
                  <Text style={styles.cardContent}>{dashboardStats?.personells}</Text>
                </View>
                <Text style={styles.cardFooter}></Text>
              </View>
              {/* Add other cards here */}
              <View style={styles.card}>
                <Text style={styles.cardHeader}>Tasks Of The Day</Text>
                <View style={styles.cardBody}>
                  <Text style={styles.cardContent}>{dashboardStats?.tasks}</Text>
                </View>
                <Text style={styles.cardFooter}></Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardHeader}>Incidents Recorded</Text>
                <View style={styles.cardBody}>
                  <Text style={styles.cardContent}>{dashboardStats?.incidents}</Text>
                </View>
                <Text style={styles.cardFooter}></Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardHeader}>
                  Immediate Corrective Actions
                </Text>
                <View style={styles.cardBody}>
                  <Text style={styles.cardContent}>{dashboardStats?.icas}</Text>
                </View>
                <Text style={styles.cardFooter}></Text>
              </View>
            </View>
            {/* Third Row */}
            <View style={styles.row}>
              <View style={styles.card}>
                <Text style={styles.cardHeader}>Safety Observation Record</Text>
                <View style={styles.cardBody}>
                  <Text style={styles.cardContent}>{dashboardStats?.sors}</Text>
                </View>
                <Text style={styles.cardFooter}></Text>
              </View>
              {/* Add other cards here */}
              <View style={styles.card}>
                <Text style={styles.cardHeader}>Environmental Concerns</Text>
                <View style={styles.cardBody}>
                  <Text style={styles.cardContent}></Text>
                </View>
                <Text style={styles.cardFooter}></Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardHeader}>Permits Applicable</Text>
                <View style={styles.cardBody}>
                  <Text style={styles.cardContent}></Text>
                </View>
                <Text style={styles.cardFooter}></Text>
              </View>
            </View>
          </View>
          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>OptiSafe Health & Safety</Text>
            <Text style={styles.footerText}>
              © 2024 OptiSafe Ltd. All rights reserved.
            </Text>
          </View>
        </ScrollView>
      </DrawerLayoutAndroid>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  menu: {
    padding: 10,
    backgroundColor: "#fff",
    position: "absolute",
    zIndex: 1,
    marginBottom: 10
  },
  content: {
    paddingHorizontal: 10,
    paddingTop: 10,
    marginTop: 40
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 15
  },
  cardHeader: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center"
  },
  cardBody: {
    marginBottom: 10
  },
  cardContent: {
    fontSize: 14,
    textAlign: "center"
  },
  cardFooter: {
    fontSize: 14,
    color: "#666"
  },
  footer: {
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 10,
    alignItems: "center"
  },
  footerText: {
    color: "#666",
    textAlign: "center"
  }
});

export default DashboardScreen;
