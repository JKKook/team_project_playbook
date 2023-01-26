const valid = (name, email, password, cf_password) => {
  if (!name || !email || !password || !cf_password) return "모든 입력창을 채워주세요.";
  if (!validateEmail(email)) return "유효하지 않은 Email입니다.";

  if (password.length < 6) return "비밀번호는 최소 6자 이상이어야 합니다.";
  if (password !== cf_password) return "비밀번호가 서로 다릅니다.";
};

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default valid;