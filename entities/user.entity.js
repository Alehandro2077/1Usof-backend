module.exports = class User {
  constructor(user) {
    this.user = {
      id: user.id,
      login: user.login,
      password: user.password,
      full_name: user.full_name,
      email: user.email,
      rating: user.rating,
      active: user.active,
      role: user.role,
    };
  }
};
