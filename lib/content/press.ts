/**
 * Optional contact extras. Phone remains off unless explicitly enabled.
 * Press-only original downloads live outside `public/` (`_private/press/`).
 */

export type PressResources = {
  phone?: string;
};

export const pressResources: PressResources = {
  phone: undefined,
};
