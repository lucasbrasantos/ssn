-- == Moderador_status == --

-- 0: "Postado" - enviado e publico para visualização
-- 1: "Denunciado" - Indica que o fórum ou post foi denunciado
-- 2: "Bloqueado" - bloqueado pelo moderador
-- 3: "Ok" - revisado e considerado apropriado pelo moderador.


-- DATETIME format values in 'YYYY-MM-DD hh:mm:ss' an/mes/dia hora:minutos:segundos

-- //////// --

-- // users -= 10 inserts

-- (					  pk_userid, username,   			 name,		         email,                  photourl,                       					points,     timecreated) 
insert into users value  (1,	  'lsemper0',			'Stephen Curry',   'estevaocuri@joma.aq',	'http://dummyimage.com/248x100.png/5fa2dd/ffffff',		19,		'2023/5/11 10:27:35');
insert into users value  (2,	  'sstores1',			'Calvo Klein', 		'niv@tivovlof.ag',		'http://dummyimage.com/202x100.png/dddddd/000000',		11,		'2022/8/14 02:28:47');
insert into users value  (3,	  'LeBronMalabarista',  'Estêvão Curi',	  	'efbi@tozotut.nf',		'http://dummyimage.com/171x100.png/cc0000/ffffff',		37,		'2022/9/14 23:09:15');
insert into users value  (4,	  'rgenney3',			'Tomas Moreno',    	'bo@sicfi.ar',			'http://dummyimage.com/151x100.png/5fa2dd/ffffff',		60,		'2022/7/17 08:19:17');
insert into users value  (5,	  'ksilberschatz4',		'Herrero Victor',   'new@apposfa.la',		'http://dummyimage.com/127x100.png/cc0000/ffffff',		83,		'2022/12/29 10:18:31');
insert into users value  (6,	  'apietron5',			'Andre Pierce',    	'umazaj@le.so',			'http://dummyimage.com/153x100.png/dddddd/000000',		29,		'2022/7/23 00:36:29');
insert into users value  (7,	  'hdevaen6',			'Luis Lawson',     	'ifa@wivozbe.lt',		'http://dummyimage.com/192x100.png/5fa2dd/ffffff',		68,		'2022/12/22 15:38:19');
insert into users value  (8,	  'wpryell7',			'Vargas Vaughn',    'gawen@zopuol.pa',		'http://dummyimage.com/234x100.png/ff4444/ffffff',		82,		'2022/9/6 06:16:56');
insert into users value  (9,	  'cmarskell8',			'Kate Williams',   	'ka@cen.vc',			'http://dummyimage.com/162x100.png/dddddd/000000',		87,		'2023/4/18 15:10:47');
insert into users value (10,	  'SambaLeBron',		'Lebrão da Silva', 	'lebraosilva@lab.nz',	'http://dummyimage.com/127x100.png/cc0000/ffffff',		52,		'2023/5/3 05:38:21');

--  //////////////////




-- // interests -= 11 inserts = !!TAG!! =

-- (                        pk_interestid, description)
insert into interests value (1,		       '#futebol');		
insert into interests value (2,		       '#basquete');		
insert into interests value (3, 	       '#vôlei');		
insert into interests value (4, 	       '#academia');		
insert into interests value (5, 	       '#trilha');		
insert into interests value (6, 	       '#boxe');	

--  //////////////////



-- // user_interests -= 11 inserts

-- (                             fk_interest, fk_userid)
insert into user_interests value (1,	      1);
insert into user_interests value (2,      	  2);
insert into user_interests value (3,      	  3);
insert into user_interests value (4,          4);
insert into user_interests value (5,          1);
insert into user_interests value (1,          6);
insert into user_interests value (2,          7);
insert into user_interests value (3,          8);
insert into user_interests value (4,          9);
insert into user_interests value (5,          10);
insert into user_interests value (2,          1);

--  //////////////////




-- // posts -= 10 inserts


