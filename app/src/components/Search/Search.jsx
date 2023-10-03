import React from 'react'
import './style.scss'
import PostPerfil from '../PostPerfil/PostPerfil'

const Search = () => {
  return (
    <div className='searchBox'>
        <div className='filtro' style={{width:'100%'}}>
            <select>
                <option value="0">Filtro</option>
                <option value="1">Audi</option>
                <option value="2">BMW</option>
                <option value="3">Citroen</option>
                <option value="4">Ford</option>
                <option value="5">Honda</option>
                <option value="6">Jaguar</option>
                <option value="7">Land Rover</option>
                <option value="koenigsegg">Koenigsegg</option>
                <option value="8">Mercedes</option>
                <option value="9">Mini</option>
                <option value="10">Nissan</option>
                <option value="11">Toyota</option>
                <option value="12">Volvo</option>
            </select>
        </div>
        
        <div className='searchPosts'>
            <div className='searchGrid'>
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
                <PostPerfil />
            </div>
       </div>

    </div>
  )
}

export default Search