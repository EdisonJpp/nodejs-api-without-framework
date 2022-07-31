import removeItemByIndexes from "./removeItemByIndexes.js";
import defineUrlParams from "./defineUrlParams.js";

function method(state, httpMethod) {
  return (path, callback) => {
    if (state[httpMethod][path]) {
      throw Error(
        `PATH: ${path} -- METHOD: ${httpMethod}  -> [ already exist ] `
      );
    }

    state[httpMethod][path] = callback;
  };
}

function compose(state) {
  return (router) => {
    const methods = router.state;

    function setMethod(httpMethod) {
      Object.entries(methods[httpMethod]).forEach(([key, value]) => {
        method(state, httpMethod)(key, value);
      });
    }

    if (Object.keys(methods.PUT).length) setMethod("PUT");
    if (Object.keys(methods.GET).length) setMethod("GET");
    if (Object.keys(methods.POST).length) setMethod("POST");
    if (Object.keys(methods.PATCH).length) setMethod("PATCH");
    if (Object.keys(methods.DELETE).length) setMethod("DELETE");
  };
}

function setEndpointsWithDynamicParams(state, endpointsWithDynamicParams) {
  return () => {
    const entries = Object.entries(state);
    let index = entries.length;

    for (; index--; ) {
      const [key, value] = entries[index];

      const paths = Object.keys(value).filter((path) => path.includes(":"));

      endpointsWithDynamicParams[key] = paths.reduce((accItem, item) => {
        if (!item.includes(":")) return accItem;

        const splitted = item.split("/");
        const length = splitted.length;
        const params = [];

        defineUrlParams(splitted, params);
        removeItemByIndexes(
          splitted,
          params.map((it) => it.index)
        );

        const payload = {
          params,
          url: item,
          urlWithoutParams: splitted.filter(Boolean).join("/"),
        };

        if (accItem[length]) {
          accItem[length].push(payload);
          return accItem;
        }

        return {
          ...accItem,
          [length]: [payload],
        };
      }, {});
    }
  };
}

export function useRouter() {
  const state = {
    GET: {},
    POST: {},
    PUT: {},
    PATCH: {},
    DELETE: {},
  };

  let endpointsWithDynamicParams = {
    GET: {},
    POST: {},
    PUT: {},
    PATCH: {},
    DELETE: {},
  };

  return Object.freeze({
    state,
    endpointsWithDynamicParams,
    setEndpointsWithDynamicParams: setEndpointsWithDynamicParams(
      state,
      endpointsWithDynamicParams
    ),
    get: method(state, "GET"),
    post: method(state, "POST"),
    put: method(state, "PUT"),
    delete: method(state, "DELETE"),
    compose: compose(state),
  });
}

export const router = useRouter();