-- (                     pk_postid,	title,								photourl,											  	timeposted,					likes,	userid,	interest,	moderador_status)
insert into posts value (1, 		'Assistindo o Jogo ao Vivo!',		'http://dummyimage.com/191x100.png/5fa2dd/ffffff', 		'2022/8/6 22:48:53', 		314,	1,		1, 			0);
insert into posts value (2, 		'Olha essa cestaaaa',				'http://dummyimage.com/179x100.png/ff4444/ffffff', 		'2023/5/6 06:30:57', 		785,	2,		2, 			0);
insert into posts value (3, 		'Volei?', 							'http://dummyimage.com/170x100.png/ff4444/ffffff', 		'2023/5/5 11:18:15', 		21,		3,		3, 			1);
insert into posts value (4, 		'999kg no supino', 					'http://dummyimage.com/210x100.png/dddddd/000000', 		'2076/6/4 18:03:27', 		789,	4,		4, 			0);
insert into posts value (5, 		'Trilhazinha hoje?', 				'http://dummyimage.com/210x100.png/5fa2dd/ffffff', 		'2022/8/17 23:18:48', 		4500,	1,		5, 			0);
insert into posts value (6, 		'Olha esse gol', 					'http://dummyimage.com/232x100.png/ff4444/ffffff', 		'2107/10/20 17:20:38', 		2677,	6,		1, 			0);
insert into posts value (7, 		'Leblom Jamal', 					'http://dummyimage.com/232x100.png/dddddd/000000', 		'2023/5/31 20:36:25', 		1000,	7,		2, 			0);
insert into posts value (8, 		'Volei hoje? a quadra ta aberta',	'http://dummyimage.com/179x100.png/cc0000/ffffff', 		'2076/6/4 04:19:50', 		13,		8,		3, 			3);
insert into posts value (9, 		'Ta pago', 							'http://dummyimage.com/213x100.png/cc0000/ffffff', 		'2043/2/18 20:31:56', 		460,	9,		4, 			0);
insert into posts value (10, 		'23km hoje', 						'http://dummyimage.com/100x100.png/dddddd/000000', 		'2115/5/29 04:12:27', 		780,	10,		5, 			0);
insert into posts value (11, 		'$%¨#%$#&*@', 						'xxxxxxxxx', 											'2115/5/30 04:12:27', 		0,	1,		2, 			2);

--  //////////////////




-- // comment -= 10 inserts

-- (						commentid,pk_userid,pk_postid, pk_timecommented,	comment,							moderador_status)
insert into comment value   (1,     1, 		1, 			'2007/4/10',		'Jogou demais',                     '3');
insert into comment value   (2,     2, 		2, 			'2005/12/28',		'Bora vôlei sim, vou aparecer lá',  '2');
insert into comment value   (3,     3, 		3, 			'2006/9/30',		'Boa boa',                          '2');
insert into comment value   (4,     4, 		4, 			'2109/10/2',		'Gostei, Top!',                     '3');
insert into comment value   (5,     3, 		5, 			'2006/5/31',		'Esse cara joga demais!',           '2');
insert into comment value   (6,     6, 		6, 			'2007/6/26',		'Hahaha!',                          '1');
insert into comment value   (7,     7, 		7, 			'2003/3/18',        'Esse esporte é muito bom',         '2');
insert into comment value   (8,     8, 		8, 			'2005/6/13',        'Bruninho é bom demais',            '2');
insert into comment value   (9,     3, 		9, 			'2006/5/18',		'Vou aparecer lá!',                 '0');
insert into comment value   (10,    10, 	10, 		'2003/5/14',	    'Boa!',                             '1');

--  //////////////////




-- // forum -= 10 inserts

-- (                      pk_forumid,    userid,	      title,											description, 											tags,	likes,		created_at,		moderador_status)
insert into forum value   (1, 			  1, 			 'O que fazer para vencer no futebol?',				'Dicas para melhorar seu desempenho no futebol.', 		1, 	 	724, 		'2049/3/28 21:31:47', 	1);
insert into forum value   (2, 			  2, 			 'Opiniões sobre o jogo de ontem?',					'Comentários sobre os jogos recentes.', 				2, 	 	118, 		'2032/9/3 01:42:20', 	1);
insert into forum value   (3, 			  3, 			 'Dicas para melhorar no vôlei.',					'Estratégias para se destacar no vôlei.', 				3, 	 	578, 		'2054/5/11 22:31:23', 	0);
insert into forum value   (4, 			  4, 			 'Ganhar massa magra: como fazer?',					'Orientações para ganhar massa muscular.', 				4,	    400, 		'2049/5/7 21:22:39', 	0);
insert into forum value   (5, 			  1, 			 'Regular as marchas da bike.',						'Ajustes corretos nas marchas da bike.', 				5, 	 	94, 		'2027/12/26 09:34:11', 	3);
insert into forum value   (6, 			  6, 			 'Dúvidas sobre fabricação de bolas esportivas.',	'Discussões sobre a fabricação de bolas esportivas.', 	1, 	 	798, 		'2036/2/2 21:27:44', 	3);
insert into forum value   (7, 			  7, 			 'Previsões do Lakers.',							'Discussões sobre o desempenho do Lakers.', 			2, 	 	893, 		'2118/8/28 06:24:48', 	3);
insert into forum value   (8, 			  8, 			 'Natação para diabéticos tipo 3.',					'Natação para pessoas com diabetes tipo 3.', 			3, 	 	400, 		'2100/2/20 06:35:33', 	0);
insert into forum value   (9, 			  9, 			 'Destaques das jogadas do Bruninho.',				'Análises das melhores jogadas do Bruninho.', 			4, 	 	707, 		'2049/10/12 08:47:58', 	2);
insert into forum value   (10,			  10,			 'Voleibol para cadeirantes.',						'Voleibol adaptado para cadeirantes.', 					5, 	 	198, 		'2071/6/5 00:19:47', 	1);

--  //////////////////




-- // forum_interactions -= 10 inserts

