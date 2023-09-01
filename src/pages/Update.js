import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import supabase from '../config/supabaseClient'
const Update = () => {
  //id berasal dari App js route update
  const { id } = useParams()
  const navigate = useNavigate()

  const [ title, setTitle ] = useState('')
  const [ method, setMethod ] = useState('')
  const [ rating, setRating ] = useState('')
  const [ formError, setFormError ] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!title || !method || !rating){
      setFormError('please fill in all the fields correctly')
      return
    }

    const { data, error} = await supabase
      .from('smoothies')
      .update({title,method,rating})
      .eq('id',id)
      .select()
      
      if(error){
        console.log(error)
        setFormError('please fill in all fields correctly')
      }
      if(data){
        console.log(data)
        setFormError(null)
        navigate('/')
      }
  }

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error} = await supabase 
      .from('smoothies')
      .select()
      .eq('id',id)
      .single()

    if(error){
      navigate('/',{replace: true})
    }
    if(data){
      setTitle(data.title)
      setMethod(data.method)
      setRating(data.rating)
      console.log(data)
    }
    }
    fetchSmoothie()
  },[id,navigate])

  return (
    <div className="page update">
       <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
          type="text"
          id=""
          value={title}
          onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="method">Method:</label>
          <textarea
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
          <label htmlFor="title">Rating:</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}></input>

            <button>Update Smoothie Recipe</button>

            {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update