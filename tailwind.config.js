module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      screens: {
        "2xm": { min: "150px", max: "199.999px" },
        xs: { min: "200px", max: "359.999px" },
        xxs: { min: "360px", max: "639.999px" },
        "4xm": { min: "150px", max: "225.7px" } /*max was 244.999px*/,
        "5xm": { min: "150px", max: "290px" },
        "6xm": { min: "150px", max: "235px" },
        "6.5xm": { min: "150px", max: "190px" },
        "7xm": { min: "150px", max: "360px" },
        "3xm": { min: "225px", max: "359.999px" },
        "3.25xm": { min: "450px", max: "750px" },
        "3.5xm": { min: "390px", max: "572px" },
        "3.3xm": { min: "320px", max: "389.999px" },
        xm: { min: "450px", max: "639.999px" },
        "1.75xm": { min: "299.999px", max: "450px" },
        "1.5xm": { min: "150px", max: "300px" },
        "1.15sm": "360px",
        "1.25sm": "375px",
        "1.1sm": "320px",
        sm: "640px",
        "1.5sm": { min: "751px", max: "1023px" },
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      extend: {
        fontFamily: {
          OnePlusSlate: ["OnePlus-Slate-Light"],
        },
      },
    },
    plugins: [],
  };