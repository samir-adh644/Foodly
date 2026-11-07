import { useState } from 'react'
import axios from 'axios'

const DUMMY_API_URL = 'http://localhost:3000/api/food'

const CreateFood = () => {
  const [form, setForm] = useState({ name: '', description: '', video: null })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value, files } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: name === 'video' ? files[0] : value }))
  }

const handleSubmit = async (event) => {
event.preventDefault();
setStatus({ type: '', message: '' });
setIsSubmitting(true);

try {
    const formData = new FormData();

    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('video', form.video);

    await axios.post(DUMMY_API_URL, formData, {
        withCredentials: true
    });

    setStatus({
        type: 'success',
        message: 'Food video created successfully.'
    });

    setForm({ name: '', description: '', video: null });
    event.target.reset();

} catch (error) {
    console.log(error.response?.data || error);
    setStatus({
        type: 'error',
        message: 'Unable to create the food video. Please try again.'
    });
} finally {
    setIsSubmitting(false);
}

};

  return (
    <main className="create-food-page">
      <header className="create-food-header">
        <a className="profile-brand" href="/" aria-label="Foodly home"><span className="profile-brand-mark">F</span>foodly</a>
        <a className="create-food-profile-link" href="/profile">View profile</a>
      </header>

      <section className="create-food-card" aria-labelledby="create-food-title">
        <span className="eyebrow">Partner dashboard</span>
        <h1 id="create-food-title">Create a food video</h1>
        <p className="create-food-subtitle">Share a dish from your kitchen with hungry customers.</p>

        <form className="create-food-form" onSubmit={handleSubmit}>
          <label htmlFor="food-name">Food name</label>
          <input id="food-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="e.g. Garden pasta" required />

          <label htmlFor="food-description">Description</label>
          <textarea id="food-description" name="description" value={form.description} onChange={handleChange} placeholder="Tell customers what makes it special" rows="4" required />

          <label htmlFor="food-video">Video</label>
          <input id="food-video" name="video" type="file" accept="video/*" onChange={handleChange} required />
          {form.video && <span className="selected-video">Selected: {form.video.name}</span>}

          {status.message && <p className={`create-food-status ${status.type}`} role="status">{status.message}</p>}

          <button className="primary-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Create food'}<span aria-hidden="true">→</span></button>
        </form>
      </section>
    </main>
  )
}

export default CreateFood
