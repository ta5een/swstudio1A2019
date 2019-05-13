const AppDefaults = Object.freeze({
  app: {
    name: "Time Aid",
    caption: "Your time spent on good causes",
    version: "0.1.0"
  },
  constants: {
    minPasswordLength: 8,
    font: {
      imports: {
        all: `
          @import url('https://fonts.googleapis.com/css?family=Rubik:400,500,700');
        `,
        rubik: "@import url('https://fonts.googleapis.com/css?family=Rubik:400,500,700');"
      },
      family: {
        default: "'Rubik', sans-serif"
      },
      sizes: {
        normal: "16px",
        subheading: "16px",
        heading: "45px",
        caption: "22px",
        title: "70px"
      }
    }
  }
});

export default AppDefaults;