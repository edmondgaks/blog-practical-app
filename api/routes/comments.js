import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
  updateComment
} from "../controllers/comment.js";

const router = express.Router();

// Define routes
router.get("/:post_id/comments", getComments);
router.post("/comments", addComment);
router.put("/comments/:id", updateComment);
router.delete("/comments/:id", deleteComment);

export default router;