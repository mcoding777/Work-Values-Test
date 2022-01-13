// 액션 정의
export const changeUserInfo = (name, gender) => ({ 
    type: "CHANGE_USERINFO",
    name,
    gender,
  });

export const changeUserSelect = (select) => ({
  type: "CHANGE_USERSELECT",
  select,
});