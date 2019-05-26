const Globals = Object.freeze({
  app: {
    name: "Time Aid",
    caption: "Your time spent on good causes",
    version: "0.1.5"
  },
  constants: {
    criteria: {
      minUsernameLength: 1,
      minEmailLength: 3,
      minPasswordLength: 8
    },
    styles: {
      border: {
        size: "1.5px",
        radius: "5px"
      },
      font: {
        family: {
          default: "'Rubik', sans-serif"
        },
        sizes: {
          small: "14px",
          normal: "16px",
          subheading: "20px",
          heading: "30px",
          caption: "30px",
          title: "22px",
          huge: "44px"
        }
      }
    }
  }
});

export default Globals;