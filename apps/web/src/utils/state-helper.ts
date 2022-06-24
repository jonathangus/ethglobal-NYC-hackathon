export type MulticallStateOptions = {
  method: string;
  address: string;
  user?: string;
  args?: any[];
};

export const getCacheKey = (options: MulticallStateOptions): string =>
  [options.address, options.method, ...options.args, options.user]
    .filter((value) => typeof value !== 'undefined')
    .join('-');
