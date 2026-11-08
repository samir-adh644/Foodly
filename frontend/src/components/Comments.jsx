import { useEffect, useState } from 'react'
import axios from 'axios'

const Comments = ({ foodId, onClose, onCommentAdded }) => {
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/api/food/getComments', {
      params: {
foodId: foodId
},
      withCredentials: true,
    })
      .then((response) => setComments(response.data.comments || []))
      .catch((requestError) => {
        if (requestError.response?.status === 404) {
          setComments([])
        } else {
          console.error('Error fetching comments:', requestError)
          setError('Unable to load comments.')
        }
      })
      .finally(() => setIsLoading(false))
  }, [foodId])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const text = commentText.trim()
    if (!text || isSubmitting) return

    setIsSubmitting(true)
    setError('')

    try {
      const response = await axios.post('http://localhost:3000/api/food/comment', {
        foodId,
        comment: text,
      }, { withCredentials: true })

      const newComment = {
        ...response.data.comment,
        comment: text,
        user: { name: 'You' },
      }
      setComments((current) => [...current, newComment])
      setCommentText('')
      onCommentAdded?.()
    } catch (requestError) {
      console.error('Error posting comment:', requestError)
      setError('Unable to post your comment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="comments-overlay" role="presentation" onMouseDown={onClose}>
      <section className="comments-panel" role="dialog" aria-modal="true" aria-labelledby="comments-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="comments-header">
          <div>
            <span className="profile-kicker">Community</span>
            <h2 id="comments-title">Comments</h2>
          </div>
          <button className="comments-close" type="button" onClick={onClose} aria-label="Close comments">×</button>
        </header>

        <div className="comments-list">
          {isLoading && <p className="comments-state">Loading comments...</p>}
          {!isLoading && !error && comments.length === 0 && <p className="comments-state">Be the first to comment.</p>}
          {error && <p className="comments-error" role="alert">{error}</p>}
          {comments.map((item, index) => (
            <article className="comment-item" key={item._id || `${item.comment}-${index}`}>
              <div className="comment-avatar" aria-hidden="true">{item.user?.name?.charAt(0).toUpperCase() || 'U'}</div>
              <div>
                <strong>{item.user?.fullName || 'Foodly user'}</strong>
                <p>{item.comment}</p>
              </div>
            </article>
          ))}
        </div>

        <form className="comment-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="Add a comment..."
            aria-label="Comment text"
            maxLength="500"
          />
          <button type="submit" disabled={isSubmitting || !commentText.trim()}>{isSubmitting ? '...' : 'Post'}</button>
        </form>
      </section>
    </div>
  )
}

export default Comments
