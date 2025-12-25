import { Provider, atom, useAtom } from 'jotai';
import { atomWithStore } from 'jotai-zustand';
import { useEffect } from 'react';
import { create, StoreApi } from 'zustand';

type Method = (...args: any[]) => any;

type StateMap = Record<string, any>;
type GettersMap = Record<string, any>;
type ActionsMap = Record<string, Method>;

type StoreCustomProperties<S> = {
  $initialState: () => S;
  $patch: (value: Partial<S>) => void;
  $reset: () => void;
};

type Store<S, G = {}, A = {}> = S & G & A & StoreCustomProperties<S>;

type StoreDefinition<S extends StateMap, G, A> = StoreCustomProperties<S> & {
  $state: () => S & G;
  (): Store<S, G, A>;
};

type DefineStoreOptions<S extends StateMap, G, A> = {
  state: () => S;
  getters?: (state: S) => G;
  actions?: (set: StoreApi<S>['setState']) => A;
};

export const generateStore = <
  S extends StateMap,
  G extends GettersMap = {},
  A extends ActionsMap = {},
>(
  options: DefineStoreOptions<S, G, A>,
): StoreDefinition<S, G, A> => {
  const { state, getters, actions } = options;

  const initialState = state();
  const store = create<S>(() => initialState);
  const storeAtom = atomWithStore(store);

  const gettersAtom = atom((get) => {
    const state = get(storeAtom);
    return getters ? getters(state) : ({} as G);
  });

  let cachedGetters: G = { ...getters } as G;

  function useStore(): Store<S, G, A> {
    const [state] = useAtom(storeAtom);
    const [computedGetters] = useAtom(gettersAtom);
    const boundActions = (actions?.(store.setState) || {}) as A;

    useEffect(() => {
      cachedGetters = computedGetters;
    }, [computedGetters]);

    return {
      ...state,
      ...computedGetters,
      ...boundActions,
      setState: store.setState,
      $reset: () => store.setState(initialState),
      $patch: store.setState,
      $initialState: () => initialState,
    };
  }

  // Static properties
  useStore.$initialState = () => initialState;
  useStore.$patch = (value: Partial<S>) => store.setState(value);
  useStore.$reset = () => store.setState(initialState);
  useStore.$state = () => ({
    ...store.getState(),
    ...cachedGetters,
  });

  return useStore;
};

export const GlobalStoreProvider = Provider;
