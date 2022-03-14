# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   i.create(name: "Luke", movie: movies.first)

require 'rest-client'

user_data_fetch = RestClient.get "https://randomuser.me/api/?results=50&inc=name,picture,email,login&noinfo"
user_data_fetch_array = JSON.parse(user_data_fetch)['results']

user_zip_fetch = RestClient.get 'https://www.zipcodeapi.com/rest/DemoOnly003Q6AsvKVbYRRZr2lMG2nPGyiCMjaNlkBAmRsJmtNqTyxSCNN6vatwW/radius.json/33065/50/mile'
user_zip_fetch_array = JSON.parse(user_zip_fetch)['zip_codes'] 


User.create!(name: "AJ Jalusi", email: 'ajalusi26@gmail.com', profile_pic: 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640', password: "moshiachnow1" , zipcode: 33065, city: 'Coral Springs')

user_data_fetch_array.each do |i|
    name = i['name']['first'] + " "+ i['name']['last']
    email = i['email']
    profile_pic = i['picture']['medium']
    password = i['login']['password']
    zip = rand(0..283)

    User.create!(
        name: name, 
        email: email,
        profile_pic: profile_pic,
        zipcode: user_zip_fetch_array[zip]['zip_code'].to_i,
        city: user_zip_fetch_array[zip]['city'],
        password: password)
   end


Category.create(name: 'Electronics & Media')
Category.create(name: 'Home & Garden')
Category.create(name: 'Clothing, Shoes, & Accessories')
Category.create(name: 'Baby & Kids')
Category.create(name: 'Vehicles')
Category.create(name: 'Sports & Outdoors')
Category.create(name: 'Pet supplies')
Category.create(name: 'Collectibles & Art')
Category.create(name: 'Toys, Games, & Hobbies')

puts "seeding done"