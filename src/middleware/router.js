function method(state, httpMethod) {
  return (path, callback) => {
    if (!!state[httpMethod][path]) {
      throw Error(
        `PATH: ${path} -- METHOD: ${httpMethod}  -> [ already exist ] `
      );
    }

    state[httpMethod] = {
      ...state[httpMethod],
      [path]: callback,
    };
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

    if (!!Object.keys(methods.PUT).length) setMethod("PUT");
    if (!!Object.keys(methods.GET).length) setMethod("GET");
    if (!!Object.keys(methods.POST).length) setMethod("POST");
    if (!!Object.keys(methods.PATCH).length) setMethod("PATCH");
    if (!!Object.keys(methods.DELETE).length) setMethod("DELETE");
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

  return Object.freeze({
    state: Object.seal(state),
    get: method(state, "GET"),
    post: method(state, "POST"),
    put: method(state, "PUT"),
    delete: method(state, "DELETE"),
    compose: compose(state),
  });
}

export const router = useRouter();