-- (						pk_interaction / fk_userid / fk_forumid		content,																																											photourl,											likes,	created_at,			  moderador_status)
insert into forum_interactions value   (1,		1,		 1,				 'Uma dica importante é treinar regularmente e focar no aprimoramento das técnicas de passe e finalização.',																		'http://dummyimage.com/101x100.png/cc0000/ffffff',  '265',	'2058/8/11 18:53:05', 	'2');
insert into forum_interactions value   (2,		2,		 2,				 'Foi um jogo emocionante! O time visitante mostrou muita garra, mas a equipe da casa conseguiu se destacar nos momentos decisivos.', 												'http://dummyimage.com/125x100.png/cc0000/ffffff',  '124', 	'2115/12/22 09:27:18', 	'0');
insert into forum_interactions value   (3,		3,		 3,				 'Para melhorar no vôlei, é fundamental praticar o saque, a recepção e os fundamentos de ataque. Além disso, trabalhe em equipe e tenha uma boa comunicação em quadra.', 			'http://dummyimage.com/184x100.png/ff4444/ffffff',  '31', 	'2118/8/2 01:20:31', 	'3');
insert into forum_interactions value   (4,		4,		 4,				 'Além de um treinamento consistente, é importante ter uma dieta balanceada com consumo adequado de proteínas. Consulte um nutricionista para obter orientações personalizadas.', 	'http://dummyimage.com/114x100.png/cc0000/ffffff',  '512', 	'2046/1/22 10:09:33', 	'0');
insert into forum_interactions value   (5,		1,		 5,				 'Ajustar corretamente as marchas da bicicleta é essencial para um pedal suave. Certifique-se de alinhar as engrenagens e fazer os ajustes necessários para evitar trancos.', 		'http://dummyimage.com/249x100.png/cc0000/ffffff',  '714', 	'2053/5/21 00:22:48', 	'0');
insert into forum_interactions value   (6,		6,		 6,				 'Alguém sabe qual material é mais adequado para a fabricação de bolas de futebol? Estou pensando em produzir algumas para um projeto escolar', 									'http://dummyimage.com/151x100.png/5fa2dd/ffffff',  '303', 	'2061/9/3 04:56:29', 	'2');
insert into forum_interactions value   (7,		7,		 7,				 'Acredito que o Lakers tem uma equipe forte e vai dar trabalho nesta temporada. Quais são suas previsões para o desempenho da equipe?', 											'http://dummyimage.com/132x100.png/dddddd/000000',  '439', 	'2044/4/27 16:43:14', 	'3');
insert into forum_interactions value   (8,		8,		 8,		 		 'Praticar natação é ótimo para manter a saúde em dia, mas é importante consultar um médico para verificar se há alguma restrição específica para diabéticos tipo 3', 				'http://dummyimage.com/109x100.png/cc0000/ffffff',  '603', 	'2027/10/24 23:51:43', 	'0');
insert into forum_interactions value   (9,		9,		 9,				 'O Bruninho é um jogador incrível! Suas jogadas são sempre precisas e estratégicas. Qual foi a jogada mais memorável que você já viu dele?', 										'http://dummyimage.com/171x100.png/ff4444/ffffff',  '22', 	'2103/2/25 14:46:53', 	'3');

--  //////////////////




-- // friends -= 10 inserts

-- (				pk_fk_userid,	pk_fk_userid_friend)
insert into friends value   (1, 2);
insert into friends value   (2, 3);
insert into friends value   (3, 4);
insert into friends value   (4, 1);
insert into friends value   (1, 6);
insert into friends value   (6, 7);
insert into friends value   (7, 8);
insert into friends value   (8, 9);
insert into friends value   (9, 10);
insert into friends value 	(10, 1);

--  //////////////////




-- // chats -= 10 inserts

-- (					  chatid  message,								pk_time_stamp,	fk_userid_senderid / fk_userid_receiverid)
insert into chats value (1,      'bora um fut?',						    '2028/1/18 13:54:58', 	1, 			2);
insert into chats value (2,      '14:20',							        '2016/1/22 12:09:17', 	2, 			3);
insert into chats value (3,      'Volei as 14:40?', 				    	'2027/9/23 10:14:39', 	3, 			4);
insert into chats value (4,      'Bora!', 						    	    '2014/7/13 02:11:00', 	4, 			1);
insert into chats value (5,      'Tmj irmão!', 					    	    '2023/2/13 03:22:04', 	1, 			6);
insert into chats value (6,      'Obrigado', 				    		    '2013/2/23 17:35:42', 	6, 			7);
insert into chats value (7,      'Jogou dms ontem!',					    '2008/8/11 07:40:38', 	7, 			8);
insert into chats value (8,      'Depois ou vou lá', 					    '2010/12/14 14:15:27', 	8, 			9);
insert into chats value (9,      'Hoje vai ser top!',					    '2025/6/18 05:01:48', 	9, 			10);
insert into chats value (10,     'Faz tempao que eu não jogo um fut',   	'2006/6/18 11:53:28', 	10,			 1);

