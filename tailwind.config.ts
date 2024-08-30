import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        basePrimary: "#FF057C",
      },
      backgroundImage: {
        basePrimary: "linear-gradient(-225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)",
      },
      fontSize: {
        mobile: "13px",
        desktop: "15px",
      },
      gridTemplateColumns: {
        "16": "repeat(16, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-15": "span 15 / span 15",
      },
    },
  },
  plugins: [],
};
export default config;
