SELECT
  id,
  distritos.the_geom_webmercator,
  distritos.name,
  year,
  value
FROM tasa_de_paro
  LEFT JOIN distritos
  ON tasa_de_paro.district_id=distritos.cartodb_id
