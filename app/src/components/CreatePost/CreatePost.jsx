import React from 'react'
import './style.scss'

function CreatePost() {
  return (
    <div className='CPcontainer'>
          <h1>Postar</h1>
          <div className="addArquivo">
                <label htmlFor="file">Adicionar Foto</label>
                <input type="file" id="file"/>
          </div>

          <div className="inputs">
                <label htmlFor="user">Titulo</label>
                <input name='user' id='tirulo' type="text" placeholder="Adicione um Titulo..."/>

                <label htmlFor="password">Descrição</label>
                <input name='email' id='descricao' type="text" placeholder="Adicione uma Descrição..."/>

                <label htmlFor="password">Tags</label>
                <input name='senha' id='tags' type="text" placeholder="Adicione Algumas Tags..."/>

                <button>Postar</button>
            </div>
    </div>
  )
}

export default CreatePost