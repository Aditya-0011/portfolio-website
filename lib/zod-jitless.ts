const scope = globalThis as typeof globalThis & {
  __zod_globalConfig?: { jitless?: boolean };
};

scope.__zod_globalConfig ??= {};
scope.__zod_globalConfig.jitless = true;
