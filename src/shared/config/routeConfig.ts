export enum AppRoutes {
  MAIN = 'main',
  PRODUCT = 'product',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.PRODUCT]: '/product',
};
