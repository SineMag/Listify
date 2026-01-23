import { Breakpoints, ResponsiveSpacing } from "@/constants/theme";
import { useWindowDimensions } from "react-native";

export const useResponsive = () => {
  const { width } = useWindowDimensions();

  const getBreakpoint = () => {
    if (width < Breakpoints.medium) return "small";
    if (width < Breakpoints.large) return "medium";
    if (width < Breakpoints.tablet) return "large";
    if (width < Breakpoints.desktop) return "tablet";
    return "desktop";
  };

  const breakpoint = getBreakpoint();
  const isSmall = breakpoint === "small";
  const isMedium = breakpoint === "medium";
  const isLarge = breakpoint === "large";
  const isTablet = breakpoint === "tablet";
  const isDesktop = breakpoint === "desktop";
  const isMobile = isSmall || isMedium || isLarge;

  const getSpacing = () => {
    switch (breakpoint) {
      case "small":
        return ResponsiveSpacing.small;
      case "large":
      case "tablet":
      case "desktop":
        return ResponsiveSpacing.large;
      default:
        return ResponsiveSpacing.medium;
    }
  };

  const getFontSize = (baseSize: number) => {
    switch (breakpoint) {
      case "small":
        return baseSize * 0.875; // 14% smaller
      case "large":
        return baseSize * 1.125; // 12.5% larger
      case "tablet":
        return baseSize * 1.25; // 25% larger
      case "desktop":
        return baseSize * 1.375; // 37.5% larger
      default:
        return baseSize;
    }
  };

  const getContainerPadding = () => {
    switch (breakpoint) {
      case "small":
        return 12;
      case "large":
        return 20;
      case "tablet":
        return 32;
      case "desktop":
        return 48;
      default:
        return 16;
    }
  };

  const getCardWidth = () => {
    if (isDesktop) return "50%";
    if (isTablet) return "75%";
    return "100%";
  };

  return {
    width,
    breakpoint,
    isSmall,
    isMedium,
    isLarge,
    isTablet,
    isDesktop,
    isMobile,
    spacing: getSpacing(),
    getFontSize,
    getContainerPadding,
    getCardWidth,
  };
};
