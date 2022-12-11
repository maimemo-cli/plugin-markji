export interface ResponseBody<BodyData> {
  success: boolean,
  errors: {
    message: string,
    code: string,
    info: string
  }[],
  data: BodyData
}
