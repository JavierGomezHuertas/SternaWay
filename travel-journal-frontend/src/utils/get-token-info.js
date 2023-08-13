export function getTokenInfo(token) {
  /// XXXXX.YYYYYY.ZZZZZ
  const tokenParts = token.split("."); // [XXXXX,YYYYY,ZZZZZ]
  const payloadBase64 = tokenParts[1]; /// YYYYYY

  const payloadString = atob(payloadBase64);
  return JSON.parse(payloadString);
}
