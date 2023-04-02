import { createContext, useContext, type ReactElement } from 'react';

const LocalStorageContext = createContext<Storage | null>(null);

type Props = {
  /** セットする Storage。通常、 `window.localStorage` を期待する。 */
  storage: Storage;
  /** 有効化対象。 */
  children: ReactElement;
};

/** @todo これをスキーマから自動生成する。 */
// type LocalStorageItem =
//   | { key: string; payload: Record<string, unknown> }
//   | { key: string; payload: Record<string, unknown> };

/** `LocalStorage` を注入する Provider。 */
export const LocalStorageProvider = ({ storage, children }: Props): JSX.Element => (
  <LocalStorageContext.Provider value={storage}>{children}</LocalStorageContext.Provider>
);

/**
 * {@link LocalStorageProvider} でセットした `LocalStorage` を返却する。
 *
 * @returns セットした `LocalStorage`。
 */
export function useLocalStorage(): Storage {
  const localStorage = useContext(LocalStorageContext);

  if (!localStorage) {
    throw new Error('Why did you not passed LocalStorageProvider?');
  }

  return localStorage;
}
