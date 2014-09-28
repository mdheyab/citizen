SELECT
  id,
  distritos.the_geom_webmercator,
  distritos.name AS name,
  year,
  value
FROM poblacion_anciana
  LEFT JOIN distritos
  ON poblacion_anciana.district_id=distritos.cartodb_id
