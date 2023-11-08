import './style.scss'; 

const Configs = () => {
    return(
        <div className='ConfigDiv'>

            <div className="ConfigsOpc">
                <p>Opção 1</p>
                <input type="checkbox" checked />
            </div>

            <div className="ConfigsOpc">
                <p>Opção 2</p>
                <input type="checkbox" />
            </div>

            <div className="ConfigsOpc">
                <p>Opção 3</p>
                <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                </label>
            </div>

            <div className="ConfigsOpc">
                <p>Opção 4</p>
                <label class="switch">
                    <input type="checkbox" checked/>
                    <span class="slider round"></span>
                </label>
            </div>


            <div className="ConfigsOpc" style={{cursor:'pointer'}}>
                <p style={{color: 'rgb(204,29,29)'}}>Excluir Conta</p>
                <img style={{height:'24px'}} src="https://cdn.icon-icons.com/icons2/1982/PNG/512/trashbin_123015.png" alt="" />
            </div>

        </div>
    )
}

export default Configs