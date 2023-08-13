import React from 'react'
import './style.scss'

const LateralMenu = () => {
  return (
	<div className='boxMenu'>
		<div className='opcs opcs-user'>
			<img src="../../../src/assets/Icon.png" alt="" />
			nome usuario
		</div>

		<div className='opcs'>
			<img src="../../../src/assets/icons/fluent-mdl2_add-friend.png" alt="" />
			add amigo
		</div>

		<div className='opcs'>
			<img src="../../../src/assets/icons/fluent-mdl2_settings.png" alt="" />
			acessibilidade
		</div>

		<div className='opcs'>
			<img src="../../../src/assets/icons/fluent-mdl2_clear-night.png" alt="" />
			tema
		</div>

		<div className='opcs'>
			<img src="../../../src/assets/icons/fluent-mdl2_chrome-back.png" alt="" />
			sair
		</div>
	</div>
  )
}

export default LateralMenu