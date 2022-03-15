# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   i.create(name: "Luke", movie: movies.first)

require 'rest-client'

#user info
user_data_fetch = RestClient.get "https://randomuser.me/api/?results=50&inc=name,picture,email,login&noinfo"
user_data_fetch_array = JSON.parse(user_data_fetch)['results']

#get random zip code
user_zip_fetch = RestClient.get 'https://www.zipcodeapi.com/rest/DemoOnly00TI1Od5ISw7un38vLdKe0m4RU2n9w41ZHvnOpyG4XirUKoujCiCNtFs/radius.json/33065/50/mile'
user_zip_fetch_array = JSON.parse(user_zip_fetch)['zip_codes'] 

#category + item info
category_data = RestClient.get 'https://fakestoreapi.com/products/categories'
category_data_array = JSON.parse(category_data)


User.create!(name: "AJ Jalusi", email: 'ajalusi26@gmail.com', profile_pic: 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640', password: "moshiachnow1" , zipcode: 33065, city: 'Coral Springs')

user_data_fetch_array.each do |i|
    name = i['name']['first'] + " " + i['name']['last']
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

category_data_array.each do |i|
    category = i 
    new_category = Category.create!(name: category)

    products_fetch = RestClient.get 'https://fakestoreapi.com/products'
    product_data_array = JSON.parse(products_fetch)

    
    condition_array = ["New", "Used", "Like new"]
 

    product_data_array.each do |product|
    # category = new_category.id
    condition = rand(0..2)
    user = User.find(rand(1..50))
    user_id = user.id
    city = user.city
    zipcode = user.zipcode
    category_id = new_category.id
        
    image = product["image"]
    name = product["title"]
    description = product["description"]
    price = product["price"]
        Item.create!(
            user_id: user_id,
            category_id: category_id ,
            zipcode: zipcode,
            city: city,
            image: image,
            name: name, 
            description: description,
            condition: condition_array[condition],
            price: price,
            sold: false
        )
    end
   
end
puts "seeding done"