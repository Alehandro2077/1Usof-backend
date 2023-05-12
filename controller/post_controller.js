const db = require("../db.js");

class PostController {
  async createPost(req, res) {
    const { author_id, title, publish_date, status, content } = req.body;
    const newPost = await db.query(
      "INSERT INTO posts (author_id, title, publish_date, status, content) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [author_id, title, publish_date, status, content]
    );
    res.json(newPost.rows[0]);
  }

  ///get posts by user
  async getPosts(req, res) {
    const author_id = req.query.author_id;
    const posts = await db.query("SELECT * FROM posts where author_id = $1", [
      author_id
    ], (err, res) => {
      console.log(err ? err.stack : res.rows[0].message);
    });
    res.json(posts.rows);
  }

  // async getOnePost(req, res) {
  //   const id = req.params.id;
  //   const user = await db.query("SELECT * FROM users where id = $1", [id]);
  //   res.json(user.rows[0]);
  // }

  // async updatePost(req, res) {
  //   const { id, full_name } = req.body;
  //   const user = await db.query(
  //     "UPDATE users set full_name = $1 where id = $2 RETURNING *",
  //     [full_name, id]
  //   );
  //   res.json(user.rows[0]);
  // }

  // async deletePost(req, res) {
  //   const id = req.params.id;
  //   const user = await db.query("DELETE  FROM users where id = $1", [id]);
  //   res.json(user.rows[0]);
  // }
}

module.exports = new PostController();
