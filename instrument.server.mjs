import * as Sentry from "@sentry/react-router";

Sentry.init({
  dsn: "https://c2f7ef965bf9c3b8c3e31d971bd6918e@o4511783056637952.ingest.us.sentry.io/4511783088881664",
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
});
