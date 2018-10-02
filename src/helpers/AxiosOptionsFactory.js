import AxiosOptionsBuilder from "./AxiosOptionsBuilder";

const OptionsFactory = (
  methodName,
  path,
  tokenHeaderFn,
  defaultOptions,
  options,
  getCancelTokenFn,
  data = {}
) => {
  const builder = new AxiosOptionsBuilder.Builder(path);
  const tokenHeader = tokenHeaderFn();
  let axiosOptions = {};
  switch (methodName.toLowerCase()) {
    case "get":
    case "delete":
      axiosOptions = builder
        .withMethod(methodName.toLowerCase())
        .withHeaders({
          ...tokenHeader,
          ...defaultOptions,
          ...options
        })
        .withCancelToken(getCancelTokenFn)
        .build();
      return axiosOptions;
    case "post":
    case "put":
      axiosOptions = builder
        .withMethod(methodName.toLowerCase())
        .withHeaders({
          ...tokenHeader,
          ...defaultOptions,
          ...options
        })
        .withData(data)
        .withCancelToken(getCancelTokenFn)
        .build();
      return axiosOptions;
    default:
      return axiosOptions;
  }
};

export { OptionsFactory };
