import './App.css'
import { useMovies } from './hooks/useMovies.jsx'
import { Movies } from './components/movies.jsx'
import { useEffect, useState, useRef } from 'react'

function useSearch (){
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)

  useEffect(() =>{
    if (search == '') {
      setError('Empty search Not Possible')
      return
    }

    if (search.match(/^\d+$/)){
      setError('Searching with numbers is not allowed')
      return
    }

    if (search.length < 3){
      setError('Search must have 3 characters minimum')
      return
    }

    setError(null)
  },[search])

  return {search, updateSearch, error}
}

function App() {
  //const { movies} = useMovies()
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search })

  
  // Es portable, no depende de React, No se requiere usar hook, forma NO controlada por react, directamente desde el DOM 
  const handleSubmit = (e) => {
    e.preventDefault()
    //const fields = new window.FormData(e.target)
    //const query = fields.get('query')  // estas lineas recupera el input del formulario 
    //const { query } = Object.fromEntries(new window.FormData(e.target))
    getMovies()
  }

  // forma controlada por React, es mas lento por que se renderiza cada vez que cambia el input
  const handleChange = (e) => {
    updateSearch(e.target.value)
  }

return (
    <div className='page'>

      <header>
        <h1>Movies Searcher</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' type="text" placeholder='Harry Potter, Superman, Spiderman,...'/>
          <button type='submit'>Search</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
        
      </main>
    </div>
  )
}

export default App
