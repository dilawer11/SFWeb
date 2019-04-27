<template>
   <div id="order">
        <section class="testimonials padding-top-90 padding-bottom-90" id="testimonials">         
            <div class="center-align container">
                <h1>Order Form</h1>
            </div>
        </section>


    <section class="portfolio" id="portfolio">
    
        <div class="container">
            <div class="formBox">

                <form>
                    <div class="row">
                        <div class="col-sm-6">
                            <h3 >First Name: </h3>
                            <div class="inputBox ">
                                <input ref="FirstName" v-model=FirstName type="text" class="input" >
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <h3>Last Name: </h3>
                            <div class="inputBox ">
                                <input ref="LastName" v-model=LastName type="text" class="input" >
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-6">
                            <h3>Email: </h3>
                            <div class="inputBox ">
                                <input v-model=Email type="text" class="input" >
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <h3>Phone: </h3>
                            <div class="inputBox ">
                                <input v-model=Phone type="text" class="input" @keydown="isPhoneNumber">
                            </div>
                        </div>
                    </div>



                    <div class="row">
                        <form class="add-item padding-bottom-2 padding-right-2  padding-left-2 padding-top-2 bg-info" @submit.prevent="AddProduct">

                            <h3>Add product:</h3>
                            
                            <div class="row">

                                <div class="form-group">
                                    <label class="control-label col-md-2" for="item" style=" font-size: 16px;">Item Name</label>
                                        <div class="col-md-4">
                                            <select id="item-name" class="form-control" v-model=currentProduct>
                                                <option :value=p v-for="p in products" :key="p.id" >{{p.name}}</option>                   
                                            </select> 
                                        </div>

                                    <label class="control-label col-md-2" for="quantity" style=" font-size: 16px;">Quantity</label>
                                        <div class="col-md-4">
                                            <input type="text" id="quantity" class="form-control" style="width: 100%" v-if="!(this.currentProduct===null)" placeholder=" " v-model=selected.quantity  @keypress="isNumber">
                                            <input type="text" id="quantity" class="form-control" style="width: 100%" v-else disabled placeholder="Chose an item first" v-model=selected.quantity @keypress="isNumber" @keyup="isNumber"> 
                                        </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="form-group">
                                    <label class="control-label col-md-2" for="size" style=" font-size: 16px;">Size</label>
                                        <div class="col-md-4">
                                            <select id="size" class="form-control" v-model=selected.sizes >
                                                <option :value="sizes" v-for="(sizes,index) in currentSizePrice" :key="index">{{sizes.size}}</option> 
                                            </select> 
                                            
                                        </div>
                                    <label class="control-label col-md-2" for="price" style=" font-size: 16px;">Price</label>
                                        <div class="col-md-4">
                                            <label id="price" class="form-control" >{{selected.sizes.price}}</label>
                                        </div>
                                </div>
                            </div>
              
                            <div class="row right-text">
                                <div class="col-sm-10">

                                    <label v-if="!Total" style="font-size: 16px;" id="price">Total: 0</label>
                                    <label v-if="Total" style="font-size: 16px;" id="price">Total: {{Total}}</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="submit" class="btn btn-primary " value="Add to Cart"></input>
                                </div>
                                
                                
                               
                                
                            </div>
                        </form>
                    </div>


                    <label v-if="this.feedback" style="color:rgba(151, 26, 26, 0.5);">{{feedback}}</label>
                    <label v-if="this.feedback===null"> </label>

                    <div class="table-responsive padding-top-2">
                        <table class="table" v-if="this.Cart.length!==0">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Quantity</th>
                                    <th>Size</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr v-for="(item, index) in this.Cart" :key="index">
                                
                                    <th>{{item.name}}</th>
                                    <th>{{item.quantity}}</th>
                                    <th>{{item.sizes.size}}</th>
                                    <th>{{item.sizes.price}}</th>
                                    <th>{{item.total}}</th>

                                </tr>


                            </tbody>

                            <tfoot>
                                <tr>
                                    <th> </th>
                                    <th> </th>
                                    <th> </th>
                                    <th> </th>
                                    <th>{{OrderTotal}}</th>
                                </tr>
                            </tfoot>

                        </table>
                    </div>


                    <div class="row padding-top-90">
                        <div class="btn-toolbar pull-right">
                            <button type="button" id="placeOrder" class="btn btn-primary btn-lg" @click="PlaceOrder">Place Order</button>
                            <button type="button" id="getQuote" class="btn btn-primary btn-lg">Get Price Quote</button>
                        </div>
                    </div>
                </form>




            </div>
        </div>

        
    </section>
                     

    
    </div>
</template>

<script>

import db from '@/firebase/init'
import { constants } from 'crypto';
import { COPYFILE_EXCL } from 'constants';

