const { withAndroidStyles, withPlugins } = require("@expo/config-plugins");

export function addAndroidColorEdgeEffectToStyles(androidStyles: { [x: string]: any; }, color: any) {
  // Add `<item name="android:colorEdgeEffect">...</item>` to the styles.xml
  let resources = androidStyles["resources"];
  if (!resources) {
    resources = {
      $: {
        "xmlns:tools": "http://schemas.android.com/tools",
      },
    };
    androidStyles["resources"] = resources;
  }

  let styles = resources["style"];
  if (!Array.isArray(styles)) {
    styles = [];
    resources["style"] = styles;
  }

  let appTheme = styles.find((item: { $: { [x: string]: string; }; }) => item.$["name"] === "AppTheme");
  if (!appTheme) {
    appTheme = {
      $: {
        name: "AppTheme",
        parent: "Theme.AppCompat.Light.NoActionBar",
      },
    };
    styles.push(appTheme);
  }

  let items = appTheme["item"];
  if (!Array.isArray(items)) {
    items = [];
    appTheme["item"] = items;
  }

  let colorEdgeEffect = styles.find((item: { $: { [x: string]: string; }; }) => item.$["name"] === "android:colorEdgeEffect");
  if (colorEdgeEffect) {
    colorEdgeEffect["_"] = color;
  } else {
    colorEdgeEffect = {
      $: {
        name: "android:colorEdgeEffect",
      },
      _: color,
    };
    items.push(colorEdgeEffect);
  }

  return androidStyles;
}

module.exports = function withAndroidColorEdgeEffect(config: any, { color }: any) {
  return withAndroidStyles(config, (config: { modResults: any; }) => {
    config.modResults = addAndroidColorEdgeEffectToStyles(config.modResults, color);
    return config;
  });
}