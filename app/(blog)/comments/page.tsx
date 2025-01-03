
"use client";
import React, { useState, useEffect } from 'react';

const CommentSec = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState('');

  // Fetch comments from localStorage when the component mounts
  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments)); // Parse and set the stored comments
    }
  }, []);

  // Save comments to localStorage whenever the comments state changes
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  // Handle adding a new comment
  const handleAddComment = () => {
    if (!name || !commentText) return; // Ensure name and comment are not empty

    const newComment = {
      id: Date.now(), // Unique ID for each comment
      name,
      text: commentText,
    };

    // Add the new comment to the existing comments array
    setComments([newComment, ...comments]);

    setName(''); // Clear the name input
    setCommentText(''); // Clear the comment input
  };

  // Handle deleting a comment by its ID
  const handleDeleteComment = (id: number) => {
    setComments(comments.filter((comment) => comment.id !== id)); // Filter out the comment with the given ID
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Leave a Comment</h2>

      {/* Comment Form */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-3 mb-2 border border-gray-300 rounded-md"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="w-full p-3 mb-2 border border-gray-300 rounded-md"
          placeholder="Write your comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <button
          onClick={handleAddComment}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Comment
        </button>
      </div>

      {/* Comments List */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Comments</h3>
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="bg-gray-100 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{comment.name}</span>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
              <p className="mt-2">{comment.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentSec;
