function isLocalStorageAvailable(): boolean {
  try {
    const testKey = "__test__";
    window.localStorage.setItem(testKey, "test");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

const available = isLocalStorageAvailable();

if (!available) {
  alert("Data persistence disabled: localStorage unavailable");
  console.error(
    "localStorage is not available, storage operations will be no-ops",
  );
}

export const storage = available
  ? {
      get(key: string) {
        const item = localStorage.getItem(key);
        // here I want the app to throw if I am working with non serializable data
        return item && JSON.parse(item);
      },

      set<T>(key: string, value: T) {
        try {
          localStorage.setItem(key, JSON.stringify(value));
          return true;
        } catch (error) {
          if (
            error instanceof DOMException &&
            error.name === "QuotaExceededError"
          ) {
            alert(
              "Data cannot be save because your storage is full. Clear some space in your browser settings",
            );
            return false;
          }
          // here I want the app to throw if I am working with non serializable data
          throw error;
        }
      },
    }
  : {
      get() {
        return null;
      },
      set() {
        return false;
      },
    };
