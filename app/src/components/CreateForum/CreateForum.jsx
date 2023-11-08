import './style.scss'

const CreateForum = () => {
    return (
        <div className="CreatFDiv">
            <form className='FormCFD' action="">
                <input style={{display:"none"}} type="file" id="file"/>
                <label className='LImg' htmlFor="file">
                    <img className='AddFImg' src="../../../src/assets/Profile-Avatar-PNG.png" alt="" />
                    <span>Add Imagem</span>
                </label>
				<select name="tags" id="tags" placeholder='Tag'>					
                    <option value="valor1">Tag 1</option>
                    <option value="valor2">Tag 2</option>
                    <option value="valor3">Tag 3</option>
				</select>
                <input className='inputCF' type="text" placeholder='Nome do Forum'/>
                <textarea className='inputCF' placeholder='Forum Descrição' cols="30" rows="10"></textarea>
            </form>

            <button className='BtnCF'>
                Criar
            </button>
        </div>
    )
}

export default CreateForum;