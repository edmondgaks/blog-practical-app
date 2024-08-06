import { db } from "../db.js";
import jwt from "jsonwebtoken";

// Get all comments for a specific post
export const getComments = (req, res) => {
  const q = "SELECT * FROM comments WHERE post_id = ?";

  db.query(q, [req.params.post_id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

// Create a new comment
export const addComment = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO comments(`post_id`, `content`, `author`, `created_at`) VALUES (?, ?, ?, NOW())";

    const values = [
      req.body.post_id,
      req.body.content,
      userInfo.id, // or req.body.author if you want to use the author name directly
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json("Comment has been created.");
    });
  });
};

// Update an existing comment
export const updateComment = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const commentId = req.params.id;
    const q =
      "UPDATE comments SET `content` = ?, `updated_at` = NOW() WHERE `id` = ? AND `author` = ?";

    const values = [req.body.content];

    db.query(q, [...values, commentId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0) return res.status(403).json("You can only update your own comments.");

      return res.json("Comment has been updated.");
    });
  });
};

// Delete a comment
export const deleteComment = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const commentId = req.params.id;
    const q = "DELETE FROM comments WHERE `id` = ? AND `author` = ?";

    db.query(q, [commentId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0) return res.status(403).json("You can only delete your own comments.");

      return res.json("Comment has been deleted.");
    });
  });
};