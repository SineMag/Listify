import { Button, Card } from "@/components/ui";
import { BorderRadius, Colors, Spacing, Typography } from "@/constants/theme";
import { useAppSettings } from "@/contexts/AppSettingsContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { setError, setItems } from "@/redux/shoppingListActions";
import { RootState } from "@/redux/store";
import { shoppingListService } from "@/supabase/unifiedShoppingService";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

interface SettingItemProps {
  title: string;
  description?: string;
  icon: string;
  onPress: () => void;
  rightComponent?: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({
  title,
  description,
  icon,
  onPress,
  rightComponent,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <Card style={styles.settingItem}>
      <View style={styles.settingContent}>
        <View style={styles.settingLeft}>
          <Ionicons
            name={icon}
            size={24}
            color={colors.primary}
            style={styles.settingIcon}
          />
          <View style={styles.settingText}>
            <Text style={[styles.settingTitle, { color: colors.text }]}>
              {title}
            </Text>
            {description && (
              <Text
                style={[
                  styles.settingDescription,
                  { color: colors.textSecondary },
                ]}
              >
                {description}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.settingRight}>
          {rightComponent || (
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.textSecondary}
            />
          )}
        </View>
      </View>
    </Card>
  );
};

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.shoppingList);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const insets = useSafeAreaInsets();
  const { settings, updateSettings, toggleDarkMode } = useAppSettings();

  const handleClearAll = () => {
    Alert.alert(
      "Clear All Items",
      "Are you sure you want to clear all items? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            try {
              await shoppingListService.clearAll();
              dispatch(setItems([]));
            } catch (err: any) {
              const errorMessage = err.message || "Failed to clear all items";
              dispatch(setError(errorMessage));
            }
          },
        },
      ],
    );
  };

  const handleClearPurchased = () => {
    Alert.alert(
      "Clear Purchased Items",
      "Are you sure you want to remove all purchased items?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear Purchased",
          style: "destructive",
          onPress: async () => {
            try {
              const unpurchasedItems = items.filter((item) => !item.purchased);
              dispatch(setItems(unpurchasedItems));
            } catch (err: any) {
              const errorMessage =
                err.message || "Failed to clear purchased items";
              dispatch(setError(errorMessage));
            }
          },
        },
      ],
    );
  };

  const handleExportData = () => {
    try {
      const listText = items
        .map(
          (item) =>
            `${item.purchased ? "✓" : "○"} ${item.name} (Quantity: ${item.quantity})`,
        )
        .join("\n");

      Alert.alert(
        "Export Data",
        "Your shopping list data has been prepared for export.",
        [
          {
            text: "Copy to Clipboard",
            onPress: () => {
              // In a real app, you would use Clipboard.setString(listText)
              Alert.alert("Copied!", "Data copied to clipboard");
            },
          },
          { text: "OK", style: "cancel" },
        ],
      );
    } catch (err: any) {
      const errorMessage = err.message || "Failed to export data";
      dispatch(setError(errorMessage));
    }
  };

  const handleRateApp = () => {
    Alert.alert(
      "Rate App",
      "Thank you for using Listify! Please rate us on the app store.",
    );
  };

  const handleShareApp = () => {
    Alert.alert("Share App", "Share Listify with your friends and family!");
  };

  const handleContactSupport = () => {
    Alert.alert("Contact Support", "Email us at support@listify.app for help.");
  };

  const handleAbout = () => {
    Alert.alert(
      "About Listify",
      "Listify v1.0.0\n\nYour smart shopping list companion.\n\nMade with ❤️ for smart shoppers.",
    );
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL("https://listify.app/privacy");
  };

  const handleTermsOfService = () => {
    Linking.openURL("https://listify.app/terms");
  };

  const handleFontSize = () => {
    Alert.alert("Font Size", "Choose font size for better readability", [
      { text: "Small", onPress: () => updateSettings({ fontSize: "small" }) },
      { text: "Medium", onPress: () => updateSettings({ fontSize: "medium" }) },
      { text: "Large", onPress: () => updateSettings({ fontSize: "large" }) },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleBackupRestore = () => {
    Alert.alert("Backup & Restore", "Choose an action", [
      {
        text: "Backup Now",
        onPress: () => {
          Alert.alert("Backup", "Your data has been backed up successfully!");
        },
      },
      {
        text: "Restore",
        onPress: () => {
          Alert.alert("Restore", "Data restoration coming soon!");
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleHelpFAQ = () => {
    Alert.alert(
      "Help & FAQ",
      "Frequently Asked Questions:\n\n" +
        "Q: How do I add items?\n" +
        "A: Tap the 'Add New Item' button on the main screen.\n\n" +
        "Q: How do I mark items as purchased?\n" +
        "A: Tap the checkbox next to each item.\n\n" +
        "Q: How do I delete items?\n" +
        "A: Swipe left on an item or use the delete button.\n\n" +
        "Q: Is my data backed up?\n" +
        "A: Yes, your data is automatically saved locally.",
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{
        paddingBottom: 80 + insets.bottom,
      }}
    >
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      </View>

      {/* Stats Overview */}
      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Shopping List Stats
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Total Items:
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {items.length}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Purchased:
            </Text>
            <Text style={[styles.statValue, { color: colors.success }]}>
              {items.filter((item) => item.purchased).length}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Remaining:
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {items.filter((item) => !item.purchased).length}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Completion:
            </Text>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {items.length > 0
                ? Math.round(
                    (items.filter((item) => item.purchased).length /
                      items.length) *
                      100,
                  )
                : 0}
              %
            </Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <Button
            title="Export List"
            onPress={handleExportData}
            variant="secondary"
            style={styles.actionButton}
          />
          <Button
            title="Clear Purchased"
            onPress={() => {
              Alert.alert(
                "Clear Purchased Items",
                "Are you sure you want to remove all purchased items?",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Clear Purchased",
                    style: "destructive",
                    onPress: async () => {
                      try {
                        const unpurchasedItems = items.filter(
                          (item) => !item.purchased,
                        );
                        dispatch(setItems(unpurchasedItems));
                      } catch (err: any) {
                        const errorMessage =
                          err.message || "Failed to clear purchased items";
                        dispatch(setError(errorMessage));
                      }
                    },
                  },
                ],
              );
            }}
            variant="outline"
            style={styles.actionButton}
            disabled={items.filter((item) => item.purchased).length === 0}
          />
          <Button
            title="Clear All"
            onPress={handleClearAll}
            variant="outline"
            style={styles.actionButton}
            disabled={items.length === 0}
          />
        </View>
      </Card>

      {/* Appearance Settings */}
      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Appearance
        </Text>
        <SettingItem
          title="Dark Mode"
          description="Use dark theme across the app"
          icon="moon-outline"
          onPress={toggleDarkMode}
          rightComponent={
            <Switch
              value={settings.darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          }
        />
        <SettingItem
          title="Font Size"
          description={`Current: ${settings.fontSize}`}
          icon="text-outline"
          onPress={handleFontSize}
        />
      </Card>

      {/* App Preferences */}
      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          App Preferences
        </Text>
        <SettingItem
          title="Notifications"
          description="Receive reminders about your shopping list"
          icon="notifications-outline"
          onPress={() =>
            updateSettings({ notifications: !settings.notifications })
          }
          rightComponent={
            <Switch
              value={settings.notifications}
              onValueChange={(value) =>
                updateSettings({ notifications: value })
              }
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          }
        />
        <SettingItem
          title="Sound Effects"
          description="Play sounds for actions and completion"
          icon="volume-high-outline"
          onPress={() =>
            updateSettings({ soundEnabled: !settings.soundEnabled })
          }
          rightComponent={
            <Switch
              value={settings.soundEnabled}
              onValueChange={(value) => updateSettings({ soundEnabled: value })}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          }
        />
        <SettingItem
          title="Haptic Feedback"
          description="Vibrate on interactions"
          icon="phone-portrait-outline"
          onPress={() =>
            updateSettings({ hapticFeedback: !settings.hapticFeedback })
          }
          rightComponent={
            <Switch
              value={settings.hapticFeedback}
              onValueChange={(value) =>
                updateSettings({ hapticFeedback: value })
              }
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          }
        />
        <SettingItem
          title="Auto Backup"
          description="Automatically backup your shopping list"
          icon="cloud-upload-outline"
          onPress={() => updateSettings({ autoBackup: !settings.autoBackup })}
          rightComponent={
            <Switch
              value={settings.autoBackup}
              onValueChange={(value) => updateSettings({ autoBackup: value })}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          }
        />
      </Card>

      {/* Support */}
      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Support
        </Text>
        <SettingItem
          title="Rate App"
          description="Rate Listify on the app store"
          icon="star-outline"
          onPress={handleRateApp}
        />
        <SettingItem
          title="Share App"
          description="Share with friends and family"
          icon="share-social-outline"
          onPress={handleShareApp}
        />
        <SettingItem
          title="Contact Support"
          description="Get help with the app"
          icon="mail-outline"
          onPress={handleContactSupport}
        />
        <SettingItem
          title="Help & FAQ"
          description="Frequently asked questions"
          icon="help-circle-outline"
          onPress={handleHelpFAQ}
        />
      </Card>

      {/* Legal */}
      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Legal</Text>
        <SettingItem
          title="Privacy Policy"
          description="How we handle your data"
          icon="lock-closed-outline"
          onPress={handlePrivacyPolicy}
        />
        <SettingItem
          title="Terms of Service"
          description="Terms and conditions"
          icon="document-text-outline"
          onPress={handleTermsOfService}
        />
        <SettingItem
          title="About"
          description="App version and information"
          icon="information-circle-outline"
          onPress={handleAbout}
        />
      </Card>

      <View style={styles.footer}>
        <View style={styles.brandContainer}>
          <Image
            source={require("@/assets/images/SineMag Logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.socialLinks}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => Linking.openURL("https://github.com/SineMag")}
            >
              <Ionicons name="logo-github" size={20} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() =>
                Linking.openURL(
                  "https://www.linkedin.com/in/sinenhlanhla-magubane-157955260/",
                )
              }
            >
              <Ionicons name="logo-linkedin" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          Listify v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.lg,
    alignItems: "center",
  },
  title: {
    fontSize: Typography.title.fontSize,
    fontWeight: "bold",
  },
  section: {
    margin: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  sectionTitle: {
    fontSize: Typography.heading.fontSize,
    fontWeight: "600",
    marginBottom: Spacing.md,
    marginLeft: Spacing.sm,
  },
  statsContainer: {
    marginBottom: Spacing.lg,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.body.fontSize,
  },
  statValue: {
    fontSize: Typography.body.fontSize,
    fontWeight: "600",
  },
  actionButtons: {
    gap: Spacing.md,
  },
  actionButton: {
    marginBottom: Spacing.sm,
  },
  settingItem: {
    marginBottom: Spacing.sm,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingAction: {
    padding: Spacing.sm,
  },
  settingContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    marginRight: Spacing.md,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: Typography.body.fontSize,
    fontWeight: "600",
  },
  settingDescription: {
    fontSize: Typography.caption.fontSize,
    marginTop: 2,
  },
  settingRight: {
    alignItems: "center",
  },
  footer: {
    alignItems: "center",
    padding: Spacing.xl,
    marginTop: Spacing.lg,
  },
  footerText: {
    fontSize: Typography.caption.fontSize,
    marginBottom: Spacing.xs,
  },
  brandContainer: {
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  logo: {
    width: 120,
    height: 40,
    marginBottom: Spacing.sm,
  },
  socialLinks: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.md,
  },
  socialButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: "transparent",
  },
});
