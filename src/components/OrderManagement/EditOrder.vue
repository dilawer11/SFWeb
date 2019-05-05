<template lang=html>
    <div class="edit-order">
        <div v-if="loading" class="progress">
            <div class="indeterminate"></div> 
        </div>
       <div v-if="contentLoaded">
        <h2 class="center-align black-text">Edit Order</h2>
        <div class="container" v-if="order && products.length">
            <div class="row edit-head" style="padding:20px">
                <div class="col s12 m6 l6">
                    <label>Name:</label><input type="text" v-model="order.name">
                    <label>Email ID:</label><input type="text" v-model="order.email">
                    <label>Phone:</label><input type="text" v-model="order.phone">
                </div>
                <div class="col s12 m6 l6">
                    <h6 class="grey-text indent">Order No: <span class="black-text indent">{{order.no}}</span></h6>
                    <h6 class="grey-text indent">Status: &nbsp;&nbsp;&nbsp;&nbsp; <span class="black-text indent">{{order.status}}</span></h6>
                </div>
        
            </div>
            <div class="divider"></div>
            <div class="row">
          
                <div class="col s12 m12 l12">
                    <table class="responsive-table highlight">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Size</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,itemIndex) in order.items" :key="itemIndex" >
                                <td>
                                    <select v-model="item.name" @change="updateItemName(itemIndex)" class="browser-default">
                                        <option selected>{{item.name}}</option>
                                        <option v-for="(product,i) in products.filter(product=>product.name!=item.name)" :key="i">{{product.name}}</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="text" @change="updateItemTotal(itemIndex)" v-model="item.quantity">
                                </td>
                                <td>
                                    <select v-if="products[findProductbyName(item.name)]" v-model="item.size" @change="updateItemSize(itemIndex)" class="browser-default">
                                        <option selected>{{item.size}}</option>
                                        <option v-for="(element,i) in products[findProductbyName(item.name)].sizes.filter(sizeObj=>sizeObj.size!=item.size)" :key="i">{{element.size}}</option>
                                    </select>
                                    <span v-else>
                                        {{item.size}}
                                    </span>
                                </td>
                                <td>{{item.price}}</td>
                                <td>{{item.quantity*item.price}}</td>
                                <td class="delete-item"><i @click="deleteItem(itemIndex)" class="material-icons">delete</i></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="right-align add-new-button"><button class="btn-large red"> <i @click="addNewProduct()" class="material-icons">add</i></button></td>                                

                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>                                
                            </tr>
                        </tbody>
                    </table>
                    <br>
                    <h6 class="right-align grey-text">Total Amount: <span class="indent black-text">{{totalAmount}} &nbsp;&nbsp;</span></h6>
                </div>
            </div>
             <p class="center-align red-text" v-if="feedback">{{feedback}}</p>
            <div class="row status">
                <div class="input-feild col s6 m4">
                    <select v-model="selectedStatus" @change="changeStatus" class="browser-default">
                        <option value="" disabled selected> Choose a status</option>
                        <option v-for="(item,i) in statusOptions" :key="i">{{item}}</option>
                    </select>
                    <label>Change Status</label> 
                </div>
                <div class="input-feild col s6 m4">
                    <span class="waves-effect waves-light btn-large red darken-2 right" @click="goToView()">VIEW ORDER</span>
                </div>
                <div class="input-feild col s6 m4">
                    <span class="waves-effect waves-light btn-large red darken-2 right" @click="updateOrder()">SAVE ORDER</span>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import { mapState } from 'vuex'
import validate from '@/js_files/validation.js'
export default {
    name: 'EditOrder',
    data(){
        return {
            feedback: null,
            loading: true,
            selectedStatus: null,
            order:null,
            products: [],
            orderLoaded: false,
            productsLoaded:false,
            contentLoaded:false,
        }
    },
    methods:{
        addNewProduct(){
            if(this.order.items[this.order.items.length-1].name != ''){
                let item = {}
                item.name = ''
                item.quantity = 0
                item.size = ''
                item.price = 0
                item.total = 0
                this.order.items.push(item);
                this.feedback = null;
            } else {
                this.feedback = 'Please add the details in the last product before adding new ones'
            }
            
        },
        changeStatus(){
            if(this.selectedStatus!=this.order.status){
                this.loading=true;
                this.order.status=this.selectedStatus;
            }
        },
        updateOrder(){
            this.feedback = validate.orderValidate(this.order.name,this.order.phone,this.order.email,this.order.items.length)
            if(!this.feedback){
                this.loading = true;
                if(confirm('Are you sure you want to edit the order?')){
                    db.collection('orders').doc(this.order.id).update(this.order).then(()=>{
                        alert('Order Updated Successfully')
                        this.loading=false;
                        this.$router.push({name:'ViewOrder',params:{order_no:this.order.no}})      
                        
                    }).catch(err=>{
                        alert('Something went wrong please try again later')
                        this.handleErr(err);       
                    })
                }            
            }            
        },
        goToView(){
            if(confirm('Are you sure you want to leave this page? Any unsaved changes will be lost')){
                this.$router.push({name:'ViewOrder',params: {order_no: this.order.no}})
            }
        },
        deleteItem(index){
            if(confirm('Are you sure you want to delete this item')){
                this.order.items.splice(index,1)
            }
        },
        findProductbyName(name){
            return this.products.findIndex((product)=>product.name==name);
        },
        findSizebyName(name,index){
            return this.products[index].sizes.findIndex(element=>element.size==name);
        },
        updateItemName(index){
            // this.order.items[index].size = this.products[this.findProductbyName(this.order.items[index].name)].sizes[0].size;
            this.order.items[index].size = null;
            this.updateItemSize(index)
        },
        updateItemSize(index){
            if(this.order.items[index].size){
                this.order.items[index].price= this.products[this.findProductbyName(this.order.items[index].name)].sizes[this.findSizebyName(this.order.items[index].size,this.findProductbyName(this.order.items[index].name))].price;
            }
            else{
                this.order.items[index].price=0;
            }
        },
    
        handleErr(err){
            if(err){
                console.log(err);
            }
            this.$router.push({name: 'OrdersIndex'})
        },
        checkLoading(){
            if(this.orderLoaded && this.productsLoaded){
                this.contentLoaded = true;
                this.loading = false;
            } else {
                this.loading = true;
            }
        }
},
    created(){
        this.loading=true;
        let ref = db.collection('orders').where('no', '==', this.$route.params.order_no)
        ref.get().then(snapshot =>{
            if(snapshot.empty){
                alert('Cannot find the order in the database')
                this.handleErr(null);
            } else{
                snapshot.forEach(doc => {
                    this.order = doc.data()
                    this.order.id = doc.id;
                    this.selectedStatus=this.order.status
                })
            }
            this.orderLoaded=true;
            this.checkLoading()
           }).catch(err=>{
            alert('Database returned an error')
            this.handleErr(err)
        })
        db.collection('products').get().then(snap=>{            
            snap.forEach(doc=>{
                this.products.push(doc.data())
            })  
            this.productsLoaded=true;
            this.checkLoading()
        }).catch(err=>{
            alert('Database returned and error');
            this.handlerErr(err);
        })
    },
    computed:{
        ...mapState(['statusOptions']),
        totalAmount: function (){
            return this.order.items.reduce((num,item)=>(item.quantity*item.price)+num,0)
        },
    },
   
}
</script>

<style>
.edit-order .indent{
    padding-left:1.8em;
    padding-right:1.8em;
}
.edit-order .add-new-button{
    padding-right:2.2em;
}
.edit-order .delete-item{
    cursor: pointer;

}
</style>
