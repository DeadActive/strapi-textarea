import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import { Textarea } from "./components/Textarea";

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addFields({ type: "textarea", Component: Textarea });

    app.registerPlugin({
      id: pluginId,
      isReady: true,
      name,
    });
  },

  bootstrap() {},
};
