import { createTheme  } from "@mui/material";
import { fontSize } from "@mui/system";

const theme = createTheme({
palette: {
    primary: {
        main: '#1976d2' // dark blue
    },
    secondary: {
        main: '#DFFFD8' // green
    },
    third: {
        main: "#95BDFF"
    },
},

typography: {
    h1: { // photo application
        fontFamily: "Itim",
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "#DFFFD8",
        textDecoration: "none",
        fontSize: 30,
    },
    h2: { // curr user and user list
        fontFamily: '"Itim", cursive',
        fontWeight: 700,
        letterSpacing: ".1rem",
        color: "#FFF",
        fontSize: 24,
        color: "#95BDFF",
    },
    h3: { // Noor
        fontFamily: "Cookie",
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "#F7C8E0",
        textDecoration: "none",
        fontSize: 24,
    },
    h4: { // user list names
        fontFamily: '"Itim", cursive',
        fontSize: 18,
        fontWeight: 600,
    },

    h6: { // button
        fontFamily: '"Itim", cursive',
        fontWeight: 700,
        letterSpacing: ".1rem",
        color: "#FFF",
        fontSize: 18,
        color: "#95BDFF", // light blue
    },
    h7: { // date time / subheading text
        fontFamily: '"Itim", cursive',
        fontWeight: 500,
        fontSize: 12,
        color: "#909399", // light grey
    },

    body1: {
        fontFamily: '"Itim", cursive',
    },
}
})

export default theme;