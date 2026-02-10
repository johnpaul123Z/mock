import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("cleaning", "routes/cleaning.tsx"),
] satisfies RouteConfig;
