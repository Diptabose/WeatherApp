import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isNullOrUndefined(value: unknown): value is undefined | null {
  return value == null && value == undefined;
}

export function isValid(value: unknown) {
  return (
    !isNullOrUndefined(value) &&
    value !== "" &&
    !Number.isNaN(parseInt(value as string))
  );
}

export function debounce<T extends (...args: any) => any>(
  callback: (...args: Parameters<T>) => T,
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback.call(this, ...args);
    }, 4000);
  };
}

export function capitalise(str: string): string {
  return str.charAt(0).toUpperCase().concat(str.slice(1));
}
