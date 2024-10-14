import { createTheme } from '@mui/material/styles';

// Define the theme based on the application's visual requirements. Refer to the Material UI documentation for detailed theme customization options.
// Ensure the theme aligns with the design system defined in the MVP's style guide.
const theme = createTheme({
  palette: {
    // Define primary, secondary, error, warning, info, and success colors.
    // Use consistent color names and values across the application.
    primary: {
      main: '#007bff', // Primary color
      light: '#00b0ff', // Lighter shade of primary color
      dark: '#004080', // Darker shade of primary color
    },
    secondary: {
      main: '#673ab7', // Secondary color
      light: '#9575cd', // Lighter shade of secondary color
      dark: '#3e2771', // Darker shade of secondary color
    },
    error: {
      main: '#dc3545', // Error color
    },
    warning: {
      main: '#ffc107', // Warning color
    },
    info: {
      main: '#17a2b8', // Info color
    },
    success: {
      main: '#28a745', // Success color
    },
    // Define additional palettes (e.g., for dark mode).
    // Ensure that the palettes are consistent across the application.
  },
  typography: {
    // Define font families, font sizes, and line heights for body text, headings, and other elements.
    // Use the same font families and sizes for similar elements throughout the application.
    fontFamily: ['Roboto', 'sans-serif'], // Use a consistent font family.
    fontSize: 16, // Set a base font size.
    h1: {
      fontSize: '3rem', // Define the font size for H1 headings.
    },
    h2: {
      fontSize: '2rem', // Define the font size for H2 headings.
    },
    // Define additional typography styles for different elements.
    // Ensure consistency in typography styles across the application.
  },
  components: {
    // Customize Material UI components (e.g., Button, TextField, etc.)
    // Ensure that component customizations are consistent across the application.
    MuiButton: {
      styleOverrides: {
        // Customize button styles
        root: {
          // Apply custom styles to all buttons.
          // Ensure that button styles are consistent with the MVP's design system.
        },
        // Customize button variants (e.g., primary, secondary, error)
        containedPrimary: {
          // Apply custom styles to primary buttons.
          // Ensure that primary button styles are consistent with the MVP's design system.
        },
        // Customize button sizes
        small: {
          // Apply custom styles to small buttons.
          // Ensure that small button styles are consistent with the MVP's design system.
        },
        // Customize button states (e.g., hover, focus)
        // Ensure that button states are consistent with the MVP's design system.
      },
    },
    // Customize other Material UI components
    // Ensure consistency in component styles across the application.
  },
  // Define additional theme customizations (e.g., shadows, breakpoints, etc.)
  // Ensure that theme customizations are consistent with the MVP's design system.
});

export default theme;