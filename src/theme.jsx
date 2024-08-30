import { extendTheme } from "@chakra-ui/react";

// Crea un tema personalizzato
const theme = extendTheme({
    config: {
        useSystemColorMode: false, // Non usare la modalità colore del sistema
    },
    styles: {
        global: {
            "html, body": {
                bg: "blackAlpha.300",
                height: "100%"
            },
        },
    },
});

export default theme;
