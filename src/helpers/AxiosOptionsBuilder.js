export default class AxiosOptionsBuilder {
  constructor(build) {
    this.url = build.url;
    this.method = build.method;
    this.data = build.data;
    this.headers = build.headers;
    this.cancelToken = build.cancelToken;
  }
  static get Builder() {
    class Builder {
      constructor(url) {
        this.url = url;
      }
      withMethod(method) {
        this.method = method;
        return this;
      }
      withHeaders(headers) {
        this.headers = headers;
        return this;
      }
      withData(data) {
        this.data = data;
        return this;
      }
      withCancelToken(getCancelTokenFn) {
        this.cancelToken = getCancelTokenFn();
        return this;
      }
      build() {
        return new AxiosOptionsBuilder(this);
      }
    }
    return Builder;
  }
}
