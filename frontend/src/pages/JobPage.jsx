import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const JobPage = () => {
  const { id: jobId } = useParams() // Get the job ID from the URL
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${jobId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch job')
        }
        const data = await response.json()
        setJob(data)
      } catch (err) {
        console.error('Error fetching job:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [jobId])
  //to delete
  const deleteJob = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete?')
    if (!confirmDelete) return
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete job')
      navigate('/')
    } catch (err) {
      console.error('Error deleting job:', err)
      setError(err.message)
    }
  }

  if (loading) {
    return <p>Loading job...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  if (!job) {
    return <p>Job not found</p>
  }

  return (
    <div className='job-details'>
      <h2>{job.title}</h2>
      <p>Type: {job.type}</p>
      <p>Description: {job.description}</p>
      <p>Company: {job.company?.name}</p>
      <p>Contact Email: {job.company?.contactEmail}</p>
      <p>Contact Phone: {job.company?.contactPhone}</p>
      <p>Location: {job.location}</p>
      <p>Salary: {job.salary}</p>
      <p>Posted Date: {job.postedDate}</p>

      <Link to={`/edit-job/${jobId}`}>
        <button>Edit Job</button>
      </Link>
      <button onClick={deleteJob}>Delete Job</button>
    </div>
  )
}

export default JobPage
