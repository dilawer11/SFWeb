export default{
    productTrimmer(name,category,sizes){
        if(!name && !sizes && !category && !sizes.length){
            return null
        } else{
            let product = {}
            product.name = name.trim()
            product.category = category.trim()
            product.sizes = []
            sizes.forEach(sizeObj => {
                sizeObj.size = sizeObj.size.trim()
                product.sizes.push(sizeObj)
            });
            return product
        }
    }
}