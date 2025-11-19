import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EditJobPage = () => {
  const { id: jobId } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${jobId}`)
        if (!res.ok) throw new Error('Failed to fetch job')

        const data = await res.json()
        setTitle(data.title)
        setType(data.type)
        setDescription(data.description)
        setCompanyName(data.company.name)
        setContactEmail(data.company.contactEmail)
        setContactPhone(data.company.contactPhone)
        setLocation(data.location)
        setSalary(data.salary)
      } catch (error) {
        console.error('Error fetching job:', error)
      }
    }
    fetchJob()
  }, [jobId])

  const submitForm = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          type,
          description,
          location,
          salary: salary.toString(),

          company: {
            name: companyName,
            contactEmail,
            contactPhone,
          },
        }),
      })

      if (!res.ok) throw new Error('Failed to update job')
      navigate(`/jobs/${jobId}`)
    } catch (error) {
      console.error('Error updating job:', error)
    }
  }

  const cancelEdit = () => {
    navigate(`/jobs/${jobId}`)
  }

  return (
    <div className='create'>
      <h2>Edit Job</h2>
      <form onSubmit={submitForm}>
        <label htmlFor='title'>Job title:</label>
        <input
          id='title'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor='type'>Job type:</label>
        <select
          id='type'
          name='type'
          value={type}
          onChange={(e) => setType(e.target.value)}>
          <option value='' disabled>
            Select job type
          </option>
          <option value='Full-Time'>Full-Time</option>
          <option value='Part-Time'>Part-Time</option>
          <option value='Remote'>Remote</option>
          <option value='Internship'>Internship</option>
        </select>

        <label htmlFor='description'>Job Description:</label>
        <textarea
          id='description'
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}></textarea>

        <label htmlFor='companyName'>Company Name:</label>
        <input
          id='companyName'
          name='companyName'
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <label htmlFor='email'>Contact Email:</label>
        <input
          id='email'
          name='email'
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />

        <label htmlFor='phone'>Contact Phone:</label>
        <input
          id='phone'
          name='phone'
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />

        <label htmlFor='location'>Location:</label>
        <input
          id='location'
          name='location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label htmlFor='salary'>Salary:</label>
        <input
          id='salary'
          name='salary'
          type='number'
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <button type='submit'>Update Job</button>
        <button type='button' onClick={cancelEdit}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default EditJobPage
