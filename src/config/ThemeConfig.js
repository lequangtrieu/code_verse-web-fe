export const themeConfig = {
  token: {
    // Primary brand color (deep blue)
    colorPrimary: "#1B2559",

    // Secondary accent colors
    // colorInfo: "#A9DAFD",  // soft sky blue
    colorSuccess: "#D5F5D1", // mint green
    colorWarning: "#FFD666", // warm neutral (optional fallback)
    colorError: "#FF7875",   // keep a soft red for errors

    // Backgrounds
    colorBgBase: "#F9FAFB", // light background
    colorBgContainer: "#FFFFFF", // cards, panels

    // Text colors
    colorTextBase: "#1B2559",
    colorTextSecondary: "#6B7280",
  },
  components: {
    Layout: {
      headerBg: "#1B2559",    // deep blue header
      siderBg: "#1B2559",     // deep blue sidebar
      bodyBg: "#F9FAFB",      // light page background
    },
    Menu: {
      itemBg: "#ffffff",
      itemColor: "#1B2559",   // inactive items → soft blue
      itemSelectedBg: "#A9DAFD",
      itemSelectedColor: "#1B2559",
    },
    Button: {
      colorPrimary: "#3B82F6",
      colorPrimaryHover: "#324173",  // lighter hover state
      colorPrimaryActive: "#10172D", // darker active
      borderRadius: 16,
      defaultBorderColor: "#1B2559", // normal border
      defaultBorderColorDisabled: "#d9d9d9", // disabled border
      defaultBg: "#fff", // background white
      defaultColor: "#000", // text
      
    },
    Card: {
      headerBg: "#FFFFFF",
      colorBorderSecondary: "#E5E7EB",
      borderRadiusLG: 12,
    },
    Table: {
      // headerBg: "#1B2559",       // Deep blue header background
      headerColor: "#1B2559",    // White header text
      rowHoverBg: "#ffffff",     // Light hover effect
      rowSelectedBg: "#e6f0ff",
      rowSelectedHoverBg: "#e6f0ff"
    },
    Select: {
      controlItemBgActive: "A9DAFD",
      controlItemBgHover: "#A9DAFD",
      controlItemBgSelected: "#A9DAFD",
    }
  },
};