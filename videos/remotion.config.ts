import { Config } from "@remotion/cli/config";
// @ts-expect-error módulo JS sin tipos
import { conAlias } from "./alias.mjs";

Config.overrideWebpackConfig(conAlias);
Config.setVideoImageFormat("jpeg");
