export default {
    productValidate(name,category, description,sizesLength){
        //Presence checks
        if(!name){
            return 'Please enter a name'
        } else if(!description){
            return 'Please enter a description'
        } else if(!category){
            return 'Please enter a category'
        } else if (!sizesLength){
            return 'Please enter atleast one size'
        }
        //Length checks
        if(name.length>100){
            return 'Name cannot exceed 100 characters'
        } else if(category.length>100){
            return 'Category cannnot exceed 100 characters'
        } else if(description.length>300){
            return 'Description cannot exceed 300 characters'
        } else if(sizesLength>50){
            return 'Maximum length of sizes can be 50'
        }
        
        //Normality checks (regular expressions)
        return null
    },
    sizeValidate(size,price){      
        //Presense checks 
        if(!size){
            return 'Please enter a size'
        } else if(!price){
            return 'please enter a price'
        }
        //Sanity Checks
        if(isNaN(price)){
            return 'Price must be a number'
        }

        //Length Checks
        if(size.length>50){
            return 'Size length cannot exceed 100 characters'
        } else if(price>100000){
            return 'Price cannot be greater than 100000'
        }
        return null
    },
    orderValidate(name,phone,email,orderItemsLength){
        //Presence Checks
        if(!name){
            return 'Please enter a name'
        } else if(!phone && !email){
            return 'Please enter a phone number or an Email address'
        } else if(!orderItemsLength){
            return 'Please atleast add 1 item to the order'
        }

        //Length checks
        if(name.length>100){
            return 'Name length cannot exceed 100 characters'
        } else if(phone.length>15){
            return 'Phone number needs to have less than 15 characters' //TODO: Update this
        } else if(email.length>100){
            return 'Email length cannot exceed 100 characters'
        }

        //Sanity checks
        if(!emailRegEx(email)){
            return 'Please enter valid email'
        } else if(!phoneRegEx(phone)){
            return 'Please enter a valid phone number'
        }
        //TODO: Add regular expression for email and phone checks too and name checks that it doesn't contain any numeric letter
    },
    queryValidate(name,email,phone,message){
        //Presence checks
        if(!name){
            return 'Please enter a name'
        } else if(!phone && !email){
            return 'Please enter a phone number or an Email address'
        } else if(!message){
            return 'Please enter a message'
        }

        //Length Checks
        if(name.length>100){
            return 'Name length cannot exceed 100 characters'
        } else if(phone.length>20){
            return 'Phone number needs to have less than 20 characters' //TODO: Update this
        } else if(email.length>100){
            return 'Email length cannot exceed 100 characters'
        } else if(message.length > 500 || message.length < 10){
            return 'Message should be between 10-500 characters'
        }

        //Sanity Checks
        if(!emailRegEx(email)){
            return 'Please enter valid email'
        } else if(!phoneRegEx(phone)){
            return 'Please enter a valid phone number'
        }
        return null;
    },
    emailRegEx(email){
        let regex = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/
        return regex.test(email)
    },
    phoneRegEx(phone){
        let regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
        return regex.test(phone) 
    },
}