export default {
    name: 'Order',
    data(){
        return{
            products: [],
            currentProduct: null,
            currentSizePrice: null,

            ITEM:{
                name:null,
                price: 0,
                quantity:0,
                size: null,
                total:0
            },


            selected:{
                name:null,
                quantity:null,
                sizes:{
                    price: null,
                    size: null
                },
                total:0
            },
            FirstName:null,
            LastName:null,
            Email: "",
            Phone: "",

            Cart: [],
            feedback:null

        }
    },
    methods:{

            isPhoneNumber(event)
            {
                var phoneno = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
                if(inputtxt.value.match(phoneno))
                {
                    return true;      
                }
                else
                {
                    this.feedback="Not a valid Phone Number";
                    return false;
                }
            },
            isPhoneNumber(event){
            if (!(event.key === "Backspace" || event.key === "Delete" || event.key==="+"))
            {
                if (!(event.key === 'Enter' || (Number(event.key) >= 0 && Number(event.key) <= 9)))
                {
                    this.feedback="Phone Number can only contain numbers";
                    event.preventDefault();
                }
                else if(this.Phone.length>=13)
                {
                    this.feedback="Phone Number can only contain 13 numbers";
                    event.preventDefault();

                }
                else
                {
                    this.feedback=null
                }
            }
            else
            {
                 this.feedback=null
            }
           
        },
        isNumber(event){
            if (!(event.key === 'Enter' || (Number(event.key) >= 0 && Number(event.key) <= 9)))
            {
                this.feedback="Quantity must be a number";
                event.preventDefault();
            }
            else
            {
                this.feedback=null
            }

        },
           
        AddProduct(e){
            if(isNaN(this.selected.quantity))
            {
                this.feedback="QUANTITY MUST BE A NUMBER"
                this.selected.quantity=null;
            }
            if(this.selected.name!==null && this.selected.quantity!==null && this.selected.sizes!=={} && this.selected.price!==0)
            {
                var temp = this.selected.quantity * this.selected.sizes.price
                
                this.selected.total=temp
                console.log("hereee")
                console.log(this.selected.total)
                var temp=Object.assign({},this.selected)
                this.Cart.push(temp)
            
                this.$nextTick(() => {
            	this.currentProduct = null
                })
            }
            else
            {
                this.feedback="Incomplete entries in the form"
            }
            

         
        },
        PlaceOrder(e){
            var temp="";
            if(!this.LastName||!this.FirstName || !this.Phone || !this.Email)
            {
                temp+="Missing details in the form \n"
            }

            
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (this.Email && !(re.test(String(this.Email).toLowerCase()) && this.Email.length>4))
            {
                temp+="Enter a Valid Email \n"
                
            }
          
            if(this.Cart.length===0){
                temp+=" Add products to Cart before placing order\n"
            }

            if(temp!=="")
            {
                this.feedback=temp;
            }
            else{
                this.feedback=null
                var Fullname=this.FirstName+' '+ this.LastName
                
                // var orderTotal=0;
                // let i=0
                // for(i=0; i<this.Cart.length;  i=i+1)
                // {
                //     t+=this.Cart[i].total

                // }
                
                console.log(Fullname)                
                console.log(this.Email)
                console.log(this.Phone)
                console.log(this.Cart)

                db.collection('products').add({
                    email:this.Email,
                    items:this.Cart,
                    name:this.Fullname,
                    no:0,
                    phone:this.Phone,
                    status:"SENT",
                    total:0
                 

                }).then(()=>{
                    this.loading=false;
                    alert('Order Sucessfully Place')
                    this.$router.push({name:'Dashboard'})
                }).catch(err=>{
                    this.loading=false;
                    alert('Something went wrong please try again later')
                    this.$router.push({name:'Dashboard'})
                })
                
// email "dilawer11@gmail.com"
// id "MkQfASi57iF2uq69HjjQ"
// items [{name: "Cotton Wool", pri...]
// name "Dilawer"
// no 21
// phone "+923234443331"
// status "SENT"
// total 190 


            }

        }

    },
    computed: {
        OrderTotal()
        {
            var t=0;
            var i=0
            for(i=0; i<this.Cart.length;  i=i+1)
            {
                t+=this.Cart[i].total

            }
            return t;
            
        },
        Total()
        {
            return this.selected.quantity * this.selected.sizes.price
        }
    },
    watch: {
        selected: function (val)
        {
            if(val.sizes.size===null)
            {
                val.sizes.price=null
            }
        },
            Email: function (val){
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (val && (re.test(String(val).toLowerCase()) && val.length>4))
                {
                    this.feedback=null;
                }
            },
            Phone: function(val)
            {
                if (val.length===11)
                {
                    this.feedback=null;
                }
            },
            currentProduct: function (val) {

            if(val!==null)
            {
                this.selected.name=val.name
                this.currentSizePrice = val.sizes
            }
            else
            {
                this.currentProduct= null
                this.currentSizePrice= null
                this.selected.name=null
                this.selected.quantity=null
                this.selected.sizes={}
                this.selected.total=0;
               
            }
        }
        
    },    
    created()
    {
        //fetch data from firestore
        db.collection('products').get()//returns a promise
        .then(snapshot => {
            snapshot.forEach(doc => {
                let p = doc.data()
                p.id = doc.id
                this.products.push(p)
            });
    })//then is fired when promise completes




    }
}
</script>


<style>
.input-group-addon {
    min-width:8em;
    text-align:left;
}
.padding-bottom-50{

    padding-bottom:5em;
    
}
.padding-top-2{

    padding-top:2em;
    
}
.padding-bottom-2{

    padding-bottom:2em;
    
}
.padding-left-2{

    padding-left:2em;
    
}
.padding-right-2{

    padding-right:2em;
    
}
.highlight{
    color: darkgray
}
</style>
