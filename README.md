# rest-api-fav-games

La url del servidor donde esta alojada la api rest es el siguiente: https://app-a959b2a3-0619-40ff-8d61-13c714ac5c6e.cleverapps.io

Para pruebas con postman:
GET
curl --location 'http://app-a959b2a3-0619-40ff-8d61-13c714ac5c6e.cleverapps.io/get_favorite_games'
POST
curl --location 'http://app-a959b2a3-0619-40ff-8d61-13c714ac5c6e.cleverapps.io/post_favorite_game' \
--form 'name="God of War"' \
--form 'launch_date="2000-03-23"' \
--form 'amount_stars="4.5"' \
--form 'reason="Me gusta mucho"' \
--form 'image=@""'
