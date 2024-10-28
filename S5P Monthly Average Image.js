// code for S5P monthly average image extraction and visualisation

// input bd shapefile as geometry
var geometry = ee.FeatureCollection("users/rakib-7-2018525638/BGD_adm0");
// var geometry = ee.Geometry.Polygon([[90.0, 23.5], [91.0, 23.5], [91.0, 24.5], [90.0, 24.5]])
Map.addLayer(geometry)

// tropospheric_NO2_column_number_density	
// SO2_column_number_density
// CH4_column_volume_mixing_ratio_dry_air
// CO_column_number_density


// calling variable for certain gas
var year = '2019'
var gas = 'NO2'
var collection = 'COPERNICUS/S5P/OFFL/L3_NO2'
var band = 'tropospheric_NO2_column_number_density'
var start_time = '2019-01-01'
var end_time = '2020-12-31'


// extacting the s5p data according to location, time and certain gas ...and...assining the year-month tag
var IMGcollection = ee.ImageCollection(collection)
.filterBounds(geometry)
.filterDate(start_time,end_time)
.select(band)
.map(function(a){
  return a.set('month', ee.Image(a).date().get('month'))
})


// Calculate the mean NO2 concentration for each month 
var months = ee.List(IMGcollection.aggregate_array('month')).distinct()
print('months', months)
print(months.get(2)) // works as like list in python

var gas_collection = ee.ImageCollection.fromImages(months.map(function(x){
  return IMGcollection.filterMetadata('month', 'equals', x).mean().set('month', x)
}))
print('gas_collection', gas_collection)

// making a single image of all months avg from image collection
var gas_Map = gas_collection.mean().clip(geometry) 

// visualizing parameter
var band_viz = {
  min: 0,
  max: .0002,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

Map.addLayer(gas_Map, band_viz, 'S5P ' + gas + ' 12month avg');


// Create a time series chart
var chart = ui.Chart.image.series(gas_collection, geometry,ee.Reducer.mean(), 5000,'month')
.setOptions({
title: gas + 'Concentration',
vAxis: {title: 'Concentration(μg/m²)'},
hAxis: {title: 'Month'}
})
print(chart)

// exporting single image of all 12 months avg
Export.image.toDrive({
  image: gas_Map,
  description: gas + year,
  folder: 'S5p',
  scale: 1000,
  maxPixels: 10000000000000,
  region: geometry,
  fileFormat: 'GeoTIFF'
})



/*amar ekhane 12 ta alada alada month ase. 
ami ebar chacchi notun ekta variable banabo. 
jekhane 1234 month milay ekta season hobe, 5678 milay arekta and cholbe. 
er pore, graph banabo just. season v concentration*/

// assigning variable for each months and extract the image from the image collection list
var jan = ee.ImageCollection.fromImages(gas_collection.toList(1, 0)).mean().clip(geometry)
var feb = ee.ImageCollection.fromImages(gas_collection.toList(1, 1)).mean().clip(geometry)
var mar = ee.ImageCollection.fromImages(gas_collection.toList(1, 2)).mean().clip(geometry)
var apr = ee.ImageCollection.fromImages(gas_collection.toList(1, 3)).mean().clip(geometry)
var may = ee.ImageCollection.fromImages(gas_collection.toList(1, 4)).mean().clip(geometry)
var jun = ee.ImageCollection.fromImages(gas_collection.toList(1, 5)).mean().clip(geometry)
var jul = ee.ImageCollection.fromImages(gas_collection.toList(1, 6)).mean().clip(geometry)
var aug = ee.ImageCollection.fromImages(gas_collection.toList(1, 7)).mean().clip(geometry)
var sep = ee.ImageCollection.fromImages(gas_collection.toList(1, 8)).mean().clip(geometry)
var oct = ee.ImageCollection.fromImages(gas_collection.toList(1, 9)).mean().clip(geometry)
var nov = ee.ImageCollection.fromImages(gas_collection.toList(1, 10)).mean().clip(geometry)
var dec = ee.ImageCollection.fromImages(gas_collection.toList(1, 11)).mean().clip(geometry)
print('jul', jul);

Map.addLayer(jan, band_viz, 'jan')
// Map.addLayer(aug, band_viz, 'aug')
// Map.addLayer(dec, band_viz, 'dec')


// exporting jan-dec images (each image caontains all years each month's avg)
Export.image.toDrive({
  image: jan,
  description: gas + '_Jan',
  folder: 'S5p',
  scale: 1000,
  maxPixels: 10000000000000,
  region: geometry,
  fileFormat: 'GeoTIFF'
})

Export.image.toDrive({
  image: feb,
  description: gas + '_feb',
  folder: 'S5p',
  scale: 1000,
  maxPixels: 10000000000000,
  region: geometry,
  fileFormat: 'GeoTIFF'
})

Export.image.toDrive({
  image: mar,
  description: gas + '_mar',
  folder: 'S5p',
  scale: 1000,
  maxPixels: 10000000000000,
  region: geometry,
  fileFormat: 'GeoTIFF'
})

Export.image.toDrive({
  image: apr,
  description: gas + '_apr',
  folder: 'S5p',
  scale: 1000,
  maxPixels: 10000000000000,
  region: geometry,
  fileFormat: 'GeoTIFF'
})

Export.image.toDrive({
  image: may,
  description: gas + '_may',
  folder: 'S5p',
  scale: 1000,
  maxPixels: 10000000000000,
  region: geometry,
  fileFormat: 'GeoTIFF'
})

Export.image.toDrive({
  image: jun,
  description: gas + '_jun',
  folder: 'S5p',
  scale: 1000,
  maxPixels: 10000000000000,
  region: geometry,
  fileFormat: 'GeoTIFF'
})

Export.image.toDrive({
  image: jul,
  description: gas + '_jul',
  folder: 'S5p',
  scale: 1000,
  maxPixels: 10000000000000,
  region: geometry,
  fileFormat: 'GeoTIFF'
})

Export.image.toDrive({
  image: aug,
  description: gas + '_aug',
  folder: 'S5p',
  scale: 1000,
  maxPixels: 10000000000000,
  region: geometry,
  fileFormat: 'GeoTIFF'
})

Export.image.toDrive({
  image: sep,
  description: gas + '_sep',
  folder: 'S5p',
  scale: 1000,
  maxPixels: 10000000000000,
  region: geometry,
  fileFormat: 'GeoTIFF'
})

Export.image.toDrive({
  image: oct,
  description: gas + '_oct',
  folder: 'S5p',
  scale: 1000,
  maxPixels: 10000000000000,
  region: geometry,
  fileFormat: 'GeoTIFF'
})

Export.image.toDrive({
  image: nov,
  description: gas + '_nov',
  folder: 'S5p',
  scale: 1000,
  maxPixels: 10000000000000,
  region: geometry,
  fileFormat: 'GeoTIFF'
})

Export.image.toDrive({
  image: dec,
  description: gas + '_dec',
  folder: 'S5p',
  scale: 1000,
  maxPixels: 10000000000000,
  region: geometry,
  fileFormat: 'GeoTIFF'
})
